import elasticsearch from "elasticsearch";

// Core ES variables for this project
export const index = process.env.ELASTIC_INDEX;
const type = "_doc";

 

const host = process.env.ELASTICSEARCH_HOST_1;
// const host = process.env.ELASTICSEARCH_HOST_2;
// const host = process.env.ELASTICSEARCH_HOST_3;

// export const client = new elasticsearch.Client({
//   host: host,
//   ssl:{ rejectUnauthorized: false, pfx: [] } 
// });


// incase of  const host = "http://43.251.253.107:1200"; use the code below

export const client = new elasticsearch.Client({
  host: host

});


// /* Check the ES connection status /
export const checkConnection = async () => {
  let isConnected = false;
  while (!isConnected) {
    console.log("Connecting to ES");
    try {
      const health = await client.cluster.health({});
      return health;
      console.log(health);
      isConnected = true;
    } catch (err) {
      console.log("Connection Failed, Retrying...", err);
    }
  }
};
