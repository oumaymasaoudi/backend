// uploads/upload.js
const multer = require("multer");
const path = require("path");

const FILE_TYPES = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;

const fileFilter = (req, file, cb) => {
  const extname = FILE_TYPES.test(path.extname(file.originalname).toLowerCase());
  const mimetype = FILE_TYPES.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers image ou vidéo sont autorisés"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});


const upload = multer({ storage, fileFilter });

module.exports = upload;
