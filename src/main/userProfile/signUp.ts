import db from "../db";

async function signUp(req: any, res: any) {
  try {
    // const { username, password } = req.body;
    const data = await db.UserProfile.addUser(req.body);
    console.log("===> call signUp <==", req.body);
    console.log("===> call signUp <=data=", data);
    const sendData = {
      flag: true,
      status: "sussces",
      data,
    };
    res.send(sendData);
  } catch (error) {
    const sendData = {
      flag: false,
      status: "sussces",
    };
    res.send(sendData);
    console.log("==signUp> error <===", error);
  }
}

export default signUp;
