/*
1. 크리스마스 - 오늘 날짜
2. 현재시간=>날짜로 치환 */
const TheDayBefore = document.querySelector("#TheDayBefore");
console.log(TheDayBefore);

function santaComming(){
    const christmasDay = new Date("2022-12-25");
    const todayDate = new Date(); 
    const santaComming = christmasDay - todayDate;
    console.log(santaComming);
    
   const santaCommingDay = Math.floor(santaComming/(1000*60*60*24));
   const santaCommingHour = Math.floor((santaComming/(1000*60*60))%24);
   const santaCommingMin = Math.floor((santaComming/(1000*60))%60);
   const santaCommingSec = Math.floor(santaComming/1000%60);
    
    TheDayBefore.innerText = `${santaCommingDay}d ${santaCommingHour}h ${santaCommingMin}m ${santaCommingSec}s`;
   
}
santaComming();
setInterval(santaComming,1000);
