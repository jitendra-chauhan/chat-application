// const { MongoClient } = require("mongodb");
import { MongoClient,ObjectId } from "mongodb";
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
    return `${DB_PROTO}://${DB_HOST}:${DB_PORT}/${DB_NAME}`; //?retryWrites=true&w=majority
  }

  // connection setup
  async connection(resolve: any, reject: any) {
    try {
      const {main} = await import("../main");
    
      console.log("connetcion :::: 11");
      const client = await new MongoClient(
        // this.url,
        'mongodb://24xbet:TriO9944@139.59.46.155:27017/24xbetdb',
        
        );
        console.log("connetcion :::: 22");
    
    
    await client.connect();
    this.db = client.db(this.DB_NAME);
    main.DB.init(this.db, client);
    
    console.log(" connected ");
    
    resolve(this.db);
    } catch (error) {
        console.log(" error : " , error);
      
      reject(error)
    }

    // const {main} = await import("../main");
    // MongoClient.connect(
    //   this.url,
    //   { useUnifiedTopology: true, useNewUrlParser: true },
    //   (err: any, client: any) => {
    //     console.log("===> error <====", err);

    //     if (err) reject(err);

    //     this.db = client.db(this.DB_NAME);

    //     main.DB.init(this.db, client);

    //     console.info("DB Connected successfully!");

    //     resolve(this.db);
    //   }
    // );
    
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
