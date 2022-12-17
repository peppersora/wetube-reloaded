import express, { urlencoded } from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware, protectorMiddleware, publicOnlyMiddleware } from "./middlewares";
//"express"라는 이름의 package를 express라는 이름으로 import해왔다는 뜻
// "morgan"이라는 이름의 package를 logger라는 이름으로 import해왔다는 뜻

const app = express();
/*서버는 24시간 내내 온라인에 연결된 컴퓨터라고 할 수 있다. 
그리고 request에대해 서버는 listening하고 있다.
다시말해 서버는 사용자의 request에대해 listening을 하고 response하고 있다..!
*/
const logger = morgan("dev");

app.set("view engine","pug");
// pug를 view engine으로 설정을해야 html을 가져올수 있다.
app.set("views", process.cwd() + "/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
// session Middleware
console.log(process.env.COOKIE_SECRET);
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        // secret에 씌여진 string을 가지고 쿠키를 sign하고, 우리가 만든것임을 증명할 수 있기 때문
        // 쿠키는 domain에 있는 백엔드로만 전송된다.
        resave:false,
        saveUninitialized: false,
        // 세션이 새로 만들어지고, 수정된 적이 없을때 Uninitialized
        // cookie: {
        //     maxAge:20000,
        //     //쿠키가 얼마나 오래 있을 수 있는지 알려줌
        // },
        // session을 db와 연결해줌
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL}),
        
    })
    );
    
// locals Middleware
app.use(localsMiddleware);
app.use("/uploads",express.static("uploads"));
app.use("/assets",express.static("assets"));
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
export default app;

