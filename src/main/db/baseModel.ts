/**
 * A BaseModel, all common functionality will be defined here and used across all models
 */
class BaseModel {
  public db;

  constructor(db : any) {
    this.db = db;
  }

  /**
   * operations before insert
   * @param {Object} info
   * @returns {Object}
   */
  // eslint-disable-next-line class-methods-use-this
  beforeInsert(info:any) {
    const insertObj = info;
    const now = new Date();
    insertObj.createdAt = now;
    insertObj.updatedAt = now;
    return insertObj;
  }

  // eslint-disable-next-line class-methods-use-this
  beforeUpdate(info:any) {
    console.log("=====> beforeUpdate<=====info=", info);

    const updateObj = info;
    const now = new Date();
    updateObj.updatedAt = now;
    return updateObj;
  }

  /**
   *
   * @param {object} info
   * @param {Array} fields
   * @returns throw error if required fields are not in object
   */
  // eslint-disable-next-line class-methods-use-this
  checkRequiredFields(info : any, fields : any) {
    console.log("========> data <====info====", info);
    console.log("========> data <====fields====", fields);
    const keys = Object.keys(info);
    fields.forEach((field : any) => {
      if (!keys.includes(field)) throw new Error(`${field} is required`);
    });
    return true;
  }
}

export default BaseModel;
