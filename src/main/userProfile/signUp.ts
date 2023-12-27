import db from "../db";
import { ObjectId } from "mongodb";
import { generateToken } from "../utile/auth";
import { getConfig } from "../../connections";

async function signUp(req: any, res: any) {
  try {
    // const { username, password } = req.body;
    const signUpData = await db.UserProfile.addUser({...req.body, isOnline: true});
    console.log("===> call signUpData <==", signUpData);
    const data = await db.UserProfile.getUser({ _id : new ObjectId(signUpData._id) });
    console.log("===> call signUp <==", req.body);
    console.log("===> call signUp <=data=", data);
    let milisecTime =
    Number(getConfig().tokenTime) * 60 * 60 * 100;

    const token = await generateToken(data._id, { expiresIn: milisecTime  },'access')
    const sendData = {
      flag: true,
      status: "sussces",
      data,
      token
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
