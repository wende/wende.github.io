---
layout: post
title: Cool language features You've never heard about - Part 1 - Scala
comments: true

---

For the next few weeks I'm gonna list cool features and tips for every programming language You can imagine.
From most popular like Java or Python, through new emerging flagship killers - Scala, Go, Rust - and these
which were designed years ago but still fullfil their niche f.i Lisp, Erlang or Prolog. 

## Scala

Scala has absolutely wicked collections API. Almost any List/Set/Array operation can be made without wondering about implementation details.

There has been a problem to solve for Java program on Quora once:

> How can I write a program on Java that outputs the most common digit in an integer?

Imagine Java code that would solve that. We'd have to loop through all characters of String representation, make a Map with values and their count... You can imagine how much time It'd take.

Now how would we solve that with Scala Collection Api?

{% highlight Scala%}
112123123
.toString.toList
.groupBy{ identity }
.mapValues { _.length }
.toList.maxBy { _._2 }
{%endhighlight%}

And that's all.
First we convert to String, then to list of Chars. Then we group by identity ({a => a}) to List of digits (List(1,1,1,1), List(2,2,2) and so on). Then we squash that to values the lists hold. At the end we cast that to list, and we find the maximum value by tuple's second field.

And we're left with the result:

> (Char, Int) = (1,4)

Where 1 is the most common digit, and 4 is the quantity.

Scala FTW!
