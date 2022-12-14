import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { application } from "express";
export const getJoin = (req, res) => res.render("join",{pageTitle: "Join"});
export const postJoin = async (req,res) =>{
    console.log(req.body);
    const {name, username, email, password,password2, location } = req.body;
    const pageTitle = "Join";
    if(password !== password2){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage: "Password confirmation does not match.",
        });
    }

    const exists = await User.exists({ $or: [{ username },{ email }] });
    /* $or연산자를 사용하는 이유는 둘 이상의 조건에대해
        논리적 or 연산을 수행하고 조건 중 하나 이상을 
        충족하는 문서를 선택한다.
        여러조건에 하나만 해당되도 찾을 수 있기때문에 유용!*/
    if(exists){
        return res.status(400).render("join",{
        pageTitle ,
        errorMessage: "This username/email is already taken.",
        });
    }
    try {
        await User.create({
            name,
            username, 
            email, 
            password, 
            location, 
        });
        return res.redirect("/login");
    } catch(error){
        return res.status(400).render("join", {
            pageTitle: "Upload Video",
            errorMessage: "error.message,"
        })};//db에서 에러를 방지하기 위해 try-catch 사용
};
export const getLogin = (req, res) =>
    res.render("login",{pageTitle: "Login"});


export const postLogin = async (req,res) => {
    const {username, password} = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",
        { pageTitle,
        errorMessage: "An account with this username does not exists.",
    });
    }
    const ok = bcrypt.compare(password, user.password);
    if(!ok){
    return res.status(400).render("login",{
    pageTitle,
    errorMessage: "wrong password", 
    });

 }
    req.session.loggedIn = true;
    req.session.user = user;
    // 세션을 수정할때만 세션을 db에 저장하고 쿠키를 넘겨줌
    // => 다시말해 로그인한 유저에게만 쿠키를 줌
    req.session.siteName = "Wetube";
    return res.redirect("/");
};

export const startGithubLogin =(req,res) =>{
    const baseUrl ="https://github.com/login/oauth/authorize";
    const config = {
        client_id:process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req,res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config={
    client_id:process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
    await fetch(finalUrl,{
        method:"POST",
        headers: {
            Accept: "application/json",
        },
    })
    ).json();
 
    if("access_token" in tokenRequest){
        //access api
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`,{
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
        ).json(); 
        console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`,{
            headers: {
                Authorization: `token ${access_token}`,
            },
            })
        ).json();
        const emailObj = emailData.find(
            (email) => email.primary == true && email.verified == true
        );
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email: emailObj.email});
        if(!user){
             user = await User.create({
                // 새로 만든 user를 return
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
        
    }else{
        return res.redirect("/login");
    };
};
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
export const getEdit = (req, res) => {
    return res.render("edit-profile",{pageTitle:"Edit Profile"});
};
export const postEdit = async (req, res) => {
    const {
        session:{
            user: { _id },
        },
        body :{ name, email, username, location },
    } = req;
    const updateUser = await User.findByIdAndUpdate( 
        _id , 
        {
        name,
        email,
        username,
        location,
    },
    {new: true }
    );
    req.session.user = updateUser;
    return res.redirect("/users/edit");
};

export const see = (req, res) => res.send("See User");