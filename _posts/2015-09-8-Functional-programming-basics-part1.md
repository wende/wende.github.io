---
layout: post
title: Functional programming basics on Elixir's example - Part 1
tags: functional, elixir, tutorial, basics
---

 I get asked more than often why functional programming is something worth knowing. Some people are curious, some would like to burn me at the stake, some just never heard about it and are still passionate to grasp concept they didn't yet get to know.
 In this post I'll try to describe what is functional programming, what's it's history, present and future, why You really should start to learn it, and how it really works in practice.

### Why bother with functional programming?
To start with, I've got to emphasize: Functional programming is not anything new. The first language that could be named functional ([Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus)) is as old as 80 years old (Yes. It's from 1935). But now it's getting it's new life thanks to emerging era of cloud computing.

#### So why didn't I hear about it before?
Functional languages never practically went mainstream. They always were a bizarre way of coding that weren't as easy to understand as series of steps in imperative programming.
What's more most of imperative languages have a huge marketing backup by a company or a product like:
- Java - Sun then Oracle
- C# - Microsoft
- C - Linux
and so on.

#### So why should I start caring now?
I hear many times people saying that they don't need functional programming. They feel safe in Java, C# or Python.
But they don't really realize that these languages slowly adapt ideas from functional languages that were present in
functional world for more than 30 years. They do it because they make problem solving easier and embrace not reinventing of the wheel.
Here are some functional concepts You might have bumped on before.

