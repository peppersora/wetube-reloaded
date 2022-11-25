//가져오기
/*  innerwidth가 줄어들면 body의 색이 변한다
 * 
 */
    let background = document.querySelector("body");
    console.log(background);
    console.log(background.classList);
    
    function resizingHandler(){
        let frame = window.innerWidth;    
        if  (frame<=500){
            background.classList.add("background1");
            background.classList.remove("background2");
            background.classList.remove("background3");
        }else if(700>=frame && frame>500){
            background.classList.add("background2");
            background.classList.remove("background1");
            background.classList.remove("background3");
        }else if(frame>700){
            background.classList.add("background3");
            background.classList.remove("background1");
            background.classList.remove("background2");
        }


}


window.addEventListener("resize",resizingHandler);