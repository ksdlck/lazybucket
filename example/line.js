(function(){
  var EventEmitter, LazyBucket, Grating, dropsize, bucketsize, leakrate, grating, bucket;
  EventEmitter = require('events').EventEmitter;
  LazyBucket = require('../lib/lazybucket').LazyBucket;
  Grating = (function(superclass){
    Grating.displayName = 'Grating';
    var prototype = __extend(Grating, superclass).prototype, constructor = Grating;
    function Grating(stream){
      this.stream = stream;
      this.buf = "";
      this.stream.on('data', __bind(this, 'data'));
    }
    prototype.data = function(data){
      var pcs;
      this.buf += data;
      pcs = this.buf.split('\n');
      if (pcs.length === 2) {
        this.emit('line', pcs[0]);
        this.buf = pcs[1];
      }
    };
    return Grating;
  }(EventEmitter));
  dropsize = 1;
  bucketsize = 10;
  leakrate = 1 / 500;
  grating = new Grating(process.openStdin());
  bucket = new LazyBucket(bucketsize, leakrate);
  grating.on('line', function(){
    if (bucket.drop(dropsize)) {
      console.log('ok!');
    } else {
      console.log('wait!');
    }
  });
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function __bind(obj, key){
    return function(){ return obj[key].apply(obj, arguments) };
  }
}).call(this);
