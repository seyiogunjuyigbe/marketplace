import { STRIPE_SECRET_KEY } from "../config/constants";

const Service = require("../models/service");
const User = require("../models/user");
const Purchase = require("../models/purchase")
const stripe = require("stripe")(STRIPE_SECRET_KEY);

export const payNow = ( req , res ) => {
    const token = req.body.stripeToken;
    const chargeAmt = req.body.chargeAmt;
    Service.findById(req.params.service_id, (err,service)=>{
        if(err || service == null){
            return res.status(404).send("Error... service not found")
        } else if(service.createdBy == req.user._id){
            return res.status(403).send("Sorry, You can not buy your own service")
        }
        else{
            User.findById(req.user._id, (err,user)=>{
                if(err){
                    return res.status(404).send("Sorry... We can't find you user account")
                } else{
                        const intent = stripe.paymentIntents.create({
                        amount: service.price,
                        currency: service.currency,
                        payment_method_types: ['card'],
                        statement_descriptor: 'Custom descriptor',
                        metadata: {
                            description: service.title,
                            service_provider: service.createdBy,
                            buyer: user._id
                        },

                        }, (err,intent)=>{
                            if(err){
                                console.log(err)
                            } else{
                                console.log(intent)
                            }
                        });
                    res.status(200).send(intent)
                    // res.status(200).render("checkout", {secret:intent.client_secret})
                    } ;

                // try{
                //   stripe.customers
                //             .create({
                //                 email: user.email,
                //                 phone: user.phone,
                //                 name: `${user.firstName} ${user.lastName}`,
                //             })
                //             .then(customer=>
                //                 stripe.charges.create({
                //                 amount: service.price,
                //                 currency: "usd",
                //                 customer: customer.id,
                //                 receipt_email: customer.email,
                //                 receipt_number: customer.phone,
                //                 })
                //             )
                //         .then((charge)=>res.send(`This is the charge ${charge}`))
                //         .catch(err=>res.send(err))
                // } catch(err){
                //     res.send(err);
                // }
    //         }
            });
            
    }
            // User.findById(req.user.id, (err,user)=>{
            //     if(err){
            //        return res.render("error", {errorMessage: "User not found"})
            //     } else {
            //         Service.findById(req.params.service_id, (err,service)=>{
            //             if(!err){
            //                 service.paymentstatus = "paid"
            //                 service.orderedBy = user._id;
            //                 service.client = user.username;
            //                 service.projectStatus = "started";
            //                 service.orderDate = Date.now();
            //                 service.save();
            //                         User.findById(req.user._id, (err,user)=>{
            //                         user.purchases.push(service);
            //                         user.save();
            //                     })
            //                     User.findById(service.createdBy, (err,user)=>{
            //                         user.orders.push(service);
            //                         user.save()
            //                     })
            //                         console.log(service)

            //                     return res.redirect("/profile/dashboard")
            //             } else{
            //                 return res.status(404).send("That service was not found!")
            //             }

            //         })
            //     }
            // })


    });
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
