# multer-cloudinary
A simple storage engine which stores the files directly on cloudinary

    var multerCloudinary = require('multer-cloudinary');
    var Cloudinary = require('cloudinary');
    Cloudinary.config({
      {
        cloud_name: '-----',
        api_key: '------',
        api_secret: '-----',
      }
    });
    var cloudinaryStorage = multerCloudinary({cloudinary: Cloudinary});

    var cloudinaryUpload = multer({storage: cloudinaryStorage});
    // It will upload a file which is received in form-data from the client. Key for the file is 'photo1'. 
    router.put('/me', cloudinaryUpload.fields([{name: 'cover', maxCount:1}]));
    // If you want to upload more than one file from form data, then add the 
    router.put('/me', cloudinaryUpload.fields([{name: 'photo1', maxCount:1},{name: 'photo2', maxCount:1}]));

