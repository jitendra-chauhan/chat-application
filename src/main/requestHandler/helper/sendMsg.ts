import chat from "../../chat";

function sendMsgHelper({ data }: any, socket: any) {
  console.log("==sendMsgHelper=> call <===");

  return chat.sendMessage(data, socket).catch((e: any) => console.error(e));
}

export default sendMsgHelper;
