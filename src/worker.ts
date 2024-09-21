import { parentPort } from "worker_threads";

parentPort?.on("message", (data: string) => {
  const inputData = data.toString().trim();

  console.log("Worker received data: ", inputData);

  if (inputData.toUpperCase().startsWith("ECHO")) {
    const message = inputData
      .split(' ')
      .filter((word) => word.toUpperCase() !== "ECHO")
      .join(' ');

    console.log("Processed message: ", message);
    
    parentPort?.postMessage(`${message}\r\n`);
  } else {
    parentPort?.postMessage("INVALID COMMAND\r\n");
  }
});

