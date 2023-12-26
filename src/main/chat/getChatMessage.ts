import {EVENTS} from "../../constants/event";
import DB from "../db";
import socketEvent from "../socket"

async function getMessage(eventData: any, socket: any) {
  try {
    const { userId, myId, type } = eventData;

    let query = {};
    if (type === "me") {
      query = {
        $and: [{ to: userId }, { from: userId }],
      };
    } else {
      query = {
        $and: [
          {
            $or: [{ to: userId }, { from: userId }],
          },
          {
            $or: [{ to: myId }, { from: myId }],
          },
        ],
      };
    }
    const dataList = await DB.UserChat.getMessages(query);

    console.log("====> getMessage <====", dataList);

    let sendData = {
      flag: true,
      status: "sussces",
      data: [],
    };
    if (dataList.length > 0) {
      sendData.flag = true;
      sendData.data = dataList;
    }

    
    const responseData = {
      en: EVENTS.GET_CHAT,
      data : sendData,
    };
    console.log("=getMessage=> sendPayload <===", responseData);

    // get chat messages
    socketEvent.sendEventToClient(socket, responseData)
  } catch (error) {
    console.log("getMessage : error :: ", error);
  }
}

export default getMessage;
