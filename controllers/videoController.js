import Video from "../models/Video";
import User from "../models/User";

export const home = async (req,res) => {
 
  const videos = await Video.find({})
  .sort({ createdAt: "desc" })
  .populate("owner");

    return res.render("home",{pageTitle:"Home", videos});
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
  const { 
    user: {_id},
  } = req.session;
  const video = await Video.findById(id);
  if(!video){
    // error를 먼저 체크할것
    return res.status(404).render("404",{pageTitle:"video not found."});
  }
  // console.log(video.owner, _id);
  if(String(video.owner) !== String(_id)){
    return res.status(403).redirect("/");
  }
  return res.render("edit",{pageTitle:`Edit: ${video.title}`, video});
};
export const postEdit = async (req,res) => {
  const { 
    user: { _id },
  } = req.session;
  const {id} = req.params;
  const {title,description, hashtags} = req.body;
  const video = await Video.exists({_id: id});
  if(!video){
    return res.render("404",{pageTitle:"video not found."});
  }
  const videoModified = await Video.findByIdAndUpdate(id,{
    title,
    description,
    hashtags:Video.formathashtags(hashtags),
  });
  if(String(videoModified.owner) !== String(_id)){
    return res.status(403).redirect("/");
  }
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
  //console.log(req.files); =>video,thumb
  const {video,thumb } = req.files;
  // file 자체가 아니라 file의 경로를 원하니까...
  // here we will add a video to the videos array.
  const {title, description, hashtags} = req.body;
  // 이제 document를 만들어야하는데 document는 데이터를 가진 비디오
  // 그후에 document를 db에 저장!
  try{
  const newVideo =  await Video.create({
    title,
    description,
    fileUrl: video[0].path,
    thumbUrl:Video.changePathFormula(video[0].path),
    owner: _id,
    hashtags:Video.formathashtags(hashtags),
   
  });
  const user = await User.findById(_id);
  user.videos.push(newVideo._id);
  // password 수정시에만 hash하기
  user.save();
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
  const { 
    user: {_id},
  } = req.session;
  const video = await Video.findById(id);
  if(!video){
    return res.status(404).render("404",{pageTitle:"video not found."});
  }
  if(String(video.owner) !== String(_id)){
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);

  return res.redirect("/");
}

export const search = async (req,res) => {
  const {keyword} = req.query;
  let videos =[];
  if(keyword){
   videos =await Video.find({
    title: {
      $regex: new RegExp(`${keyword}`,"i"),
    },
  }).populate("owner");
  }
  return res.render("search",{pageTitle:"Search",videos});
}

export const registerView = async(req,res) =>{
  const { id } = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.sendStatus(404);
  }
  //video가 있을경우 아를 업데이트 한다
  video.meta.views = video.meta.views +1;
  await video.save();
  // update가 ok 되었다는 뜻의 status(200)을 return
  return res.sendStatus(200);
  // status는 render하기 전의 상태를 
};
