import {EVENTS} from "../../constants/event";
import Helper from "./helper";

async function requestHandler(socket: any, body: any) {
  if (!socket) {
    console.error(new Error("socket instance not found"));
  }

  /* +-------------------------------------------------------------------+
        desc: function to handle all event processes
        i/p: request = {en: `event name`, data: `data`}
    +-------------------------------------------------------------------+ */

  const data = body;
  try {
    if (typeof body.data == "undefined" && typeof body.en == "undefined") {
      throw new Error("Data not valid!");
    }

    if (!socket) {
      throw new Error("socket instance not found");
    }

    console.info("event ::", body.en, data);
    switch (body.en) {
      case EVENTS.HEART_BEAT:
        socket.emit("res", { data: "Done" });
        break;
      case EVENTS.USER_LIST:
        await Helper.signUpHelper(body, socket);
        break;
      case EVENTS.USER_CHAT:
        await Helper.sendMsgHelper(body, socket);
        break;
      case EVENTS.GET_CHAT:
        await Helper.getMsgHelper(body, socket);
        break;
      case "disconnect":
        await Helper.disconnectHelper(body, socket);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("requestHandler : error :: ", body.en, error);
  }
}

export default requestHandler;
