import {newUser,registerUser,editUser, loginUser,logoutUser,isLoggedIn} from "../middlewares/middlewares";
import { logHelp } from "../helpers/login";
import { renderServicePage, createService, seeAllServices } from "../middlewares/services";
import { myProfile } from "../middlewares/myProfile";

export const initRoutes = app =>{
    app.get("/", isLoggedIn, (req,res)=>res.render("index"));
    app.get("/user/register", (req,res)=>res.render("register"));
    app.get("/user/login", (req,res)=>res.render("login"));
    app.get("/user/profile", myProfile);
    app.get("/user/dashboard", isLoggedIn, (req,res)=>res.render("dashboard"));
    app.get("/user/:id/services/new", isLoggedIn, renderServicePage);
    app.get("/user/:id/services/all", isLoggedIn, seeAllServices);
    app.get("/user/login/success", (req,res)=>res.send(`${req.user} Logged in successfully!`))
    app.post("/user/register", registerUser);
    app.post("/user/login", loginUser, logHelp);
    app.get("/user/logout", logoutUser);
    app.post("/user/new", newUser);
// Update User details
    app.put("/user/:id", editUser)
// Create Service
    app.post("/user/:id/services/new", isLoggedIn, createService)

}
