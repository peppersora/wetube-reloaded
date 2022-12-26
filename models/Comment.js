import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    //1. property
    // 누가, 언제, 어느비디오에 , 무엇을 작성했는지 알 수 있음
    text: {type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now},
    owner : { type:mongoose.Schema.Types.ObjectId , required: true, ref: "User"},
    video: {type: mongoose.Schema.Types.ObjectId, required:true, ref:"Video"},
});


const Comment = mongoose.model("Comment", commentSchema);
//  모델은 기본 MongoDB 데이터베이스에서 문서를 만들고 읽는다.
export default Comment;