const Service = require("../models/service");

export const searchItem = (req,res)=>{
    const query = String(req.query.search);
    Service.find({}, (err,services)=>{
        if(!err){
            services.forEach((service)=>{
                const objs = Object.values(service)
                objs.forEach((obj)=>{
                    if(typeof(obj)== 'string' && obj.indexOf(query)!==-1){
                        console.log(service)
                    }
                })
            })
        }
    })
}