/**
 * UserMessageService will be exported and will be used by dev to fetch/update/create data in db
 */
class UserChatService {
  public UserMessage: any;

  constructor(UserMessage: any) {
    this.UserMessage = UserMessage;
  }

  /**
   *
   * @param {object} info
   * @returns created user
   */

  // send message to user : it's add document into database
  async sendMessage(info: any, opts: any) {
    this.UserMessage.requiredFields(info);
    return this.UserMessage.add(info, opts);
  }

  /**
   *
   * @param {object} info
   * @returns created user
   */

  // insert more then one
  async bulkAdd(info: any, opts: any) {
    await Promise.all(info.map((e: any) => this.UserMessage.requiredFields(e)));
    return this.UserMessage.bulkAdd(info, opts);
  }

  /**
   *
   * @param {objectId} _id
   * @param {object} info
   * @returns
   */

  // updated document by user id
  async updateUser(playerId: any, info: any, opts: any) {
    return this.UserMessage.updateByCond(playerId, info, opts);
  }

  // get one message document 
  async getMessage(where: any) {
    try {
      return this.UserMessage.getOne(where);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // get messages document 
  async getMessages(where: any) {
    try {
      return this.UserMessage.get(where);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default UserChatService;
