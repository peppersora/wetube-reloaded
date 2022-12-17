/*1. 스키마 만들기
    2. 몽고와 몽구스에 User의 생김새를 알려준다
    3. static을 만들고, 모델을 export
*/
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    avatarUrl: {type: String },
    socialOnly: { type: Boolean, default: false},
    // socialOnly는 해당 계정을 password로 로그인할수 없다는것을알려주려 사용
    username: { type: String, required: true, unique: true},
    password: { type: String, required: false},
    name: { type: String},
    location: String,
    videos: [
        {type:mongoose.Schema.Types.ObjectId , ref: "Video"}
    ],
});

userSchema.pre('save',async function(){
    console.log("Users password : ", this.password);
    this.password = bcrypt.hash(this.password, 5);
    //this.password는 유저가 입력한 password!
    console.log("Hashed password", this.password);
    // 출력 결과: Hashed password $2b$05$kV/xhoZK0m90UCavbQPVOuVXnNEZPkRq3qTNTaIenwVL.HrMxepPe
});


const User = mongoose.model("User",userSchema);

export default User;
// 1.여기까지 했으면 이제 init.js에서 user를 import
// 2.import를 했으면 스키마에 적을 내용 적기
// 3. 스키마에 형식 내용적었으면 이제 템플릿 만들기