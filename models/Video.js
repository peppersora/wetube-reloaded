// db를 mongoose와 연결시켜서 video model을 인식시키기
// video 모델을 만들기 위해 해야할 일
//1. mongoose import해주기
import mongoose from "mongoose";
//2. model의 형태를 정의해주기 => 보통 schema라고 알려져있음
// 우선은 데이터 형식만을 schema에 적는다.
const VideoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtags:[{type: String}],
    meta: {
        views:Number,
        rating:Number,
    }
});

const Video = mongoose.model("Video", VideoSchema);
//  모델은 기본 MongoDB 데이터베이스에서 문서를 만들고 읽는다.
export default Video;