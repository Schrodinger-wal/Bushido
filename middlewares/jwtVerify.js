const jwt = require ('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { responseCreator } = require('../utils/utils');

async function jwtVerify(req,res,next){
    try {

        const token = req.headers.authorization;

        if (!token) {
            return responseCreator(res, 401, 'No se proporcionó un token');
        }
        
        const payload = jwt.verify(token,secret)

        req.user = payload;

        next();

    } catch (error) {
        return responseCreator(res,401,'Error al Ingresar, token no valido')
    }

};

module.exports = jwtVerify