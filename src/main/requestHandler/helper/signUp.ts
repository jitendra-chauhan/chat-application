import users from "../../users";

function signUpHelper({ data }: any, socket: any) {
  console.log("==signUpHelper=> call <===");

  return users.userList(data, socket).catch((e: any) => console.error(e));
}

export default signUpHelper;
