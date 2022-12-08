import express from "express";
import {
    watch,getEdit,postEdit, getUpload, postUpload
    
} 
    from "../controllers/videoController";

const videoRouter = express.Router();
/* mongoDB가 만들어낸 id 포맷과는 맞지 않기 때문에 
    정규식 표현을 다시 작성해줘야함*/
videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// 아래두줄을 위의 한줄로 정리 
// videoRouter.get("/:id(\\d+)/edit",getEdit);
// videoRouter.post("/:id(\\d+)/edit",postEdit);
// videoRouter.get("/upload",getUpload);
// videoRouter.post("/upload",postUpload);
export default videoRouter;