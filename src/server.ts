import * as net from "net";
import { Worker } from "worker_threads";
import { resolve } from "path";

const server = net.createServer((connection:net.Socket)=>{

  const worker=new Worker(resolve(__dirname,"../dist/worker.js"),{
    workerData:null
  });

  connection.on("data",(data)=>{
    worker.postMessage(data.toString());
  });

  connection.on("end",()=>{
    console.log("Connection Ended");
    worker.terminate();
  });

  worker.on("error",(error:string)=>{
    console.error(error);
  });

  worker.on("message",(response:string)=>{
    connection.write(response);
  });


  console.log(connection);
});

server.listen(6379,"127.0.0.1",()=>{
  console.log("Server connected on 127.0.0.1:6379");
});
