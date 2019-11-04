import {newUser,registerUser,editUser, loginUser,logoutUser,isLoggedIn} from "../middlewares/middlewares";

export const initRoutes = app =>{
    app.get("/", (req,res)=>res.render("index"));
    app.get("/user/register", (req,res)=>res.render("register"));
    app.get("/user/login", (req,res)=>res.render("login"));
    app.get("/user/dashboard", isLoggedIn, (req,res)=>res.render("dashboard"));


    app.post("/user/register", registerUser);
    app.post("/user/login", loginUser)
    app.post("/user/new", newUser);
    app.put("/user/:id", editUser)
    
   
}
