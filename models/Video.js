// db를 mongoose와 연결시켜서 video model을 인식시키기
// video 모델을 만들기 위해 해야할 일
//1. mongoose import해주기
import mongoose from "mongoose";
//2. model의 형태를 정의해주기 => 보통 schema라고 알려져있음
// 우선은 데이터 형식만을 schema에 적는다.
const VideoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim:true, maxLength:80},
    description:{ type: String, required: true, trim:true, minLength:10},
    createdAt:{ type: Date, required:true, default: Date.now},
    hashtags:[{type: String, trim:true}],
    meta: {
        views:{type:Number,default:0,required: true},
        rating:{type:Number,default:0,required: true},
    }
});

//middlewear는 반드시 model이 생성되기 전에 만들어야함
VideoSchema.pre('save',async function(){
this.hashtags = this.hashtags[0]
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
/* this.description="hahahah";
로 넣어서 작동시켜보면 위처럼 적어야하는 이유는
프론트엔드에서는 배열안을 하나하나의 string으로 보는것이아니라
통째로 배열자체를 객체로 인식하기 때문에 ...

 * 
 */
  
});
const Video = mongoose.model("Video", VideoSchema);
//  모델은 기본 MongoDB 데이터베이스에서 문서를 만들고 읽는다.
export default Video;