const express = require('express');
const proxy = require('http-proxy-middleware');
const btoa = require('btoa');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const bodyParser = require('body-parser')
var cors = require('cors')
const elastic = process.env.elastic
const routex = process.env.routex
const user = process.env.user
const pass = process.env.pass
const port = process.env.PORT || 7777;

;

/* This is where we specify options for the http-proxy-middleware
 * We set the target to appbase.io backend here. You can also
 * add your own backend url here */
const options = {
    target: elastic,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader(
            'Authorization',
            `Basic ${btoa(user+':'+pass)}`
        );

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
// app.use('*', proxy(options));



app.post(routex, proxy(options));


app.get("/wakeup", async (req, res)=>{


    res.send("searchbox awake!")


});
    
app.get('*', function(req, res){
  res.status(404).send("no route")
});
// app.get('/*', function(req, res){
//     res.status(404).send("sorry")
//   });

// app.post('/*', function(req, res){
//     res.status(404).send("sorry")
//   });


app.listen(port, () => console.log('Server running at http://localhost:7777 🚀'));
