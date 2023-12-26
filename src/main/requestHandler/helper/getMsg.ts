import chat from "../../chat";

function getMsgHelper({ data }: any, socket: any) {
  console.log("==getMsgHelper=> call <===");
  return chat.getMessage(data, socket).catch((e: any) => console.error(e));
}

export default getMsgHelper;
