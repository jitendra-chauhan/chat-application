import UserProfileService from "./userProfile/service";
import UserProfileModel from "./userProfile/model";
import UserChatService from "./userChat/service";
import UserChatModel from "./userChat/model";

class DB {
  public mongoClient: any;
  public UserProfile: any;
  public UserChat: any;
  init(db: any, client: any) {
    this.mongoClient = client;
    this.UserProfile = new UserProfileService(new UserProfileModel(db));
    this.UserChat = new UserChatService(new UserChatModel(db));
  }
}

/**
 * exports db model services, it will be used to devs to fetch,insert or update data to databse
 */
export default new DB();
