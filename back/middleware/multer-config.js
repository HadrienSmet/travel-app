const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        console.log("mddlware.multer l:14 originalname of file: " + file.originalname);
        console.log("mddlware.multer l:15 mimetype of file: " + file.mimetype);
        console.log("mddlware.multer l:16 corps de la requete: " + JSON.stringify(req.body));
        const name = file.originalname.split(' ').join("_");
        const extension = MIME_TYPES[file.mimetype];
        const nameWithoutExtension = name.split('.')[0];
        callback(null, nameWithoutExtension + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('file');