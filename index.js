
import express, { urlencoded } from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
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
app.use(
    session({
        secret: "Hello",
        resave:true,
        saveUninitialized: true,
        // session을 db와 연결해줌
        store: MongoStore.create({ mongoUrl :"mongodb://127.0.0.1:27017/wetube"}),
        
    })
    );
    
// locals Middleware
app.use(localsMiddleware);
app.use("/",rootRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);
export default app;

