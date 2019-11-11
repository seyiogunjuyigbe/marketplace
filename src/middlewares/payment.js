import { createPay } from "../helpers/createPay";
const Service = require("../models/service");

const paypal = require("paypal-rest-sdk")


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
		"return_url": "http://127.0.0.1:3000/success",
		"cancel_url": "http://127.0.0.1:3000/err"
	},
	"transactions": [{
		"amount": {
			"total": service.price,
			"currency": service.currency
		},
		"description": service.title
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

					
		