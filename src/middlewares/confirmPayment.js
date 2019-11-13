import { createPay } from "../helpers/createPay";
import {PAYPAL_MODE, PAYPAL_SECRET, PAYPAL_CLIENT_ID, DOMAIN_NAME} from "../config/constants"
const Service = require("../models/service");
const paypal = require("paypal-rest-sdk");
const User = require("../models/user");
const Purchase = require("../models/purchase")


export const confirmPay =()=>{

}