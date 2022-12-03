import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube"
,{useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 연결의 성공여부를 출력
const db = mongoose.connect;
// "on"은 "onclick"처럼 여러번 계속 발생시킬수 있다.
// "once"는 한번만 발생시킨다.

const handleOpen = () => console.log("connected to DB!");
const handleError =(error) => console.log("DB Error",error); 

db.on("error",(error) => console.log("DB Error",error));
db.once("open",handleOpen);
