import { socketOps } from "../../connections";

class SocketEvents {
  async sendEventToClient(client: any, data: any) {
    try {
      const socketClient: any = socketOps();
  
      console.log("SEND EVENT TO CLIENT: ", data);
  
      if (typeof client !== "string") client.emit("res", { data });
      else socketClient.to(client).emit("res", { data });
    } catch (error) {
      console.error("sendEventToClient :: error :: ", error);
    }
  }
  
  async sendEventToRoom(roomId: any, data: any) {
    const socketClient: any = socketOps();
    console.log("SEND EVENT TO ROOM : ", data);
    socketClient.to(roomId).emit("res", { data });
  }
  
  addClientInRoom(socket: any, roomId: any) {
    return socket.join(roomId);
  }
  
  getSocketFromSocketId(socketId: any) {
    const socketClient: any = socketOps();
    return socketClient.sockets.sockets.get(socketId);
  }
}


export default new SocketEvents()
