import { Model, Schema, model, Types, Document } from "mongoose";
interface IApply {
  //declare model properties here
  //example: `name: string`
  job: Types.ObjectId;
  user: Types.ObjectId;
  status: string;
  schedule: Date;
}
interface IApplyMethods {
  //declare instance method here
  //example: `getName(): string`
}
interface ApplyModel extends Model<IApply, {}, IApplyMethods> {
  //declare static method here
  //example: `createInstance(): Instance`
}
const schema = new Schema<IApply, ApplyModel, IApplyMethods>({
  //implement model properties here
});

//implement instance method here
/*
example:
schema.methods.getName =  function () {
});
*/

//implement static method here
/*
example:
schema.statics.createInstance = function () {
});
*/

const Apply = model<IApply, ApplyModel>("Apply", schema);
export type ApplyDocument = Document<unknown, {}, IApply> &
  Omit<
    IApply & {
      _id: Types.ObjectId;
    },
    keyof IApplyMethods
  > &
  IApplyMethods;
export default Apply;
