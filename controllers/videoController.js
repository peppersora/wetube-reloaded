import Video from "../models/Video";
/* 1. callback 방식
console.log("start");
Video.find({},(error,videos) =>{
  중괄호는 search terms인데, 이것이 비어져있으면 모든 형식을
  찾는다는것을 뜻한다.
  if(error){
    return res.render("server-error")
  }
    return res.render("home",{pageTitle:"Home", videos});
});
  console.log("finished!");
*/
// 2. promise 방식
export const home = async (req,res) => {
  
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home",{pageTitle:"Home", videos});
    // return을 사용하는 진짜 이유는 function을 종료시켜주기때문
  /* js가 위에서 아래로 단지 읽었다면, 
    await을 사용하면 기다려준다. => 언제까지?
    database에게 결과값을 받을 때까지...
    async와 await은 callback보다 최신기술로
    최대 장점은 직관적이라는것..!*/

};

export const watch =(req,res) => {
  // console.log(req.params);
  const {id} = req.params;
  return res.render("watch",{pageTitle:`Watching`});
};
export const getEdit = (req,res) => {
  // form을 화면에 보여주는 애
  const {id} = req.params;
  return res.render("edit",{pageTitle:`Editing`});
};
export const postEdit = (req,res) => {
  // post는 변경사항을 저장해주는애
  const {id} = req.params;
  const {title} = req.body;
  return res.redirect(`/videos/${id}`);
  // redirect는 브라우저가 자동으로 이동하는것
};  
// ============= practice ======
export const getUpload = (req,res) => {
  return res.render("upload",{pageTitle:"Upload Video"});
};

export const postUpload = async (req,res) => {
  // here we will add a video to the videos array.
  const {title, description, hashtags} = req.body;
  // 이제 document를 만들어야하는데 document는 데이터를 가진 비디오
  // 그후에 document를 db에 저장!
  await Video.create({
    title,
    description,
    createdAt:" lalalal",
    hashtags:hashtags.split(",").map((word) =>`#${word}`),
    meta:{
      views:0,
      rating:0,
    },
  });
 
  // save는 promise를 return하고 이걸 await하면 우리 document가 return된다.
  // database에 파일이 저장되는것을 기다리게하기 위해 async+await을 추가
  
  return res.redirect("/");
};

