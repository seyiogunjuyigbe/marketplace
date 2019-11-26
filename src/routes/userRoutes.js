import {newUser,registerUser,editUser, loginUser,logoutUser,isLoggedIn} from "../middlewares/middlewares";
import { logHelp } from "../helpers/login";
import { renderServicePage, createService, seeMyServices, editService, deleteService } from "../middlewares/services";
import { myProfile } from "../middlewares/myProfile";
import { getAllServices, getThisService, getByCategory } from "../middlewares/getServices";
import { payNow, paymentSuccess, renderPayPAge } from "../middlewares/payment";
import { renderLandingPage } from "../middlewares/renderPage";
import { charge } from "../controllers/stripe";
import { getMyOrders, getMyPurchases, getMyInbox } from "../services/dashboard";
import { findService } from "../helpers/findService";
import { searchItem } from "../middlewares/search";
// import { renderPayPAge, testPay } from "../middlewares/testPay";
import {ensureLoggedIn} from "connect-ensure-login";
export const initRoutes = app =>{
    app.get("/", renderLandingPage);
    app.get("/user/register", (req,res)=>res.render("register", {errMessage: null}));
    app.get("/user/login", (req,res)=>res.render("login", {errMessage: null}));
    app.get("/profile/user/profile", isLoggedIn, myProfile);
    app.get("/profile/services/new", isLoggedIn, renderServicePage);
    app.get("/profile/myservices", isLoggedIn, seeMyServices);
    app.get("/services/all", getAllServices);
    app.get("/services/:service_id", getThisService);
    app.get("/user/:id/services/:service_id/edit", isLoggedIn, editService);
    app.get("/user/:id/services/:service_id/delete", isLoggedIn, deleteService)
    // app.get("/user/login/success", (req,res)=>res.send(`${req.user} Logged in successfully!`))
    app.post("/user/register", registerUser);
    app.post("/user/login", loginUser, logHelp);
    app.get("/user/logout", logoutUser);
    app.get("/charge", charge);
    app.get("/find", findService);
    app.get("/categories/:category", getByCategory)
    app.get("/services/:service_id/pay",ensureLoggedIn('/user/login'), renderPayPAge);
    app.post("/services/:service_id/pay",isLoggedIn, payNow);
       app.get("/testSuccess", (req,res)=>{res.send("Payment Successful")})
    // app.get("/services/:service_id/payment/success",isLoggedIn, paymentSuccess)
// Create Service
    app.post("/profile/services/new", isLoggedIn, createService)
// Update User details
    app.put("/user/:id", editUser)
// View my Orders
    app.get("/profile/orders", isLoggedIn, getMyOrders);
// View my Purchases
    app.get("/profile/purchases",isLoggedIn, getMyPurchases)
// View my Inbox
    app.get("/profile/inbox", isLoggedIn, getMyInbox);
    // app.get("/search", searchItem)
    app.all("*", (req,res)=>{res.send("Error... resource not found")})
}