1) Here I have used Order_details table also. Though this could have been accomplished without that, but with order_details table it will help us in running query in much better way.


2) RACE CONDITION

There can be multiple ways to handle race condition like using a redis lock or via a fifo queue. Here I'll discuss how we can do it using redis lock:

As soon as the order comes we will check whether that product along with its count exists in redis or not if not then we will first create a lock on that key(here key is the product id) and then we will get the quantity availbale for that product from database and update it in redis and then release the lock. Until, if any other req tries to acquire a lock (as it will happen in race condition), it will get the response as zero(failure condition) and we will keep retrying until wee get a success response. This way race condition can ben handelled
