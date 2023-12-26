import Joi from "joi";
const JoiObjectId = require("joi-oid");

import BaseModel from "../baseModel";
import { MONGO_DB } from "../../../constants/mongo";

/**
 * UserProfile model
 */
class UserProfile extends BaseModel {
  public collectionName: any;
  public collection: any;
  public db: any;
  /**
   * initialised collection
   * @param {Instance} db
   */
  constructor(db: any) {
    super(db);
    this.db = db;
    this.collectionName = MONGO_DB.USERS;
    this.collection = db.collection(this.collectionName);
  }

  /**
   * model schema, it will parse throw db create and update queries
   * @returns {Object}
   */

  joiSchema() {
    return Joi.object()
      .keys({
        _id: JoiObjectId.objectId().description("unique mongo object id"),
        username: Joi.string().description("username"),
        password: Joi.string().description("password"),
        socketId: Joi.string().description("SocketId of User").empty(""),
      })
      .unknown(true);
  }

  /**
   * @param {object} info
   * @returns throw error if required field is not in info object
   */
  requiredFields(info: any) {
    return super.checkRequiredFields(info, ["username"]);
  }

  /**
   * add a document to user table
   * @param {Object} info
   * @returns {Object} create document
   */
  async add(info: any, opts = { returnOriginal: true }) {
    try {
      const insertObj = super.beforeInsert(info);
      const isValidSchema = this.joiSchema().validate(insertObj);

      if (isValidSchema.error) throw isValidSchema.error;

      const inserteData = await this.collection.insertOne(
        isValidSchema.value,
        opts
      );
      return { _id: inserteData.inserteId, ...inserteData.ops[0] };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   *
   * @param {Array} info
   * @param {Object} opts
   * @returns
   */
  async bulkAdd(users: any, opts = { returnOriginal: false }) {
    const usersArray = users.map((e: any) => {
      const user = super.beforeInsert(e);
      const isValidSchema = this.joiSchema().validate(user);
      if (isValidSchema.error) throw isValidSchema.error;
      return isValidSchema.value;
    });
    return this.collection.insertMany(usersArray, opts);
  }

  /**
   *
   * @param {Object} _id
   * @param {Object} info
   * @returns {Object} updated document
   */
  async update(_id: any, info: any, opts = { returnOriginal: false }) {
    const updateObj = super.beforeUpdate(info.$set);
    const isValidSchema = this.joiSchema().validate(updateObj);
    if (isValidSchema.error) throw isValidSchema.error;
    return this.collection.findOneAndUpdate(
      { _id },
      { $set: isValidSchema.value },
      opts
    );
  }

  async updateByCond(where: any, info: any, opts = { returnOriginal: false }) {
    const updateObj = super.beforeUpdate(info.$set);
    const isValidSchema = this.joiSchema().validate(updateObj);
    if (isValidSchema.error) throw isValidSchema.error;

    return this.collection.findOneAndUpdate(
      where,
      { $set: isValidSchema.value },
      opts
    );
  }

  /**
   * Find a specific document by ID
   * @param {Object} _id
   * @returns {Object} a document
   */
  async get(where: any) {
    return this.collection.find(where).toArray();
  }

  async getOne(where: any) {
    return this.collection.findOne(where);
  }
}

export default UserProfile;
