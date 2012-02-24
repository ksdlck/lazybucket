(function(){
  var LazyBucket, dropsize, bucketsize, leakrate, bucket, dosomething;
  LazyBucket = require('../lib/lazybucket').LazyBucket;
  dropsize = 1;
  bucketsize = 10;
  leakrate = 1 / 100;
  bucket = new LazyBucket(bucketsize, leakrate);
  dosomething = function(){
    if (bucket.drop(dropsize)) {
      console.log('ok!');
      process.nextTick(dosomething);
    } else {
      console.log('wait!');
      setTimeout(dosomething, 90);
    }
  };
  dosomething();
}).call(this);
