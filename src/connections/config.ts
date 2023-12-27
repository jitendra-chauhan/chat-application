require("dotenv").config();

const { env } = process;
let configData: any = null;

interface config {
  SERVER_PORT:string
  DB_HOST:string
  DB_NAME:string
  DB_PORT:number
  JWT_SECRET : string
  tokenTime : number
}

function getEnvConfig() {
  const port = "SERVER_PORT";
  const DB_HOST = "DB_HOST";
  const DB_NAME = "DB_NAME";
  const DB_PORT = "DB_PORT";
  const JWT_SECRET = "JWT_SECRET";
  const tokenTime = "tokenTime";

  return Object.freeze({
    SERVER_PORT: env[port],
    DB_HOST: env[DB_HOST],
    DB_NAME: env[DB_NAME],
    DB_PORT: env[DB_PORT],
    JWT_SECRET: env[JWT_SECRET],
    tokenTime: Number(env[tokenTime])
  });
}

function getConfigJson() {
  configData = getEnvConfig();
  console.log("==> configData <===");
  console.log(configData);
  
  return configData;
}

export const getConfig = () : config  => configData || getConfigJson();

