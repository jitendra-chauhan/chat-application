const SocketIO = require("socket.io");
const { createAdapter } = require('@socket.io/redis-adapter');
import { createClient } from 'redis';
import { verify } from "../main/utile/auth";
import server from "./http";

let socketClient: any = null;

async function socketConnnectionHandle(client: any) {
  const { main } = await import("../main");
  console.log("connected socket");

  let { token } = client.handshake.query;

  console.log("token :: ", token);
  console.log(JSON.stringify(token));
  
  const { decoded, error } = await verify(token)
  if (
    error ||
    !decoded ||
    !decoded.exp ||
    new Date(decoded.exp * 1000).getTime() < new Date().getTime()
  ) {
    client.disconnect();
  }
  // client.conn is default menthod for ping pong request
  client.conn.on("ping", (packet: any) => {
    client.emit("pong", packet);
  });

  /**
   * error event handler
   */
  client.on("error", (error: any) =>
    console.error("Socket : client error......,", error)
  );

  /**
   * disconnect request handler
   */
  client.on("disconnect", () => {
    console.log("DISCONNECT user : ", client.id, " myid: ", client.myid);
    main.requestHandler(client, { data: { myid: client.myid }, en: "disconnect" });
  });

  /**
   * get Event request handler
   */
  client.on("req", (socket: any) => {
    main.requestHandler(client, socket);
  });
}

async function createSocketServer() {
  const client = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
  
  const subClient = client.duplicate();
  Promise.all([client.connect(), subClient.connect()]);

  client.on('ready', () => {
    console.log('Redis connected successfully.');
    // console.log('Redis.init ::: ', typeof Redis);
  });

  client.on('error', (error: any) => {
    console.error('CATCH_ERROR : Redis Client error:', error);
  });
  const socketConfig = {
    transports: ["websocket", "polling"],
    pingInterval: 1000,
    pingTimeout: 10000,
    allowEIO3: true,
  };

  socketClient = SocketIO(server, socketConfig);
  // .of("/socketServer");
  socketClient.adapter(createAdapter(client, subClient));

  socketClient.on("connection", socketConnnectionHandle);

  return socketClient;
}

const init = () => socketClient || createSocketServer();

export default init;
