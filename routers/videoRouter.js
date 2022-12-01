import express from "express";
import {
    watch,getEdit,postEdit
} 
    from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)",watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// 아래두줄을 위의 한줄로 정리 가능
// videoRouter.get("/:id(\\d+)/edit",getEdit);
// videoRouter.post("/:id(\\d+)/edit",postEdit);

export default videoRouter;