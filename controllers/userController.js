import User from "../models/User";
export const getJoin = (req, res) => res.render("join",{pageTitle: "Join"});
export const postJoin = async (req,res) =>{
    console.log(req.body);
    const {name, username, email, password, location } = req.body;
    const pageTitle = "Join";
    const exists = await User.exists({ $or: [{ username },{ email }] });
    /* $or연산자를 사용하는 이유는 둘 이상의 조건에대해
        논리적 or 연산을 수행하고 조건 중 하나 이상을 
        충족하는 문서를 선택한다.
        여러조건에 하나만 해당되도 찾을 수 있기때문에 유용!*/
    if(exists){
        return res.render("join",{
        pageTitle ,
        errorMessage: "This username/email is already taken.",
        })
    }
   
    await User.create({
        name,
        username, 
        email, 
        password, 
        location, 
    });
    return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");