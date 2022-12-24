import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
// 먼저 버튼을 만들어서 유저가 누를수 있게하자
const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

//function은 외부에 있는 변수를 받을 수 있다.
let stream;
let recorder;
let videoFile;

const handleDownload = async() => {
    // 콘솔에서 확인하기위해 log: true사용
    const ffmpeg = createFFmpeg({ log: true});
    await ffmpeg.load();
    // 세가지중 writeFile은 ffmpeg파일에 가상의 파일을 생성해준다.
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    // 명령어 -i, recording.webm을 mp4로 변환시킨다는 내용, -r과 60은 초당 60으로 인코딩
    await ffmpeg.run("-i", "recording.webm","-r","60", "output.mp4");

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
