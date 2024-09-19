import * as net from "net";

const server = net.createServer((connection:net.Socket)=>{
  console.log(connection);
});

server.listen(6379,"127.0.0.1",()=>{
  console.log("Server connected on 127.0.0.1:6379");
});
