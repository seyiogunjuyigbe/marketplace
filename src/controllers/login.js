export const loginControl = (req,res)=>{
    if( req.query.origin )
  req.session.returnTo = req.query.origin
else
  req.session.returnTo = req.header('Referer')

res.render('login')
}

export const loginPostControl = (req,res)=>{
    let returnTo = '/'
    if (req.session.returnTo) {
      returnTo = req.session.returnTo
      delete req.session.returnTo
    }
  
    res.redirect(returnTo);
}