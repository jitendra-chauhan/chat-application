import { MongoClient, ObjectId } from "mongodb";
import { getConfig } from "./config";

class MongoDB {
  public DB_NAME: any;
  public url: any;
  public db: any;

  constructor() {
    this.DB_NAME = "";
    this.url = null;
    this.db = null;
  }

  getUrl(DB_PROTO: string, DB_HOST: string, DB_PORT: string, DB_NAME: string) {
    return `${DB_PROTO}://${DB_HOST}:${DB_PORT}/${DB_NAME}`; 
  }

  // connection setup
  async connection(resolve: any, reject: any) {
    try {
      const { main } = await import("../main");
      const client = await new MongoClient(
        this.url,
      );
      await client.connect();
      this.db = client.db(this.DB_NAME);
      main.DB.init(this.db, client);

      console.log(" connected ");

      resolve(this.db);
    } catch (error) {
      console.log(" error : ", error);

      reject(error)
    }

  }
  async init() {
    const { DB_HOST, DB_PORT, DB_NAME }: any = getConfig();

    this.DB_NAME = DB_NAME;
    this.url = this.getUrl("mongodb", DB_HOST, DB_PORT, DB_NAME);
    console.log(this.url);

    return new Promise(this.connection.bind(this));
  }
}

export default new MongoDB();
