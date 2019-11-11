// const paypal = require("paypal-rest-sdk")
// // configure paypal with the credentials you got when you created your paypal app
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live 
//   'client_id': 'ATCN1tSARhFbP8YeY6LFw8dTqf0dnt9gWVpzS-L6YkVRDMgFiBdUcS_eyYugFfyIunJKsVgUQr1xhGhR', // please provide your client id here 
//   'client_secret': 'EMe1i5b3avQLmB6U6iczUu645-njDMq97H2geHyVMQS15X_WUjthv_6oSAV6ocqxQYOZTEWRZLlrG1QS' // provide your client secret here 
// });



// // start payment process 
// export const payNow = ( req , res ) => {
// 	// create payment object 
//     var payment = {
//             "intent": "authorize",
// 	"payer": {
// 		"payment_method": "paypal"
// 	},
// 	"redirect_urls": {
// 		"return_url": "http://127.0.0.1:3000/success",
// 		"cancel_url": "http://127.0.0.1:3000/err"
// 	},
// 	"transactions": [{
// 		"amount": {
// 			"total": 39.00,
// 			"currency": "USD"
// 		},
// 		"description": " a book on mean stack "
// 	}]
//     }

	
// 	// call the create Pay method 
//     createPay( payment ) 
//         .then( ( transaction ) => {
//             var id = transaction.id; 
//             var links = transaction.links;
//             var counter = links.length; 
//             while( counter -- ) {
//                 if ( links[counter].method == 'REDIRECT') {
// 					// redirect to paypal where user approves the transaction 
//                     return res.redirect( links[counter].href )
//                 }
//             }
//         })
//         .catch( ( err ) => { 
//             console.log( err ); 
//             res.redirect('/err');
//         });

//     }




// // helper functions 
// var createPay = ( payment ) => {
//     return new Promise( ( resolve , reject ) => {
//         paypal.payment.create( payment , function( err , payment ) {
//          if ( err ) {
//              reject(err); 
//          }
//         else {
//             resolve(payment); 
//         }
//         }); 
//     });
// }						
		