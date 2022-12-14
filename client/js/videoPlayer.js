const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume=volumeValue;

const handlePlayClick = (e) =>{

    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Paused";
}

const handleMuteClick =(e) =>{
    if(video.muted){
        video.muted=false;
    }else{
        video.muted=true;
    }
    muteBtn.innerText= video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : volumeValue;
};


const handleVolumeChange = (event) =>{
    const {
        target: { value }, 
    } = event;
    if(video.muted){
        video.muted = false;
        video.innerText ="Mute";
    }
    volumeValue = value;
    video.volume=value;
    
};

const formatTime = (seconds) =>
new Date(seconds * 1000).toISOString().substring(11,19);

const handleLoadedMetadata = () =>{
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const handleTimeupdate =() =>{
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
    const { 
        target: {value},
    } = event;
    video.currentTime =value;
}

const handlefullScreen = () =>{
    const fullScreen = document.fullscreenElement;
    if(fullScreen){
        document.exitFullscreen();
        fullScreen.innerText = "Enter Full Screen";
    }else{
        video.requestFullscreen();
        fullScreen.innerText = "Exit Full Screen";

    }
};

const hideControls =() => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
      controlsTimeout = null;
    }
    if (controlsMovementTimeout) {
      clearTimeout(controlsMovementTimeout);
      controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
    //controlsMovementTimeout??? id??????
  };

// ??????????????? ?????? ??????????????? ????????????!!
const handleMouseLeave = () =>{
    controlsTimeout = setTimeout(() => {
        videoControls.classList.remove("showing");
    },3000);
};

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`,{
        method:"POST",
});
};

playBtn.addEventListener("click",handlePlayClick);
muteBtn.addEventListener("click",handleMuteClick);
volumeRange.addEventListener("input",handleVolumeChange);
video.addEventListener("loadedmetadata",handleLoadedMetadata);
video.addEventListener("timeupdate",handleTimeupdate);
video.addEventListener("ended",handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input",handleTimelineChange);
fullScreen.addEventListener("click",handlefullScreen);
