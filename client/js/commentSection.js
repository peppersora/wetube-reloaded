
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");


const handleSubmit = async(event) => {
    // 브라우저가 원래하려는 동작을 막기위해 필요한 코드
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    // fetch의 역할은 url의 변경없이 js를 통해서 request를 보낼 수 있게 해준다.
    if( text === ""){
        return;
    }
    await fetch(`/api/videos/${videoId}/comment`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({ text }),
    });
    // 저장하고 값을 비우기
    textarea.value = "";

};
if(form){
    form.addEventListener("submit",handleSubmit);
}
