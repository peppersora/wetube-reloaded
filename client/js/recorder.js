
// 먼저 버튼을 만들어서 유저가 누를수 있게하자
const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

//function은 외부에 있는 변수를 받을 수 있다.
let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webem";
    document.body.appendChild(a);
    a.click();
};

const handleStop = () =>{
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click",handleStop);
    startBtn.addEventListener("click",handleDownload);

    recorder.stop();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click",handleStart);
    startBtn.addEventListener("click",handleStop);
    recorder = new MediaRecorder(stream,{ mimeType: "video/webm" });

    recorder.ondataavailable = (event) =>{
        
        videoFile = URL.createObjectURL(event.data);
        preview.srcObject = null;
        preview.src = videoFile;
        preview.loop =true;
        preview.play();
    };
    
        recorder.start();
       
};

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:200,height:100},
    });
    preview.srcObject = stream;
    // srcObject는 video가 가질수 있는 무언가
    preview.play();
};

init();

startBtn.addEventListener("click",handleStart);
