import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./index";


const PORT = 4000;

const handleListening = () =>
 console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT,handleListening);
/* call-back?
    우리가 포트를 불러오면 app.listen이 실행되는데
    이때에 listen 그 자체가 콜백함수!
    port연결이 확인되면 특정 function이 실행되니까...
*/