- [Lambda expressions](https://en.wikipedia.org/wiki/Anonymous_function) - C# 3.0, Java 8, JavaScript, Ruby, Python, C++11
- [Symbols/Atoms](https://en.wikipedia.org/wiki/Symbol_(programming)) - Ruby, Objective-C, ES6
- [List comprehensions](https://en.wikipedia.org/wiki/List_comprehension) - Python, C#, JavaScript 1.7, Perl
- [Tail recursion](https://en.wikipedia.org/wiki/Tail_call) - ES 6, Lua, Python
- [Higher order functions](https://en.wikipedia.org/wiki/Higher-order_function)( map, fold, reduce) - JavaScript, Ruby, Python, Perl, Matlab
And probably many, many more.
You might wait till Your language finally implement rest of the ideas, or You could learn a functional language Yourself.

### But why did it now start to matter?
Formerly the only significant difference between a functional and an imperative programmer was just one. Functional programmer accomplished his task faster.
That was a trade-off which wasn't really profitable for corporations. Maybe functional programmer was 5 times faster, but there was 50 times less functional programmers to hire, which big companies couldn't really afford.
But now we're in the middle of the era when computational power started to change it's meaning. We no longer double processor's power every two years as [Gordon E. Moore was predicting](https://en.wikipedia.org/wiki/Moore%27s_law). Now we add more processors and more machines.
And that means we need to learn a new way of handling these processors.
Surprisingly it appears that the solution wasn't that new. It's good old functional programming. And there is a single reason to that: When programming multi-threaded systems there is a problem with simultaneous access to the state.
But when there is no state - there is no problem.
That's why functional programming started to shine again.

### What languages are functional?

Now what are some cool languages You could think about getting to know:

- [Haskell](https://en.wikipedia.org/wiki/Haskell_(programming_language)) (Static) - absolute king of functional languages. Fully* pure and absolutely ingenious
- [OCaml](https://en.wikipedia.org/wiki/OCaml) (Static) - Haskell's non-lazy brother with object oriented concepts.
- [Scala](https://en.wikipedia.org/wiki/Scala_(programming_language)) (Static) - Runs on JVM, Interops with Java, Although not strictly functional it takes a lot of functional world. It's a "Java meets functional" language
- [Clojure](https://en.wikipedia.org/wiki/Clojure) (Dynamic) - An almighty Lisp descendant. Runs on JVM and shares all Lisp's great features (Macros rule!)
- [Erlang](https://en.wikipedia.org/wiki/Erlang_(programming_language)) (Dynamic) - A language to control a beast called BEAM virtual machine, which is made with distributed never stopping systems in mind. Prolog syntax
- [Elixir](https://en.wikipedia.org/wiki/Elixir_(programming_language)) (Dynamic) - Erlang's machine, Lisp's macros, Ruby's syntax and tooling
- [Elm](https://en.wikipedia.org/wiki/Elm_(programming_language)) - Haskell inspired web programming language. Great for learning functional thinking with web development.
- [F#](https://en.wikipedia.org/wiki/F_Sharp_(programming_language))(Static) - Microsoft's child from 2005, which at the beginning didn't get any interest, but now is getting it's new life

### But what is that functional programming after all?
There are quite few rules that characterize functional programming:

- Function is a first class building block.
- Single responsibility for single function
- Avoid side effects (changes of state) by any mean
- Variables don't vary

That might not seem as a big change but it really is.
Lack of side-effects drastically changes the way we reason about our program.
There are no loops as You know them, no global variables.
But all the magic is in a paradoxical phenomenon, that although we can do less, we might achieve much more.

Although examples showed in this tutorial will be in Elixir, almost every concept has a simple equivalent in one of the above languages.

### Tuples

The first and probably the simplest construct in functional programming is a tuple.
Tuples are like objects in JavaScript, but their properties aren't named.
They're like in Math a representation of an ordered list.

JavaScript point: `{x: 10, y: 200}`
Functional point: `{10, 200}`

JavaScript person: `{name: "Jack", age: 20, gender: "male"}`
Functional person: `{"Jack", 20, "male"}`

It has nothing to do with the programming itself, it's just an old convention which is still being continued.

### Pattern matching
The main friend of the functional programmer is the pattern matching. What is it?
It's a destructuring assignment which allows You to assign many variables to values based on a pattern.
You'll understand with an example.

Here we've got a simple assignment
{% highlight elixir %}
a = [1,2, "Hello there"]
{% endhighlight %}
But what if we wanted to get each value of the list into separate variables
{% highlight elixir %}
[a, b, hello] = [1,2, "Hello there"]
# a = 1
# b = 2
# hello = "Hello there"
{% endhighlight %}
That's easy isn't it?

But what if we wanted to go further, and we had a list with tuples in it
{% highlight elixir %}
list_of_points = [{1,2}, {2,2}, {3,4}]
[a, b, {c_x, c_y}] = list_of_points
# a = {1,2}
# b = {2,2}
# c_x = 3
# c_y = 4
{% endhighlight %}
But what if we wanted to extract only some variables leaving the others.
In Elixir (derived from Erlang) there is a syntactic sugar for an unwanted variable.
We note it as an `_` (underscore). For example if we wanted to get just the first variable of a list
{% highlight elixir %}
[a, _, _] = [1,2,3]
# a = 1
{% endhighlight %}
But that way, if our list was 10 elements long, or even unknown length we would have to write a lot of underscores.
That's why there is incredibly useful **tail notation**: `[ head | tail]`
{% highlight elixir %}
[ a | tail ]  = [1,2,3,4]
# a = 1
# tail = [2,3,4]
{% endhighlight%}
Or we could also take two first elements

{% highlight elixir %}
[ a, b | t ]  = [1,2,3,4]
# a = 1
# b = 2
# t = [3,4]
{% endhighlight%}

Why is it useful? You'll understand that when You'll feel a need to use a recursion.

Let's make a simple functional/imperative comparison of a function summing up all list elements.
For imperative examples we will use JavaScript. It's supposed to be multi-paradigm,
but we can write imperative code in it and it's probably the widest understandable language we could find.

<table><tr><td style="padding:0 0; border: none; ">
Elixir
{% highlight elixir %}
#
def main() do
  list = [1,2,3,4,5,6]
  sum_list(list)
end
def sum_list(list) do
  if(length(list) == 0) do
    0
  else
    [head | tail] = list
    head + sum_list(tail)
  end
end
#
{% endhighlight %}
</td><td style="padding:0 0; border: none ;">
JavaScript
{% highlight js %}
//
function main(){
  var list = [1,2,3,4,5,6]
  sumList(list)
}
function sumList(list){
  var sum = 0
  for(var i = 0; i < list.length; i++){
    sum += list[i]
  }
  return sum
}

//
{% endhighlight %}
</td></tr></table>
What we've done is we take a list as an argument. If it's empty we return zero, if it has more than one element we take the first element and add it to the sum of elements of the rest.
If You didn't do many recursions in Your life it might seem quite counter-intuitive. But don't worry, You'll get used to it.
Let's examine what does happen to our list when we call `sum_list([1,2,3,4])`
{% highlight elixir %}
sum_list([1,2,3,4])          ->
1 + sum_list([2,3,4])        ->
1 + 2 + sum_list([3,4])      ->
1 + 2 + 3 + sum_list([4])    ->
1 + 2 + 3 + 4 + sum_list([]) ->
1 + 2 + 3 + 4 + 0 ->
10
{% endhighlight %}


But to be completely honest with You, the code we just wrote is a bullcrap.
Let's make it better.

### Pattern matching and overloaded functions

Pattern matching has another neat functionality. It can fail.

{% highlight elixir linenos %}
iex(1)> [a, 1, 2] = [1,2,3]
** (MatchError) no match of right hand side value: [1, 2, 3]
{% endhighlight%}

The good thing about it is that we can use it in an overloaded function.
For instance

{% highlight elixir %}
def describe_list([1,2,3]), do: "Yay. A perfect one two three list"
def describe_list(anything_else), do: "Boo, It's not it"
{% endhighlight%}
Now if we called `describe_list([1,2,3])` we would get:
"Yay. A perfect one two three list".
But with any other argument passed we'd get:
"Boo, It's not it"

Let's try another dummy example

{% highlight elixir %}
def word(0), do: "zero"
def word(1), do: "one"
def word(2), do: "two"
def word(3), do: "three"
def word(4), do: "four"
def word(5), do: "five"
def word(_), do: "Not 1-5"
{% endhighlight %}

Yay! That's amazingly useless!
But it presents an amazingly powerful concept. Now we can try to modernize our previous snippet.

<table><tr><td style="padding:0 0; border:none;">
Elixir
{% highlight elixir %}
#
def sum_list([]), do: 0
def sum_list([head | tail]) do
   head + sum_list(tail)
end



#
{% endhighlight %}
</td><td style="padding:0 0; border: none;">
JavaScript
{% highlight js %}
//
function sumList(list){
  var sum = 0
  for(var i = 0; i < list.length; i++){
    sum += list[i]
  }
  return sum
}
//
{% endhighlight %}
</td></tr></table>

Well now that's significantly better isn't it?


In the next part we will learn how to write some fully usable program.


<!-- Compare table -->
{% comment %}
Comparison
<table><tr><td style="padding:0 0; border: none ;">
{% highlight js %}
s
{% endhighlight %}
</td><td style="padding:0 0; border: none ;">
{% highlight js %}
s
{% endhighlight %}
</td></tr></table>
{% endcomment %}
