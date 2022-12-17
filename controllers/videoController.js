import Video from "../models/Video";
import User from "../models/User";

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
  
    const videos = await Video.find({}).sort({createdAt:"desc"});
    console.log(videos);
    return res.render("home",{pageTitle:"Home", videos});
    // return을 사용하는 진짜 이유는 function을 종료시켜주기때문
  /* js가 위에서 아래로 단지 읽었다면, 
    await을 사용하면 기다려준다. => 언제까지?
    database에게 결과값을 받을 때까지...
    async와 await은 callback보다 최신기술로
    최대 장점은 직관적이라는것..!*/

};

export const watch = async (req,res) => {
  // console.log(req.params);
  const {id} = req.params;
  //id가 req.params에서 오는것 정말정말 중요!!
  //req.param => router가 주는 express기능
  const video = await Video.findById(id).populate("owner");
  // mongoose의 ref를 이용해, populate("owner")를 하면 owner object전체가 나온다
  
  if(!video){
    return res.render("404",{pageTitle:"video not found."});
  }
  return res.render("watch",{pageTitle: video.title, video});
};

export const getEdit = async (req,res) => {
  // form을 화면에 보여주는 애
  const {id} = req.params;
  const video = await Video.findById(id);
  if(!video){
    // error를 먼저 체크할것
    return res.status(404).render("404",{pageTitle:"video not found."});
  }
  return res.render("edit",{pageTitle:`Edit: ${video.title}`, video});
};
export const postEdit = async (req,res) => {
  // post는 변경사항을 저장해주는애
  const {id} = req.params;
  const {title,description, hashtags} = req.body;
  const video = await Video.exists({_id: id});
  // exists는 filter를 필요로 한다.
  if(!video){
    return res.render("404",{pageTitle:"video not found."});
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags:Video.formathashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
  // redirect는 브라우저가 자동으로 이동하는것
};  
// ============= practice ======
export const getUpload = (req,res) => {
  return res.render("upload",{pageTitle:"Upload Video"});
};

export const postUpload = async (req,res) => {
  const { 
    user: _id 
  } = req.session;
  const { path: fileUrl } = req.file;
  // file 자체가 아니라 file의 경로를 원하니까...
  // here we will add a video to the videos array.
  const {title, description, hashtags} = req.body;
  // 이제 document를 만들어야하는데 document는 데이터를 가진 비디오
  // 그후에 document를 db에 저장!
  try{
  await Video.create({
    title,
    description,
    fileUrl,
    owner: _id,
    hashtags:Video.formathashtags(hashtags),
   
  });
 
  // save는 promise를 return하고 이걸 await하면 우리 document가 return된다.
  // database에 파일이 저장되는것을 기다리게하기 위해 async+await을 추가
  
  return res.redirect("/");
} catch(error){
  
  return res.status(400).render("upload",{
    pageTitle:"Upload Video",
    errorMassage: error._message,
    });
  }
};

export const deleteVideo = async(req,res) => {
  const {id} = req.params;
  await Video.findByIdAndDelete(id);
  // delete video
  return res.redirect("/");
}

export const search = async (req,res) => {
  const {keyword} = req.query;
  let videos =[];
  if(keyword){
   videos =await Video.find({
    title: {
      $regex: new RegExp(`${keyword}`,"i"),
    }
   });
  }
  return res.render("search",{pageTitle:"Search",videos});
}
