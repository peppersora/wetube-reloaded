import express from "express";
import { get } from "mongoose";
import { getEdit, 
        postEdit,
        logout, 
        see,
        startGithubLogin,
        finishGithubLogin,
    } from "../controllers/userController";

const userRouter = express.Router();


userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/start",startGithubLogin);
userRouter.get("/github/finish",finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;