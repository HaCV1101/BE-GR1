import { Model, Schema, model, Types, Document } from "mongoose";
export interface IJob {
  //declare model properties here
  //example: `name: string`
  name: string;
  career: string;
  info: string;
  tags: string[];
  require: { title: string; skills: string[] }[];
  salary: number;
  recruitmentTime: string;
  jobType: string;
  address: string;
  other: string;
  numOfApplicants: number;
  company: Types.ObjectId;
}
interface IJobMethods {
  //declare instance method here
  //example: `getName(): string`
}
interface JobModel extends Model<IJob, {}, IJobMethods> {
  //declare static method here
  //example: `createInstance(): Instance`
}
const schema = new Schema<IJob, JobModel, IJobMethods>(
  {
    //implement model properties here
    name: { type: String },
    career: { type: String },
    tags: [String],
    info: { type: String },
    require: [
      {
        title: { type: String },
        skills: [{ type: String }],
      },
    ],
    salary: { type: Number },
    recruitmentTime: { type: String },
    jobType: { type: String },
    address: { type: String },
    other: { type: String },
    numOfApplicants: { type: Number, default: 0 },
    company: Types.ObjectId,
  },
  { timestamps: true }
);

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

const Job = model<IJob, JobModel>("Job", schema);
export type JobDocument = Document<unknown, {}, IJob> &
  Omit<
    IJob & {
      _id: Types.ObjectId;
    },
    keyof IJobMethods
  > &
  IJobMethods;
export default Job;
// const job = new Job({
//   name: "Nhân viên kinh doanh",
//   career: "Kinh doanh",
//   info: "Tìm kiếm khách hàng tiềm năng",
//   require: [
//     {
//       title: "Kỹ năng",
//       skill: ["Giao tiếp", "Kỹ năng bán hàng"],
//     },
//     {
//       title: "Kinh nghiệm",
//       skill: ["1 năm"],
//     },
//   ],
//   salary: "10.000.000",
//   recruitmentTime: "30/10/2020",
//   type: "Fulltime",
//   address: "Hà Nội",
//   other: "Có thể làm việc tại nhà",
// });
