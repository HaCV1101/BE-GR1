import { ControllerType, RequestWithPayload } from "../types";
import { User } from "../models";
import { validate, userValidator } from "../utils";
type Methods = "getMe" | "updateMe";
const meController: ControllerType<Methods> = {
  getMe: async (req: RequestWithPayload, res) => {
    try {
      const user = await User.findById(req.payload?.id);
      if (!user) {
        throw new Error("User not found");
      }
      const { password, ...rest } = user.toObject();
      res.json({ success: true, data: { user: rest } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateMe: async (req: RequestWithPayload, res) => {
    try {
      const { email, fullname, phone, address } = req.body;
      const body = { email, fullname, phone, address };
      const error = await validate(userValidator, body, [
        "email",
        "fullname",
        "phone",
        "address",
      ]);
      if (error) {
        throw new Error(error);
      }
      const user = await User.findByIdAndUpdate(req.payload?.id, body, {
        new: true,
      });
      if (!user) {
        throw new Error("User not found");
      }
      const { password, ...rest } = user.toObject();
      res.json({ success: true, data: { user: rest } });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
export default meController;
