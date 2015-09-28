---
layout: post
tags: elixir, algorithms
title: n prime numbers in Elixir
---

I've been asked by a friend to give her a naive implementation of a function giving n first prime numbers.
Because the language required was JavaScript I did some horribly ugly imperative function.

{% gist 0562a5f61128013ea9ed %}

As You can see it's almost impossible to decode it after writing.
But then I started wondering how would it look in Elixir.
So I implemented my first try. With prime number test and simple iterator function.

{% gist 1060a14b9e8680bbe73c %}

Not bad but still not dope.
Then I recalled there was a new thing going on around Elixir called Streams.

Stream is an implementation of an [possibly] endless enumerable.
So I gave it a try with it. This is the effect:

{% gist 51600fab1f7a1d1bfbd1  %}

Prime number in 2 still pretty readable lines of code. That's neat. Isn't it?


### /Edit Scala Bonus

{% highlight scala %}
def nPrime(n: Int){
   Stream.from(2)
   .filter{ a => Range(2,a).filter(a % _ == 0).isEmpty }
   .take(n).toList
}
{% endhighlight %}


### /Edit 28.09.2015
I recently wrote a Haskell alternative:

{% highlight haskell %}
let pgen (p:xs) = p : pgen [x|x <- xs, x `mod` p > 0]
let nPrime x = x `take` pgen [2..]
{% endhighlight %}

I think we might have a winner here ;)
