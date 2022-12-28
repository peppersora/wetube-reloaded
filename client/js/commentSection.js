
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text,id) => {
    const videoComments = document.querySelector(".video_comments ul");
   // newcomment를 li로 만들것
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className="video_comment";
    // new icon도 만들어야함
    //1-1.icon을 만든다
    const icon = document.createElement("i");
    //1-2. className을 부여해야함
    icon.className = "fas fa-comment";
    // 3. pug에 span을 만들고
    const span = document.createElement("span");
    span.innerText = `${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    //2. ul+li
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    //4. 마지막
    videoComments.prepend(newComment);

};

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
    const response = await 
    fetch(`/api/videos/${videoId}/comment`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({ text }),
    });
    // 저장하고 값을 비우기
    textarea.value = "";
    const {newCommentID} = await response.json();
    // console.log(json);
   if(response.status === 201){
    addComment(text,newCommentID);
   }
};

if(form){
    form.addEventListener("submit",handleSubmit);
}
