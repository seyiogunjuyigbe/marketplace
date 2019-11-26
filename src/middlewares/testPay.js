import { STRIPE_PUBLISH_KEY, STRIPE_SECRET_KEY } from "../config/constants";
const stripe = require("stripe")(STRIPE_SECRET_KEY)

export const testPay = (req,res)=>{
const token = req.body.stripeToken;
const chargeAmt = req.body.chargeAmt;
const charge = stripe.charges.create({
    amount: chargeAmt,
    currency: "usd",
    source: token
}, (err,charge)=>{
    if(err){
        console.log(err)
     } 
  //  else{
    //     console.log(charge)
    //     console.log(req.body)
    // }
    
  
});
console.log("payment successful")
res.redirect("/testSuccess")
}
