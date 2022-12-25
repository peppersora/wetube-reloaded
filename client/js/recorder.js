import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";
// 먼저 버튼을 만들어서 유저가 누를수 있게하자
const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

//function은 외부에 있는 변수를 받을 수 있다.
let stream;
let recorder;
let videoFile;
const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
}; // downloadFile 끝

const handleDownload = async() => {
    startBtn.removeEventListener("click",handleDownload);

    startBtn.innerText = "Transcording...";
    
    startBtn.disabled = true;

    const ffmpeg = createFFmpeg({ log: true});
    await ffmpeg.load();
    // 세가지중 writeFile은 ffmpeg파일에 가상의 파일을 생성해준다.
    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
    // 명령어 -i, recording.webm을 mp4로 변환시킨다는 내용, -r과 60은 초당 60으로 인코딩
    await ffmpeg.run("-i", files.input,"-r","60", files.output);

    await ffmpeg.run("-i",files.input, "-ss" ,"00:00:01", "-frames:v","1", files.thumb);

    const mp4File = ffmpeg.FS("readFile",files.output);
    const thumbFile = ffmpeg.FS("readFile",files.thumb);

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});


    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "MyRecording.mp4");
    downloadFile(thumbUrl, "MyThumbnail.jpg");

    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    startBtn.disabled = false;
    startBtn.innerText = "Record Again";
    startBtn.addEventListener("click", handleStart);
};// handledownload 끝



// const handleStop = () =>{
//     startBtn.innerText = "Download Recording";
//     startBtn.removeEventListener("click",handleStop);
//     startBtn.addEventListener("click",handleDownload);

//     recorder.stop();
// };// handlestop 끝


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
       
};// handlestart 끝

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:200,height:100},
    });
    preview.srcObject = stream;
    // srcObject는 video가 가질수 있는 무언가
    preview.play();
};// init 끝

init();

startBtn.addEventListener("click",handleStart);
