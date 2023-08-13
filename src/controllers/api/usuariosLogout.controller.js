export async function deleteSesiones(req, res, next) {
    try {
      req.user.last_connection=new Date().toLocaleString()
      req.session.destroy(err => {
        res.sendStatus(200)
      })
    } catch (error) {
      req.logger.error(error.message)
      next(error)
    }
  }