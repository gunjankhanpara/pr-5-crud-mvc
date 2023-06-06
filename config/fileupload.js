const multer = require('multer');

const path = require('path');

const uploads = path.join('uploads');

//file upload start

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,uploads);
    },
    filename : (req,file,cb)=> {
        cb(null,file.originalname);
    }
})

const fileUpload = multer({storage : storage}).single('avatar');

module.exports = fileUpload
