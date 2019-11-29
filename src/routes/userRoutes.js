import {newUser,registerUser,editUser, loginUser,logoutUser,isLoggedIn} from "../middlewares/middlewares";
import { logHelp } from "../helpers/login";
import { renderServicePage, createService, seeMyServices, editService, deleteService } from "../middlewares/services";
import { myProfile, createProfile, createProfilePage, updateProfile } from "../middlewares/myProfile";
import { getAllServices, getThisService, getByCategory } from "../middlewares/getServices";
import { payNow, paymentSuccess, renderPayPAge } from "../middlewares/payment";
import { renderLandingPage } from "../middlewares/renderPage";
import { charge } from "../controllers/stripe";
import { getMyOrders, getMyPurchases, getMyInbox } from "../services/dashboard";
import { findService } from "../helpers/findService";
import { searchItem } from "../middlewares/search";
import {ensureLoggedIn} from "connect-ensure-login";
import{getGoogle, googleAuth} from "../middlewares/googleAuth";
export const initRoutes = app =>{
    app.get("/", renderLandingPage);
    // AUTH ROUTES
    app.get("/user/register", (req,res)=>res.render("register", {errMessage: null}));
    app.post("/user/register", registerUser);
    app.post("/user/login", loginUser, logHelp);
    app.get("/user/logout", logoutUser);
    app.get("/user/login", (req,res)=>res.render("login", {errMessage: null}));


    // SOCIAL AUTH
    app.get("/auth/google", getGoogle);
    app.get("/auth/google/callback", googleAuth)
    // USER ROUTES
    app.get("/profile/create", isLoggedIn, createProfilePage);
    app.post("/profile/create", isLoggedIn, createProfile)
    app.get("/profile/dashboard", isLoggedIn, myProfile);
    app.get("/profile/services/new", isLoggedIn, renderServicePage);
    app.get("/profile/myservices", isLoggedIn, seeMyServices);
    app.put("/profile/edit", isLoggedIn, updateProfile)
    app.get("/profile/orders", isLoggedIn, getMyOrders);
// View my Purchases
    app.get("/profile/purchases",isLoggedIn, getMyPurchases)
// View my Inbox
    app.get("/profile/inbox", isLoggedIn, getMyInbox);


    // SERVICE ROUTES
    app.get("/services/all", getAllServices);
    app.get("/services/:service_id", getThisService);
    app.get("/user/:id/services/:service_id/edit", isLoggedIn, editService);
    app.get("/user/:id/services/:service_id/delete", isLoggedIn, deleteService)
    app.get("/search", findService);
    app.get("/categories/:category", getByCategory)
    app.get("/services/:service_id/pay",ensureLoggedIn('/user/login'), renderPayPAge);
    app.post("/services/:service_id/pay",isLoggedIn, payNow);
// Create Service
    app.post("/profile/services/new", isLoggedIn, createService)

    // app.get("/search", searchItem)
    app.all("*", (req,res)=>{res.render("error", {errorMessage:"Error... resource not found"})})
}