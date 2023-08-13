export async function postMulterDocuments(req,res,next){
    try {

        const archivos = req.files

        res.json({message:"archivo cargado"})

            } catch (error) {
                
                    req.logger.error(error.message)
                    next(error)
                }
}