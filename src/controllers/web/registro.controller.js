export function registroView (req,res,next){
    try {
        res.render('register', {pageTitle:'registro'})
    } catch (error) {
        next(error)
    }
    }