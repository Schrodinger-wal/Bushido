const multer = require('multer');
const fs = require ('fs');
const {v4: uuidv4} = require('uuid');
const { google } = require('googleapis');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload/product')
    },
    filename: (req, file, callback) => {
        const fileExt = file.originalname.split('.').at(-1)
        const fileName = `${uuidv4()}.${fileExt}`
        req.body.image = fileName
        callback(null, fileName)

                // Eliminar la parte "C:\fakepath\" de la URL generada
                const cleanImageUrl = req.body.image.replace("C:\\fakepath\\", "");
    }
})

const uploadMulter = multer ({
    storage,
    limits: {fileSize: 1024 * 1024 * 20},
    fileFilter: (req, file, callback) => {
        file.mimetype.split('/')[0] === 'image' ? callback (null, true) : callback(null, false)
    }
})

const uploadProduct= uploadMulter.single('image');

uploadProduct.cleanImageURL = (req, res, next) => {
    if (req.body.image) {
        req.body.image = req.body.image.replace("C:\\fakepath\\", "");
    }
    next();
}

module.exports = {
    uploadProduct
}





