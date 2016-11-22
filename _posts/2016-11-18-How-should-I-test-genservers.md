---
layout: post
title: The way I should have been testing genservers...
tags: functional, elixir, otp
author: hajto
---

Last Wednesday I went to Elixir Meetup in Cracow's headquarters of Erlang Solutions. It was supposed to be about basics of Elixir and how pipe operator influenced the software design, but I learned another priceless lesson. I've been testing GenServers callbacks wrong whole time...


I was usally doing it by spawning a process in setup the same way I would do in the supervision tree. Don't get me wrong it's totally cool for integration tests.


{% highlight Elixir %}
  setup do
    {:ok, instance } = RandomModule.start_link
    {:ok, thing: instance}
  end

  test "spawns buckets", %{thing: process} do
    assert Module.do_stuff(process, args) == something
    #Do any other black test magick
  end
{% endhighlight %}

The only thing we're doing here is testing input and output of callback basically. What if we could just test the callback itself? But wait... We can!

Let's assume we have `Stuff` module defined like so.
{% highlight Elixir %}

defmodule Stuff do
#stuff

defmodule State do
  defstruct data: [], name: "Garry"
end

def handle_call({:do, stuff}, _caller, state) do
  thing = complicated_and_fun_computations(stuff, state.name)
  {:reply, thing, %State{state | data: [thing | stuff.data]}}
end

{% endhighlight %}


We can test it just by calling `handle_call` with proper arguments or at least arguments that program would expect...

{% highlight Elixir %}
test "computations compute expected result" do
  {:reply, result, _whatever } = Stuff.handle_call({:do, "fun data"}, self, %Stuff.State{})
  assert result = something
end
{% endhighlight %}
