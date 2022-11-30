<<<<<<< Updated upstream
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
//"express"라는 이름의 package를 express라는 이름으로 import해왔다는 뜻
// "morgan"이라는 이름의 package를 logger라는 이름으로 import해왔다는 뜻
const PORT = 4000;

const app = express();
/*서버는 24시간 내내 온라인에 연결된 컴퓨터라고 할 수 있다. 
그리고 request에대해 서버는 listening하고 있다.
다시말해 서버는 사용자의 request에대해 listening을 하고 response하고 있다..!
*/
const logger = morgan("dev");
app.use(logger);

app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);


const handleListening = () =>
 console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT,handleListening);
=======
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

//"express"라는 이름의 package를 express라는 이름으로 import해왔다는 뜻
// "morgan"이라는 이름의 package를 logger라는 이름으로 import해왔다는 뜻
const PORT = 4000;

const app = express();
/*서버는 24시간 내내 온라인에 연결된 컴퓨터라고 할 수 있다. 
그리고 request에대해 서버는 listening하고 있다.
다시말해 서버는 사용자의 request에대해 listening을 하고 response하고 있다..!
*/
const logger = morgan("dev");
app.set("view engine","pug");
//view engine으로 pug를 셋팅
app.set("views",process.cwd()+"/views");

app.use(logger);
app.use("/",globalRouter);
app.use("/videos",videoRouter);
app.use("/users",userRouter);


const handleListening = () =>
 console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT,handleListening);
>>>>>>> Stashed changes
