import {EVENTS} from "../../constants/event";
import DB from "../db";
import socketEvent from "../socket"
import { createRoomId } from "../utile";

async function sendMessage(eventData: any, socket: any) {
  try {
    // to: id,
    //     from: userId,
    //     msg: param,
    console.log("====> sendMessage <====", eventData);
    const roomId = await createRoomId(eventData.from, eventData.to);
    const data = await DB.UserChat.sendMessage(eventData);

    console.log("====> USER_CHAT <====", data);

    let sendData = {
      flag: true,
      status: "sussces",
      data: data,
    };
  
    const responseData = {
      en: EVENTS.USER_CHAT,
      data: sendData,
    };
    console.log("==> sendPayload <===", responseData);
    
    socketEvent.sendEventToRoom(roomId, responseData)
  } catch (error) {
    console.log("sendMessage : error :: ", error);
  }
}

export default sendMessage;
