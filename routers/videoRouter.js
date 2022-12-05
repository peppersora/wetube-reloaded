import express from "express";
import {
    watch,getEdit,postEdit, getUpload, postUpload
    
} 
    from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)",watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// 아래두줄을 위의 한줄로 정리 
// videoRouter.get("/:id(\\d+)/edit",getEdit);
// videoRouter.post("/:id(\\d+)/edit",postEdit);
// videoRouter.get("/upload",getUpload);
// videoRouter.post("/upload",postUpload);
export default videoRouter;