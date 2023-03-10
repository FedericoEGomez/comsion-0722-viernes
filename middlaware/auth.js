module.exports = (req, res, next) =>{
    if (!req.session.persona) {
        return res.json({msg: 'no estas en session'})
    } else {
        next();
    }
}