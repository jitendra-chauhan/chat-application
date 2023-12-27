import { ObjectId } from "mongodb";
import { EVENTS } from "../../../constants/event";
import DB from "../../db";
import socketEvent from "../../socket"

async function disconnectHelper(data : any, socket: any) {
  console.log("==getMsgHelper=> call <===");
  await DB.UserProfile.updateUser({ _id : new ObjectId(data._id) }, { $set:{isOnline : false}});

  const userData = await DB.UserProfile.getUsers({});

  let sendData = {
    flag: false,
    status: "sussces",
    userData: {},
  };
  if (userData.length > 0) {
    sendData.flag = true;
    sendData.userData = userData;
  }

  const responseData = {
    en: EVENTS.USER_LIST,
    data: sendData,
  };

  socketEvent.sendEventToGloble(socket, responseData);
}

export default disconnectHelper;
