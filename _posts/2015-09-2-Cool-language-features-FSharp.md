---
layout: post
title: Cool language features You've never heard about - Part 4 - F#'s Type Providers
comments: true
tags: fsharp, cool, languages
author: wende
---

For the next few weeks I'm gonna list cool features and tips for every programming language You can imagine.
From most popular like Java or Python, through new emerging flagship killers - Scala, Go, Rust - and these
which were designed years ago but still fulfill their niche f.i Lisp, Erlang or Prolog. 

## F\#

If You've ever programmed in a **static-typed language** You probably know that any type-system has it's boundaries.
There is a lot of situations where hard typing is a blessing, but there always are exceptions when it starts to become
a preposterous curse.
Throughout the years many [F]sharp ( ;) ) minds were doing they're best to make programming easier without losing the **type safety**.

You can imagine the struggle when a type was completely strict and nothing else but the datatype it represented.

First approach was [type union](https://en.wikipedia.org/wiki/Union_type) introduced by [COBOL](https://pl.wikipedia.org/wiki/COBOL), however it doesn't really make the case any better, type unions make the type definition more broad and by that it sacrifices the type safety, which is a purpose of static-typing in a first place. 

The first step forward was the invention of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)). It was first named like that in 1985 yet it was successfully implemented about 20 years earlier in [Simula programming language](https://en.wikipedia.org/wiki/Simula).

**Polymorphism is a concept where a type can be also represented by it's superset** - integer can represented as a number, so can be the float, but we are allowed to make use of only the parts that are shared by both.

The next huge revolution were [generic types - aka type variables](https://en.wikipedia.org/wiki/Generic_programming). First introduced in [ML](https://en.wikipedia.org/wiki/ML_(programming_language)) it finally made available to write fragments of code in which it wasn't particularly important to know the exact type.
Parallely to that **Damas, Hindley and Milner** introduced their [type inference](https://en.wikipedia.org/wiki/Type_inference) algorithm which finally made type programming twice less verbose. It allowed the compiler to guess the type by the way the variable was used inside the code.

![Hindley-Milner Type Inference rules](http://i.stack.imgur.com/hZhjl.png){: .center-image }

<sub> Type inference rules by Hindley-Milner. <br> Also one of the favorite t-shirt pattern for functional programmers, because 99.999% of the population doesn't understand a thing from this </sub>

Type inference despite being proven and implemented in '70s is still not that widely used by static-typed languages.

- Java doesn't have it at all
- C# has it, but it's way more crude
- Scala uses type inference but it works only backwards.

Finally the languages that successfully implemented type inference are:  
**OCaml, ML, F#, Haskell, Idris, Elm**, and not that many more. But that'd be far from true to call any of these languages popular.


### Type Providers

But what does it have to do with **F#**?

The thing is there are situations where the type cannot be inferred. For instance when extracting the data from outside source, like XML, Atom or JSON.
In situations like that You either have to make precautions for failure or try to cast everything by hand, which in most cases is a horrible work to do.
F#'s creators found another solution to this problem.
Type provider is a **metaprogramming** feature, which creates a type based on the example data it is given during compile time.
For example when we want to receive a JSON data regarding our bank user.

{% highlight FSharp %}
type BankData = JsonProvider<""" {"name": "John", "accounts": [{ "number": 1234, "balance": 10.20}]}""">
let mark = BankData.parse(""" {"name": "Mark", "accounts": [{ "number": 1235, "balance": 220.20}]}""")
mark.name        //=> "Mark" :: String
mark.accounts    //=> [{###}] :: List
[account1|rest] =  mark.accounts
account1.balance //=> 220.20 :: Float
{% endhighlight %}

This way we can get the type safety during the development by just providing the exemplar input.

How cool is that!
