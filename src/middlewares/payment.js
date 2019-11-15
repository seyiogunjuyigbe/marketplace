const Service = require("../models/service");
const User = require("../models/user");
const Purchase = require("../models/purchase")
const stripe = require("stripe")("sk_test_UcHnlZYGEETuFOM3iBYRlMTH00kOVGOz0Q");


// start payment process 
export const payNow = ( req , res ) => {
    // Get service
    Service.findById(req.params.service_id, (err,service)=>{
        if(err){
            return res.status(404).send("Error... service not found")
        } else if(service.createdBy == req.user._id){
                return res.status(403).send("Sorry, You can not buy your own service")
        }
        else{
            User.findById(req.user._id, (err,user)=>{
                if(err){
                    return res.status(500).send("Internal Server Error... We can't find you user account")
                } else{
                try{
                  stripe.customers
                            .create({
                                email: user.email,
                                phone: user.phone,
                                name: `${user.firstName} ${user.lastName}`,
                            })
                            .then(customer=>
                                stripe.charges.create({
                                amount: service.price,
                                currency: "usd",
                                customer: customer.id,
                                receipt_email: customer.email,
                                receipt_number: customer.phone,
                                })
                            )
                        .then((charge)=>res.send(`This is the charge ${charge}`))
                        .catch(err=>console.log(err))
                } catch(err){
                    res.send(err);
                }
            }
            });
            
    }

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

					
		const createTrans = (req, trans,service) =>{
            User.findById(service.createdBy, (err,user)=>{
                if(err){
                    res.status(404).send("User not found..")
                } else{
                    Purchase.create({
                        service: service._id,
                        owner: service.createdBy,
                        buyer:req.user._id,
                        transaction: trans,
                        createdAt: Date.now(),
                        status: "pending"
                    }, (err,purchase)=>{
                        if(err){
                            console.log(err)
                        } else{
                            user.transactions.push(trans)
                            user.purchases.push(purchase)
                            user.save()
                            console.log(user)
                        }
                    })
                }
            })
        }
