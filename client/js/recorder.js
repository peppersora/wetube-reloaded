
// 먼저 버튼을 만들어서 유저가 누를수 있게하자
const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

const handleStart = async() => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{width:200,height:100},
    });
    preview.srcObject = stream;
    // srcObject는 video가 가질수 있는 무언가
    preview.play();
};

startBtn.addEventListener("click",handleStart);
