(function(){
  var LazyBucket;
  exports.LazyBucket = LazyBucket = (function(){
    LazyBucket.displayName = 'LazyBucket';
    var prototype = LazyBucket.prototype, constructor = LazyBucket;
    function LazyBucket(size, rate){
      this.size = size;
      this.rate = rate;
      this.time = Date.now();
      this.level = 0;
    }
    prototype.drop = function(drop){
      var now;
      now = Date.now();
      this.level -= this.rate * (now - this.time);
      this.time = now;
      if (this.level < 0) {
        this.level = 0;
      }
      this.level += drop;
      if (this.level > this.size) {
        this.level -= drop;
        return false;
      }
      return true;
    };
    return LazyBucket;
  }());
}).call(this);
