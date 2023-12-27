import { ObjectId } from "mongodb";
import DB from "../db";
import { getConfig } from "../../connections";
import { generateToken } from "../utile/auth";

async function login(req: any, res: any) {
  try {
    console.log("req.body :: ", req.body);
    
    const { username, password } = req.body;

    const data = await DB.UserProfile.getUser({ username });
    
    
    console.log("===> call login <==", req.body);
    console.log("===> call login <=data=", data);
    if (!data) {
      const send = {
        flag: false,
        status: "sussces",
        msg: "user Not Found!",
      };

      return res.send(send);
    }

    if (data.password !== password) {
      const send = {
        flag: false,
        status: "sussces",
        msg: "password Wrong!",
      };

      return res.send(send);
    }
    await DB.UserProfile.updateUser({ _id : new ObjectId(data._id) }, { $set:{isOnline : true}});
    data.isOnline = true
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
    console.log("login : error :::: ", error);
  }
}

export default login;
