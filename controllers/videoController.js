let videos = [
  {
    title:"First Video",
    rating:5,
    comment:2,
    createdAt:"2 minutes ago",
    views:1,
    id:1,
  },
  {
    title:"Second Video",
    rating:5,
    comment:2,
    createdAt:"2 minutes ago",
    views:59,
    id:2,
  },
  {
    title:"Third Video",
    rating:5,
    comment:2,
    createdAt:"2 minutes ago",
    views:59,
    id:3,
  }

];

export const trending = (req,res) => {
  
  return res.render("home",{pageTitle:"Home",videos});
};

export const watch =(req,res) => {
  // console.log(req.params);
  const id = req.params.id;
  const video=videos[id-1];
  // const { id } = req.params; <= ES6 방식
  // console.log("show video",id);
  return res.render("watch",{pageTitle:`watching ${video.title}`,video});
};
//  render() 메소드에 들어갈 내용과 pug의 파일명이 같아야함
//  파일명에 띄어쓰기가 들어가있으면 절대 안되고, 무조건 소문자로쓸것!
export const edit = (req,res) => res.render("edit");
    
export const search = (req,res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req,res) => res.send("Delete Video");
