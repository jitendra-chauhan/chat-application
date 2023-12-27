import {EVENTS} from "../../constants/event";
import DB from "../db";
import { createRoomId } from "../utile";
import socketEvent from "../socket"

async function userList(eventData: any, socket: any) {
  try {
    const { myId } = eventData;
    console.log("====> userList <====");

    const data = await DB.UserProfile.getUsers({});

    for await (const user of data) {
      const roomId = await createRoomId(myId, user._id);
      socketEvent.addClientInRoom(socket, roomId);
      console.log("=====> room Id <====", roomId);
    }
    let sendData = {
      flag: false,
      status: "sussces",
      data: {},
    };
    if (data.length > 0) {
      sendData.flag = true;
      sendData.data = data;
    }

    const responseData = {
      en: EVENTS.USER_LIST,
      data: sendData,
    };
    console.log("==> sendPayload <===", responseData);
    socket.myid = myId;
    socketEvent.sendEventToClient(socket, responseData);
  } catch (error) {
    console.log("userList : error :: ", error);
  }
}

export default userList;
