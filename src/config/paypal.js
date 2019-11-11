import {PAYPAL_MODE, PAYPAL_SECRET, PAYPAL_CLIENT_ID} from "./constants"

// module.exports = () 
paypal.configure({
    'mode': PAYPAL_MODE, 
    'client_id': PAYPAL_CLIENT_ID,
    'client_secret': PAYPAL_SECRET
  });