import { ControllerType, RequestWithPayload } from "../types";
import { IJob, CompanyDocument, Job } from "../models";
import { validate, jobValidator } from "../utils";
//declare controller methods here
type Methods = "create";
const jobController: ControllerType<Methods> = {
  create: async (req: RequestWithPayload, res) => {
    try {
      const company = <CompanyDocument>req.payload?.company;
      const body: IJob = req.body;
      const error = await validate(jobValidator, body);
      if (error) throw error;
      const job = await Job.create({ ...body, company: company._id });
      res.json({ success: true, data: { job } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error });
    }
  },
};
export default jobController;
