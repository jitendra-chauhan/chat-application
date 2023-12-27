import jwt from "jsonwebtoken";
import { getConfig } from "../../connections";

function sign(userId : string, option : any) {
    return new Promise((resolve) => {
      let sercurData = {
        userId
      };
      
  
      jwt.sign(sercurData, getConfig().JWT_SECRET, option, (error, token) => {
        resolve({ error, token });
      });
    });
  }

export const generateToken = async(payload : any, option: any, type:string) =>{
    payload.tokenType = type;
    const tokens = await sign(payload, option);
    return tokens
}

export const verify = (token:string) : Promise<{error:any, decoded:any}> => {
    return new Promise((resolve) => {
      jwt.verify(token, getConfig().JWT_SECRET, (error, decoded) => {
        resolve({ error, decoded });
      });
    });
  }