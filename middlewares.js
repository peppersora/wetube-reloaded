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
        // 만약 로그인 되어있지 않다면 => login페이지로 redirect...
        return res.redirect("/login");
    }
};

// 로그인 되어있지 않은 사람들만 접근할 수 있는 미들웨어
export const publicOnlyMiddleware = (req,res,next) =>{
    if(!req.session.loggedIn){
      return next();
    } else {
        return res.redirect("/");
    }
};