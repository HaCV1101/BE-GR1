import { ControllerType } from "../types";
import { Company } from "../models";
//declare controller methods here
type Methods = "getPersionalInfo";
const CompanyController: ControllerType<Methods> = {
  getPersionalInfo: async (req, res) => {},
};
export default CompanyController;
