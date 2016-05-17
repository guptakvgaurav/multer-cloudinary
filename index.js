/**
 * Created by gaurav on 17/5/16.
 */

/**
 * A simple multer storage engine which stores the file directly to cloudinary.
 * */
function CloudinaryStorage (opts) {
  if(opts && opts.cloudinary && opts.cloudinary.cloudinary){
    this.cloudinary = opts.cloudinary.cloudinary;
  }else{
    throw new Error('Expected opts.cloudinary to be a configured cloudinary object.');
  }
  switch (typeof opts.s3StreamParams) {
    case 'function': this.getParams = opts.s3StreamParams; break;
    case 'undefined': this.getParams = undefined;break;
    default: throw new TypeError('Expected opts.key to be undefined or function')
  }
}

CloudinaryStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  var self = this;
  this.getDestination(req, file, function (err, path) {
    if (err) { return cb(err); }

    var cloudinaryStream = self.cloudinary.uploader.upload_stream(function(result) { cb(null, result)}, self.getParams());
    file.stream.pipe(cloudinaryStream);

  });
};

module.exports = function (opts) {
  opts = opts || {};
  if(!opts.cloudinary){
    throw new Error('Cloudinary object should be passed');
  }
  return new CloudinaryStorage(opts)
};
