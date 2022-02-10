const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]; 
    if(!token) {
        res.json({odpowiedz: 'nie rozpoznano tokenu'})
    }
    else {
        const zdekodowanyToken = jwt.verify(token,'klucz_tokena');
        req.userData = {userId: zdekodowanyToken.userId}
        next();
    }   
}