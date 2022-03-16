const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontend/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.plant._id + '.png')
    }
})

const upload = multer({ storage: storage }).single('file');

const uploadImage = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(req.file);
    });
  };

module.exports = uploadImage;