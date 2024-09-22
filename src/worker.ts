import { parentPort } from "worker_threads";
import { ReddisParser } from "./redis-parser";

const values = new Map();

parentPort?.on("message", (data: string) => {
    const connectionParser = new ReddisParser(data.toString().trim());

    console.log(connectionParser.getCommand()+" "+connectionParser.getArgs());

    switch(connectionParser.getCommand()){
      case "ping":
        parentPort?.postMessage("PONG\r\n");
        break;
      case "echo":
        parentPort?.postMessage(connectionParser.getArgs()+"\r\n");
        break;
      case "set":
        values.set(connectionParser.getArgs().split(' ')[0],connectionParser.getArgs().split(' ')[1]);
        parentPort?.postMessage("OK\r\n");
        break;
      case "get":
        const value=values.get(connectionParser.getArgs().split(' ')[0]);
        parentPort?.postMessage(`${value}\r\n`);
        break;
      default:
        parentPort?.postMessage(`-ERR unknown command ${connectionParser.getCommand()}\r\n`);
    }
});

