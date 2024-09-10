const authorize = (req, res, next) => {
    const { user } = req.query
    if(user === 'dina'){
        req.user =  { name: "dina", id: 9}
        next()
    }
    else {
        res.status(401).send("Not authorized!!")
    }
}
module.exports = authorize