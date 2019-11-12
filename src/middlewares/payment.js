import { createPay } from "../helpers/createPay";
import {PAYPAL_MODE, PAYPAL_SECRET, PAYPAL_CLIENT_ID, DOMAIN_NAME} from "../config/constants"
const Service = require("../models/service");

const paypal = require("paypal-rest-sdk")


// module.exports = () 
paypal.configure({
    'mode': PAYPAL_MODE, 
    'client_id': PAYPAL_CLIENT_ID,
    'client_secret': PAYPAL_SECRET
  });

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

	// create payment object 
    var payment = {
            "intent": "authorize",
	"payer": {
		"payment_method": "paypal"
	},
	"redirect_urls": {
		"return_url": `${DOMAIN_NAME}/services/${service._id}/payment/success`,
		"cancel_url": `${DOMAIN_NAME}/err`
	},
	"transactions": [{
		"amount": {
			"total": service.price,
			"currency": service.currency
		},
        "description": service._id,
        
	}]
    }

	// call the create Pay method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    // redirect to paypal where user approves the transaction 
                    console.log(transaction);
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });
    }
    })
    }


    export const paymentSuccess = (req,res) =>{
                               Service.findById(req.params.service_id, (err,service)=>{
                        if(err){
                   return res.status(404).send("Internal Server Error... Server not found")

                        } else{

                            res.send(`${service} was paid for by ${req.user.username} and this is the transaction: ${transaction}`)
                        }
                
            });
        
    }

					
		
