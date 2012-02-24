Lazy Bucket
==========
A scalable rate-limiting algorithm
----------------------------------

SYNOPSIS
--------

Lazy Bucket is a variant of the [Leaky Bucket](https://en.wikipedia.org/wiki/Leaky_bucket) algorithm developed by Karel Sedlacek.
Lazy Bucket leaks lazily, based on timestamp differencing, allowing it scale work with the number of requests only, where Leaky Bucket also scales with the number of buckets.

Coco:

    {LazyBucket} = require \../lib/lazybucket

    dropsize = 1     # operations are 1 drop unit
    bucketsize = 10  # maximum burst of 10 drop units
    leakrate = 1/100 # maximum sustained rate of 10 drop units per second

    bucket = new LazyBucket bucketsize, leakrate

    dosomething = !->
      if bucket.drop dropsize
        console.log \ok!
        process.nextTick dosomething
      else
        console.log \wait!
        setTimeout dosomething, 90
    dosomething ()

Javascript:

    var LazyBucket = require('../lib/lazybucket').LazyBucket;

    var dropsize, bucketsize, leakrate;
    dropsize = 1;
    bucketsize = 10;
    leakrate = 1 / 100;

    var bucket = new LazyBucket(bucketsize, leakrate);

    var dosomething = function(){
      if (bucket.drop(dropsize)) {
        console.log('ok!');
        process.nextTick(dosomething);
      } else {
        console.log('wait!');
        setTimeout(dosomething, 90);
      }
    };
    dosomething();

LICENSE
-------

Copyright (c) 2012 Karel Sedláček <k@ksdlck.com> (http://ksdlck.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
