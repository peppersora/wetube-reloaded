import Video from "../models/Video";

export const home = (req,res) => {
  Video.find({},(error,videos) =>{
    return res.render("home",{pageTitle:"Home", videos});
  
  });
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

