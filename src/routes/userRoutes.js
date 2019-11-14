import {newUser,registerUser,editUser, loginUser,logoutUser,isLoggedIn} from "../middlewares/middlewares";
import { logHelp } from "../helpers/login";
import { renderServicePage, createService, seeMyServices, editService, deleteService } from "../middlewares/services";
import { myProfile } from "../middlewares/myProfile";
import { getAllServices, getThisService } from "../middlewares/getServices";
import { payNow, paymentSuccess } from "../middlewares/payment";
import { renderLandingPage } from "../middlewares/renderPage";
import { charge } from "../controllers/stripe";

export const initRoutes = app =>{
    app.get("/", renderLandingPage);
    app.get("/user/register", (req,res)=>res.render("register"));
    app.get("/user/login", (req,res)=>res.render("login"));
    app.get("/user/profile", myProfile);
    app.get("/user/dashboard", isLoggedIn, (req,res)=>res.render("dashboard"));
    app.get("/services/new", isLoggedIn, renderServicePage);
    app.get("/user/:id/services/myservices", isLoggedIn, seeMyServices);
    app.get("/services/all", getAllServices);
    app.get("/services/:service_id", getThisService);
    app.get("/user/:id/services/:service_id/edit", isLoggedIn, editService);
    app.get("/user/:id/services/:service_id/delete", isLoggedIn, deleteService)
    // app.get("/user/login/success", (req,res)=>res.send(`${req.user} Logged in successfully!`))
    app.post("/user/register", registerUser);
    app.post("/user/login", loginUser, logHelp);
    app.get("/user/logout", logoutUser);
    app.post("/user/new", newUser);
    app.get("/charge", charge)
    // app.get("/services/:service_id/pay",isLoggedIn, payNow)
    // app.get("/services/:service_id/payment/success",isLoggedIn, paymentSuccess)

    // success page 
app.get('/success' , (req ,res ) => {
    console.log(req.query); 
    res.send("Success!")
})

// error page 
app.get('/err' , (req , res) => {
    console.log(req.query); 
    res.send('Failed!'); 
})

// Update User details
    app.put("/user/:id", editUser)
// Create Service
    app.post("/user/:id/services/new", isLoggedIn, createService)
        // app.all("*", (req,res)=>{res.send("Error... resource not found")})
}
