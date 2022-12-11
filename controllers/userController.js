import User from "../models/User";
import bcrypt from "bcrypt";
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
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
    return res.status(400).render("login",{
    pageTitle,
    errorMessage: "wrong password", 
    });

    }

    console.log("comming soon!");
    return res.redirect("/");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");