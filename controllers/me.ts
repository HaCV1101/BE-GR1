import { ControllerType, RequestWithPayload } from "../types";
import { User, UserDocument, CV, CVDocument } from "../models";
import { validate, userValidator, CVValidator } from "../utils";
type Methods = "getMe" | "updateMe" | "getCV" | "updateCV";
const meController: ControllerType<Methods> = {
  getMe: async (req: RequestWithPayload, res) => {
    try {
      const candidate = <UserDocument>req.payload?.candidate;
      const { password, ...rest } = candidate.toObject();
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
  getCV: async (req: RequestWithPayload, res) => {
    // TODO:
    try {
      const candidate = <UserDocument>req.payload?.candidate;
      const cvId = candidate.cv;
      if (!cvId) throw "You have not created your CV yet";
      const cv = await CV.findById(cvId);
      if (!cv) throw "CV not found";
      res.json({ success: true, data: { cv } });
    } catch (error: any) {
      if (typeof error === "string") {
        return res.status(400).json({ success: false, message: error });
      }
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  },
  updateCV: async (req: RequestWithPayload, res) => {
    try {
      const body = req.body;
      const candidate = <UserDocument>req.payload?.candidate;
      const cvId = candidate.cv;
      const error = await validate(CVValidator, body);
      if (error) throw error;
      if (!cvId) {
        const cv = await CV.create(body);
        candidate.cv = cv._id;
        await candidate.save();
        return res.json({ success: true, data: { cv } });
      }
      const cv = await CV.findByIdAndUpdate(cvId, body, { new: true });
      if (!cv) {
        candidate.cv = undefined;
        await candidate.save();
        throw "CV not found";
      }
      res.json({ success: true, data: { cv } });
    } catch (error: any) {
      if (typeof error === "string") {
        return res.status(400).json({ success: false, message: error });
      }
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
  },
};
export default meController;
