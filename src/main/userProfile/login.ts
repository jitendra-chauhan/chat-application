import DB from "../db";

async function login(req: any, res: any) {
  try {
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
    console.log("login : error :::: ", error);
  }
}

export default login;
