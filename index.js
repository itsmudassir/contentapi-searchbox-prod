const express = require('express');
const proxy = require('http-proxy-middleware');
const btoa = require('btoa');
const app = express();
const bodyParser = require('body-parser')
var cors = require('cors')
const port = process.env.PORT || 7777;
const elastic = process.env.elastic
/* This is where we specify options for the http-proxy-middleware
 * We set the target to appbase.io backend here. You can also
 * add your own backend url here */
const options = {
    target: elastic,
    // target: 'https://rfrypdj6z1:uf0ufgjvz7@contentgizmo-1104621762.us-east-1.bonsaisearch.net:443',
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {

        /* transform the req body back from text */
        const { body } = req;
        if (body) {
            if (typeof body === 'object') {
                proxyReq.write(JSON.stringify(body));
            } else {
                proxyReq.write(body);
            }
        }
    }
}
app.use(cors())

/* Parse the ndjson as text */
app.use(bodyParser.text({ type: 'application/x-ndjson' }));

/* This is how we can extend this logic to do extra stuff before
 * sending requests to our backend for example doing verification
 * of access tokens or performing some other task */
app.use((req, res, next) => {
    const { body } = req;
    console.log('Verifying requests ✔', body);
    /* After this we call next to tell express to proceed
     * to the next middleware function which happens to be our
     * proxy middleware */
    next();
})

/* Here we proxy all the requests from reactivesearch to our backend */
app.use('*', proxy(options));

app.listen(port, () => console.log('Server running at http://localhost:7777 🚀'));
