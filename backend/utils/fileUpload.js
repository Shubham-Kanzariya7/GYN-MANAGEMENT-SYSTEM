import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, filename);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Only JPEG, JPG and PNG images are allowed')); 
}

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
