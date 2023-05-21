import { ControllerType, RequestWithPayload } from "../types";
//declare controller methods here
type Methods = "getAll";
const candidateController: ControllerType<Methods> = {
  getAll: async (req, res) => {},
};
export default candidateController;
