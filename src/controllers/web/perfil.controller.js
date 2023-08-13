export function profileView(req,res,next){
  try {
    if(req.user.email=="adminCoder@coder.com"){
      req.user.rol=="Admin"
    }
    res.render('profile', {
          // pageTitle: 'Perfil', user: JSON.stringify(req.session['user'])
          
          pageTitle: 'Perfil', user: req['user']
      })
  } catch (error) {
    next(error)
  }
}
