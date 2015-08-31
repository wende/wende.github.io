---
layout: post
title: Cool language features You've never heard about - Part 2 - Erlang's Pattern Matching
comments: true
tags: Erlang, Cool
---

For the next few weeks I'm gonna list cool features and tips for every programming language You can imagine.
From most popular like Java or Python, through new emerging flagship killers - Scala, Go, Rust - and these
which were designed years ago but still fullfil their niche f.i Lisp, Erlang or Prolog. 

## Erlang

Erlang is (un)widely known from it's easiness to build distributed systems.
A system written in Erlang can run great despite being deployed on one or hundred machines.
But even though it's amazing in it's particular niche it also has unique syntax solutions that
make it nice to develop in

### Pattern matching
Some of You might be familiar with, pattern matching, some of You can't imagine programming without it, but most of imperative programmers aren't so familiar with the concept at all.
Pattern matching is a conditional assignment. What does it mean?
That means that an assignment fails if the arguments don't meed the requirement.
A simples possible pattern matching exmple is an overloaded function.

{% highlight Java %}
public void nameType(String a){
    return "String"
}
public void nameType(int a){
    return "Integer"
}
{% endhighlight %}

Although the `nameType()` function has the same name twice when we call `nameType(1)` we execute totally different function
than if we typed `nameType("1")`. This is pattern matching in it's most primitive form.

Now if You don't know yet Erlang is a functional language which basically means it embraces lack of side-effects
(changes in global state). Because of that variables in Erlang are 'single-assignment variables' (Something like `final vars` in Java, `vals` in Scala or `readonly` in C#). And also in Erlang every assignment is also a pattern-matching.

{% highlight erlang %}
1> X = 10.
10
2> X = 10.
10
3> X = 11.
** exception error: no match of right hand side value 11
{% endhighlight %}

But we can also use that with destructuring asigment.

{% highlight erlang %}
1> {X, Y, [1,2,3,D]} = {10,20,[1,2,3,4]}.
{10,20,[1,2,3,4]}
2> X.
10
3> Y.
20
4> D.
4
{% endhighlight %}

Or function definition

{% highlight erlang %}
dimension({X,Y,Z}) -> "is 3D".
dimension({X,Y}) -> "is 2D".
dimension({X}) -> "is 1D".
dimension(_) -> "Tha hell'd you give me?".

1> dimesnsion({1,2})
"Is 2D"
{% endhighlight %}

Now imagine we want to write a simple program that checks if X and Y coords of a point are equal.
Take a simple Java example

{% highlight Java %}

class Point {
    public int x;
    public int y;

    public Point(x, y){
        this.x = x;
        this.y = y;
    }

    public String isXYEven(){
        if(this.x == this.y) return "Yes  they are!"
        else return "No, they're not!"
    }
}
    
// Usecase
new Point(1,1).isXYEven()  // Yes they are
new Point(1,3).isXYEven()  // No they're not

{% endhighlight %}
Not quite what we want. Simple concept of implementing point and comparing X and Y took us 14 lines of code.

Now let's see Erlang equivalent

{% highlight erlang %}
module(point).

is_x_y_equal({X,X}) -> "Yes they are!"
is_x_y_equal({X,Y}) -> "No they're not!"

% Usecase
point:is_x_y_equal({1,1}) // "Yes they are"
point:is_x_y_equal({1,1}) // "No they're not"

{% endhighlight %}

That's a little bit better, isn't it?

### Bonus

Erlang can also pattern match on Lists with `[Head|Tail]` behaviour.
Imagine we want to check if the nunber contains digits in pairs (11223355, 1122, 88 ; but not 123, 112 or 556612)

As always let's start with Java
{% highlight java %}

boolean onlyPairs(long number){
    boolean result = true;
    String s = number.toString()
    // odd list cannot be in pairs 
    if(s.length() % 2 != 0) return false
    for(int i = 0; i <= s.length; i+=2){
        result = result && (s[i] == s[i + 1])
    }
    return result;
}
{% endhighlight %}

It's not that long, but definitelly not easy to reason about.
Now let's try Erlang equivalent

{% highlight erlang %}
only_pairs(A) when is_integer(A) -> only_pairs(integer_to_list(A));
only_pairs(A) when length(A) mod 2 != 0 -> false;
only_pairs([]) -> true;
only_pairs([A, A | R]) -> true && only_pairs(R);
only_pairs(_) -> false.
{% endhighlight %}

Imperative version is probably understandable for programming folks so I will just describe the functional one.

We've made the whole solution using 5 simple statements

1. If A is an integer, cast it to a string (lists and strings are the same in Erlang) and execute the function as it were a string in the first place.
2. If A hasn't got even length we know the statement is false.
3. If parameter is empty list the statement is true
4. If first and second elements are the same return true AND result of the same logic on the rest of the list
5. If none of the above applies, the statement is false

You may argue which solution is better in different dimensions. But in my opinion Erlang version is much easier to undesrstand.
