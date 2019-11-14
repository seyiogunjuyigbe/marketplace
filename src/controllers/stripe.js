import STRIPE_SECRET_KEY from "../config/constants"
const stripe = require("stripe")("sk_test_UcHnlZYGEETuFOM3iBYRlMTH00kOVGOz0Q");
export const charge = (req,res) => {
        stripe.charges.create({
      amount: 999,
      currency: 'usd',
      source: 'tok_visa',
      receipt_email: 'jenny.rosen@example.com',
    }, (err,success)=>{
        if(!err){
           return res.send(success)
        } else{
           return res.send(err)
        }
    });
  };