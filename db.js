
import mongoose from "mongoose";


mongoose.connect(process.env.DB_URL
,{useNewUrlParser: true,
  useUnifiedTopology: true,}
  );

// 연결의 성공여부를 출력
const db = mongoose.connection;
// "on"은 "onclick"처럼 여러번 계속 발생시킬수 있다.
// "once"는 한번만 발생시킨다.

const handleOpen = () => console.log("connected to DB!");
const handleError =(error) => console.log("DB Error",error); 

db.on("error",handleError);
db.once("open",handleOpen);
