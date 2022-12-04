import Video from "../models/Video";
/* 1. callback 방식
console.log("start");
Video.find({},(error,videos) =>{
  if(error){
    return res.render("server-error")
  }
    return res.render("home",{pageTitle:"Home", videos});
});
  console.log("finished!");
*/
// 2. promise 방식
export const home = async (req,res) => {
  try{
    console.log("Start")
    const videos = await Video.find({});
    console.log(videos);
    console.log("finished")
    return res.render("home",{pageTitle:"Home", videos});

  }catch(error){
    return res.render("server-error",{error});
  }
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

export const postUpload = (req,res) => {
  // here we will add a video to the videos array.
  const {title} = req.body;
  return res.redirect("/");
};

