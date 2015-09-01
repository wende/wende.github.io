---
layout: post
title: Cool language features You've never heard about - Part 3 - Elixir's Macros
comments: true
tags: elixir, cool, languages

---

For the next few weeks I'm gonna list cool features and tips for every programming language You can imagine.
From most popular like Java or Python, through new emerging flagship killers - Scala, Go, Rust - and these
which were designed years ago but still fullfil their niche f.i Lisp, Erlang or Prolog. 

## Elixir

[Elixir language](http://elixir-lang.org/) is a newborn child of [Jose Valim](https://github.com/josevalim) and Ruby community. It's a Ruby dialect for interacting with Erlang virtual machine.
Though it's new and still emerging language it's already production ready thanks to it's mature Erlang VM environment.
Jose and co-creators done their best to implement all of the coolest features from world's languages, and one of the most impressive in my opinion is Elixir's macro system.

A [Macro](https://en.wikipedia.org/wiki/Macro_(computer_science)) in programming is a code that is run during compile time of an application which takes a block of code in form of an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) as a parameter, and returns modified AST as a result, which is inserted in the place of a macro in code. 

Macros has been widely known in Lisp-like languages - [Lisp itself](https://en.wikipedia.org/wiki/Lisp_(programming_language)), [Clojure](https://en.wikipedia.org/wiki/Clojure) and dependant. But these languages share one common trait. Their code is already an AST. Which means they don't require any further parsing in order to be passed to the compiler.

{% highlight Lisp %}
(defun factorial (n &optional (acc 1))
(if (<= n 1)
acc
   (factorial (- n 1) (* acc n))))
{% endhighlight %}
<sub> Lisp naive factorial implementation </sub>

That means the code is the data strucutre itself.

Elixir however uses regular syntax, nonetheless they made metaprogramming easy to grasp and very usable.

But what is a purpose of metaprogramming?
Imagine a situation in which You'd like to have verbose output of Your application but only in debugging environment.
You could make a function that checks if it's debugging right now and if yes it'd print the statement.

{% highlight elixir %}
def log(obj) do
    if Mix.env() == :dev do
        IO.inspect(obj)
    end
end
{% endhighlight %}

But this way we'd have to check and compare enviroment state every time we'd like to print something. Which might be not so significant performance loss, but it is. That's why we can use a Macro in here

{% highlight elixir %}
defmacro log(obj) do
    if Mix.env() == :dev do
     quote, do: IO.inspect(obj)
   else
     quote, do: 0
   end
end
{% endhighlight %}

That way our `log` macro will look like that in dev environment:

{% highlight elixir %}
def main() do
   a = 2 * 2
   b = a + 1
   log("a is equal #{a}")
   log("b is equal #{b}")
end
{% endhighlight %}

And like this in production environment:

{% highlight elixir %}
def main() do
   a = 2 * 2
   b = a + 1
   0
   0
end
{% endhighlight %}

Thanks to macros You can implement infinite number of cool features to the language, which won't affect Your runtime performance.

## Pipe operator

One of the mindbogglingly great features implemented using macros is the pipe operator (Probably inspired by [F#](https://pl.wikipedia.org/wiki/F_Sharp))
Pipe operator does something similar to Linux's pipe. It executes the function and passes the result to the next function as a first argument.

Imagine we've had a list. We want, to double each element of that, filter to only these that are divided by 3 and then sum up all of them.

Using naive Elixir we could do that

{% highlight elixir %}
list = [1,2,3,4,5,6,7,8,9,10]
Enum.reduce(Enum.filter(Enum.map(list, fn a -> a*2 end), fn a -> rem(a, 3) == 0 end), fn a,b -> a + b end)
{% endhighlight %}
But that's just horrible! We can write it once, but someone from outside would have to spend nice couple of minutes to analyze what it does.

The second approach would be with temporary variables

{% highlight elixir %}
list = [1,2,3,4,5,6,7,8,9,10]
list = Enum.map(list, fn a -> a*2 end)
list = Enum.filter(list, fn a -> rem(a, 3) == 0 end)
Enum.reduce(list, fn a,b -> a + b end)
{% endhighlight %}
Much better, but still that way it becomes horribly redundant.
Fortunatelly Elixir gives an ability to pass a result of the function to the next function as a first argument
using pipe operators.
That way our code will look like:

{% highlight elixir %}
[1,2,3,4,5,6,7,8,9,10]
|> Enum.map(fn a -> a*2 end)
|> Enum.filter(fn a -> rem(a, 3) == 0 end)
|> Enum.reduce(fn a,b -> a + b end)
{% endhighlight %}

Now that way we've got both easy to read and relatively short solution.

And that's all thanks to macros!


In the next part I'll write about F#'s Type Providers. Stay tuned.
