import express from "express";
import { get } from "mongoose";
import { getEdit, 
        postEdit,
        logout, 
        see,
        startGithubLogin,
        finishGithubLogin,
        getChangePassword,
        postChangePassword,
    } from "../controllers/userController";
import { publicOnlyMiddleware,protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout",protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
// all()은 get,post,put,delete등 어떤 http method를 사용하던지 이 middleware를 사용하겠다는것.
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/start",publicOnlyMiddleware,startGithubLogin);
userRouter.get("/github/finish",publicOnlyMiddleware,finishGithubLogin);
// publicOnly는 로그아웃 되어 있어야 실행시키는것을 허락해주니까
userRouter.get(":id", see);

export default userRouter;