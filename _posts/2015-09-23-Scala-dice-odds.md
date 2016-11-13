---
layout: post
title: Scala code to count the odds of throwing out the sum of 2 6-sided dices.
comments: true
tags: scala, snippet
author: wende
---

Today I wanted to give You a cool snippet showing the power of Scala's Collections.
This short and beautiful piece counts odds of throwing out a sum of 2 dices ( 6 - sided )

{% highlight scala %}
(1 to 6)
.flatMap{ a =>
    (1 to 6).map { a + _ }
}
.groupBy(identity)
.mapValues{ _.length }
.toList
.sortBy(-_._2)
{% endhighlight %}

The result is a list of tuples:

    List((7,6), (6,5), (8,5), (5,4), (9,4), (10,3), (4,3), (3,2), (11,2), (2,1), (12,1))

Where first number indicates the sum and the seconds number is the chance (x / 36)

If You want an in-depth explanation we'll do it step by step.
So let's break it down

### 1.

    (1 to 6)

Is a syntactic sugar for `Range(1,7)` which creates an inclusive sequence from 1 to 6

### 2.
`.flatMap` applies to every element of the list flattening the result

### 3.

    map { a + _ }

is a big syntactic sugar for

    map { b => a + b}

### 4.
Then We've got a `groupBy` method which with `identity` which is a shortcut for `a => a`
(it's not really shorter but it feels much more intuitive)

### 5.
Now we've got a `Map` of a `Vector`s (Arrays)  in which we iterate through values ( Array of the same values ).
Because all of the values are the same we can change the value just to a length of the `Array`.

### 6
And this is actually the exercise done. Now for the sake of clarification I sort the results by their chance from highest to  lowest.
To do that - because now we've got a map of `( sum -> chance )` - we change it to a list of tuples with `toList`
All we do then is sort by very cool syntactic sugar notation
`( -_._2 )` which is a shorter way of writing

    { a => return -a._2 }

And `_2` is a second value of tuple ( analogically `_1` is for first, `_3` for third etc)

And this is how You can solve complex statistics task in a fast and concise quasi one-liner.

Cheers
