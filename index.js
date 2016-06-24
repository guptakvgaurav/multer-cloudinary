/**
 * Created by gaurav on 17/5/16.
 */

/**
 * A simple storage engine
 * */
function CloudinaryStorage (opts) {
  if(opts && opts.cloudinary && opts.cloudinary.cloudinary){
    this.cloudinary = opts.cloudinary.cloudinary;
  }else{
    throw new Error('Expected opts.cloudinary to be a configured cloudinary object.');
  }
  var paramTemplate = {
    remove: null,
    upload: null
  }
  switch (typeof opts.params) {
    case 'function': this.getParams = opts.params; break;
    case 'undefined': this.getParams = function () {return paramTemplate;};break;
    default: throw new TypeError('Expected opts.key to be undefined or function')
  }
}

CloudinaryStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  var cloudinaryStream = this.cloudinary.uploader.upload_stream(function(result) {
      if(!result || result.error){
        return cb(result.error.message);
      }
      cb(null, result)
    } , this.getParams().upload);
  file.stream.pipe(cloudinaryStream);
};

CloudinaryStorage.prototype._removeFile = function _removeFile (req, file, cb) {

  this.cloudinary.v2.uploader.destroy(file.public_id, this.getParams().remove, function (err, result) {
    if(err){
      return cb(err);
    }
    return cb(result);
  });
}

module.exports = function (opts) {
  opts = opts || {};
  if(!opts.cloudinary){
    throw new Error('Cloudinary object should be passed');
  }
  return new CloudinaryStorage(opts)
};
