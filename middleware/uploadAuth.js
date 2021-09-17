const path = require('path');
const multer = require('multer');

const uploadAuth = (req, res, next) => {

    let storage = multer.diskStorage({

        destination: (req, file, cb) => cb(null, 'public/uploads/'),
        filename: (req, file, cb) => {

            uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    });

    let upload = multer({

        storage,
        limit: { fileSize: 1000000 * 5 }

    }).single('myImage');

    req.upload = upload;
    return next();

}

module.exports = uploadAuth;