import { STRIPE_SECRET_KEY, STRIPE_PUBLISH_KEY } from "../config/constants";

const Service = require("../models/service");
const User = require("../models/user");
const Purchase = require("../models/purchase")
const stripe = require("stripe")(STRIPE_SECRET_KEY);

export const renderPayPAge = (req,res)=>{
    User.findById(req.user._id, (err,user)=>{
        if(err || user == undefined){
            res.status(404).render("error", {errMessage: "Sorry, we couldn't find your profile"})
        } else{
            Service.findById(req.params.service_id, (err,service)=>{
                if(err || service == undefined){
                    return res.status(404).render("error", {errorMessage: "Service not found!"})
        
                } else{
                     res.render("payForService", {
        STRIPE_PUBLISH_KEY: STRIPE_PUBLISH_KEY,
        STRIPE_SECRET_KEY: STRIPE_SECRET_KEY, 
        user:user,
        service:service

    })
                }
            })
            
        }
    })
   

   
}

export const payNow = ( req , res ) => {
    const token = req.body.stripeToken;
    const chargeAmt = req.body.chargeAmt;
    Service.findById(req.params.service_id, (err,service)=>{
        if(err || service == undefined){
            return res.status(404).send("Error... service not found")
        } else if(service.createdBy == req.user._id){
            return res.status(403).send("Sorry, You can not buy your own service")
        }
        else{
            User.findById(req.user._id, (err,user)=>{
                if(err){
                    return res.status(404).send("Sorry... We can't find your user account")
                } else{
                 User.findById(service.createdBy, (err,serviceOwner)=>{
                     if(err || serviceOwner == undefined){
                         return res.status(404).render("error", {errMessage: "Sorry, but somehw we couldn't find the owner of that service"})
                     } else{
                        const token = req.body.stripeToken;
                        const chargeAmt = req.body.chargeAmt;
                        const charge = stripe.charges.create({
                            amount: chargeAmt,
                            currency: "usd",
                            source: token
                        }, (err,charge)=>{
                            if(err){
                                console.log(err.message)
                                res.send(err.message)
    
                             } 
                           else{
                                if(charge.paid == true && charge.status == "succeeded"){
                                    Purchase.create({
                                        title: service.title,
                                        serviceID: service._id,
                                        sellerID: service.createdBy,
                                        seller: service.seller,
                                        deliveryTime: service.deliveryTime,
                                        buyerID: req.user._id,
                                        buyer: req.user.username,
                                        transaction: charge.id,
                                        balance_transaction: charge.balance_transaction,
                                        createdAt: Date.now(),
                                        status: "paid",
                                        projectStatus : "started"
                                    },(err,purchase)=>{
                                        if(err){
                                            res.status(500).send("Internal Server Error")
                                        } else{
                                            user.purchases.push(purchase);
                                            user.isBuyer = true;
                                            serviceOwner.orders.push(purchase)
                                            serviceOwner.balance += (charge.amount/100);
                                            purchase.save();
                                            user.save();
                                            serviceOwner.save();
                                            console.log(purchase)
                                        }
                                    })
                                    res.redirect("/profile/purchases")
                                }
                            }                    
                        });
                        console.log("payment successful")
                     }
                 })
            }  
                }) ;

            };
            
    })
         
}
    export const paymentSuccess = (req,res) =>{
                               Service.findById(req.params.service_id, (err,service)=>{
                        if(err){
                   return res.status(404).send("Internal Server Error... Service not found")
                        } else{
                            console.log(req._parsedOriginalUrl)
                            res.send(`${service} was paid for by ${req.user.username}`)
                        }
                    });
            }

					
		// const createTrans = (req, trans,service) =>{
        //     User.findById(service.createdBy, (err,user)=>{
        //         if(err){
        //             res.status(404).send("User not found..")
        //         } else{
        //             Purchase.create({
        //                 service: service._id,
        //                 owner: service.createdBy,
        //                 buyer:req.user._id,
        //                 transaction: trans,
        //                 createdAt: Date.now(),
        //                 status: "pending"
        //             }, (err,purchase)=>{
        //                 if(err){
        //                     console.log(err)
        //                 } else{
        //                     user.transactions.push(trans)
        //                     user.purchases.push(purchase)
        //                     user.save()
        //                     console.log(user)
        //                 }
        //             })
        //         }
        //     })
        // }
