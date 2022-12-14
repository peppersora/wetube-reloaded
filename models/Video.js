// db를 mongoose와 연결시켜서 video model을 인식시키기
// video 모델을 만들기 위해 해야할 일
//1. mongoose import해주기
import mongoose from "mongoose";
//2. model의 형태를 정의해주기 => 보통 schema라고 알려져있음
// 우선은 데이터 형식만을 schema에 적는다.

const VideoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim:true, maxLength:80},
    fileUrl : { type: String},
    thumbUrl : { type: String },
    description:{ type: String, required: true, trim:true, minLength:10},
    createdAt:{ type: Date, required:true, default: Date.now},
    hashtags:[{type: String, trim:true}],
    meta: {
        views:{type:Number,default:0,required: true},
        rating:{type:Number,default:0,required: true},

    },
    comments: [ 
        { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment"}
    ],
    owner : { type:mongoose.Schema.Types.ObjectId , required: true, ref: "User"},
    // ref: objectId가 User로부터 온다고 알려주는 속성(reference)
});

VideoSchema.static("formathashtags",function(hashtags){
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`))
});

// thumbnail 기능이 안됨..static이용해보기
VideoSchema.static("changePathFormula",(urlPath) => {
    return urlPath.replace(/\\/g, "/");
    });


const Video = mongoose.model("Video", VideoSchema);
//  모델은 기본 MongoDB 데이터베이스에서 문서를 만들고 읽는다.
export default Video;