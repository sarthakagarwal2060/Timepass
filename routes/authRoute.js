import express from "express"
import { loginUser,registerUser ,getlogin} from "../controller/authController.js"
const authRouter = express.Router()
authRouter.route("/signup").post(registerUser)
authRouter.route("/signin").post(loginUser);
export default authRouter

