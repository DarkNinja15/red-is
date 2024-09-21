import { parentPort } from "worker_threads";

parentPort?.on("message", (data) => {
  console.log("Worker received data: ", JSON.stringify(data));

  for(let i=0;i<10000000000;i++){}

  const response = "+PONG\r\n";

  parentPort?.postMessage(response);
});

