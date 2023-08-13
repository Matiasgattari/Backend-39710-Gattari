export async function getMulterDocuments(req,res,next){
    try {
      res.render("archivoMulter",{
        user:req.user._id
      })

            } catch (error) {
                
                    req.logger.error(error.message)
                    next(error)
                }
}