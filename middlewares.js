import multer from "multer";

export const localsMiddleware = (req, res, next ) =>{
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    console.log(req.session.user);
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        // 로그인 되어 있다면 request를 계속...
       return next();
    }else{
        req.flash("error","Not authorized");
        // 만약 로그인 되어있지 않다면 => login페이지로 redirect...
        return res.redirect("/login");
    }
};

// 로그인 되어있지 않은 사람들만 접근할 수 있는 미들웨어
export const publicOnlyMiddleware = (req,res,next) =>{
    if(!req.session.loggedIn){
      return next();
    } else {
        req.flash("error","Not authorized");
        return res.redirect("/");
    }
};
// 파일 업로드
//  두개로 만들것(avatar, video용)
export const avatarUpload = multer({
    dest: "uploads/avatars/", 
    limits: {
        fileSize: 3000000,
    },

    });
export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 10000000,
    },
});
