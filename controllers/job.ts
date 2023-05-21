import { ControllerType, RequestWithPayload } from "../types";
import { IJob, CompanyDocument, Job, User, CV, UserDocument } from "../models";
import { validate, jobValidator } from "../utils";
//declare controller methods here
type Methods = "create" | "getSuitableCandidates" | "getsuitableJobs";
const jobController: ControllerType<Methods> = {
  create: async (req: RequestWithPayload, res) => {
    try {
      const company = <CompanyDocument>req.payload?.company;
      const body: IJob = req.body;
      const error = await validate(jobValidator, body);
      if (error) throw error;
      const job = await Job.create({ ...body, company: company._id });
      company.jobs.push(job._id);
      await company.save();
      res.json({ success: true, data: { job } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error });
    }
  },
  getSuitableCandidates: async (req: RequestWithPayload, res) => {
    try {
      const jobId = req.params.jobId;
      const job = await Job.findById(jobId);
      if (!job) throw "Job not found";
      const tags = job.tags;
      const results = await User.find({ tags: { $in: tags } });
      const candidates = await Promise.all(
        results.map(async (candidate) => {
          const { password, cv: cvId, ...rest } = candidate.toJSON();
          const cv = await CV.findById(cvId);
          return { ...rest, cv };
        })
      );
      console.log(candidates);

      // const
      res.json({ success: true, data: { candidates } });
    } catch (error: any) {
      if (typeof error === "string")
        return res.status(400).json({ success: false, message: error });
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  },
  getsuitableJobs: async (req: RequestWithPayload, res) => {
    try {
      const candidate = <UserDocument>req.payload?.candidate;
      const definedTags = req.body.tags;
      const tags = definedTags ?? candidate.tags;
      const results = await Job.find({ tags: { $in: tags } });
      const jobs = await Promise.all(
        results.map(async (job) => {
          return job.toJSON();
        })
      );
      res.json({ success: true, data: { jobs } });
    } catch (error: any) {
      if (typeof error === "string")
        return res.status(400).json({ success: false, message: error });
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  },
};
export default jobController;
