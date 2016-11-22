---
layout: post
title: Let's code! Few thoughts after hackathon.
tags: hackathon, event
author: hajto
draft: true
---

Last week we were attending to hackathon event called Let's Code. It was being organized by company SII. It was great oportunity to test our skills and test our endurance. In less than 20 hrs we managed to creaty functional MVP!

#### Let's hack

The general idea of hackathon was to create an app from one of the three sectors: local business, security and connecting people. We went with social networking because technologies we use on a daily basis were ideal that purpose. After a brief discussion we decided that we won't use react on the front end just for now and we used more hackable aproach.

![Swing by logo]({{ site.url }}/img/letscode/swing_by.png){: .center-image}

After a very fruitful brain-storm we came up with Swing By. App designed to ease organizing jam sessions and connecting musiacians. We decided to go with Made for musiacians by musiacians approach. Chris has big musical experience and knows the struggle of organizing such events. So we knew problem really well.

Basically the core functionality consists of 2 activities. Creating events and applying for events. Events are displayed in Tinder swipe left or right fashion. Such interface was both quite easy to implement and is recognizable, so everyone knows how to use it.

![Swing by logo]({{ site.url }}/img/letscode/mocks.jpg){: .center-image}

Speaking about hackathon itself it was quite well organised. Most of programmers had an extra monitor to use and after a brief investigation we were even able to borrow missing adapters to use them. There was more than enough of food for everyone. Pizza of every possible kind and even some subway sandwitches with whatever you could imagine including chicken, tune and some veggies. Even drinks were cooled in the fridge. In other words, organizers shown us some really nice attention to details providing really good working conditions.

Although we have some important complains. One of them is imposing presentation template (not a pretty one actually...) in .pptx format. What if you want to make prezi or slides presentation? In my humble opinion that's really bad idea, because it severely limits our creativity when it comes to it's form. I think we managed to overcome that limitation by using gifs made by our magnificient designer `Maciek Chwast` (a.k.a. hipster for hire).

#### Other notable projects

1. Arduino Security System - our next door neighbours were developing home security system based on Arduino. They were building it live from scratch and programming it. The process of them making it happen was excellent show actually. From know and then we were able to hear them swearing and shouting texts like "pin 4 is still three, give data in matrix xxxx", where xxx were sentences we couldn't fully understand. After 20 or so hours they made functional minimal viable product. During the live demo they encountered some problems with wifi, but it was still awesome.

2. [WanderLust](http://wanderlust.edu.pl/) - I don't really recall what was idea behind this project, but the splash screen will last really long in our memory.

#### Problems we have encountered

During the application development we encountered a few really weird situations and implementations of some features. First of them is how elixir mongodriver handles encoding of BSONId.

{% highlight elixir %}
def decode!(<< c0,  c1,  c2,  c3,  c4,  c5,
              c6,  c7,  c8,  c9,  c10, c11,
              c12, c13, c14, c15, c16, c17,
              c18, c19, c20, c21, c22, c23 >>) do
  << d(c0)::4,  d(c1)::4,  d(c2)::4,  d(c3)::4,
     d(c4)::4,  d(c5)::4,  d(c6)::4,  d(c7)::4,
     d(c8)::4,  d(c9)::4,  d(c10)::4, d(c11)::4,
     d(c12)::4, d(c13)::4, d(c14)::4, d(c15)::4,
     d(c16)::4, d(c17)::4, d(c18)::4, d(c19)::4,
     d(c20)::4, d(c21)::4, d(c22)::4, d(c23)::4 >>
catch
  :throw, :error ->
    raise ArgumentError
else
  value ->
    %BSON.ObjectId{value: value}
end
{% endhighlight %}

Cute, isn't it? We also had an issue with finding good android phone picture to put mocks inside. So... Maciek took an Iphone 6 and removed home button and added an android nav strip.

![Macieks invention]({{ site.url }}/img/letscode/iandroid.jpg){: .center-image}

Another troublesome part was connecting to spotify via ueberauth_spotify. The author of strategy forgot to implement credentials callback... Ofcourse rather then fixing it at the moment i mocked it shoving it into random field in conn struct.

{% highlight elixir %}
defp fetch_user(conn, token) do
  case OAuth2.AccessToken.get(token, "/me") do
    { :ok, %OAuth2.Response{status_code: 404, body: _body}} ->
      set_errors!(conn, [error("OAuth2", "404 - not found")])
    { :ok, %OAuth2.Response{status_code: 401, body: _body}} ->
      set_errors!(conn, [error("token", "unauthorized")])
    { :ok, %OAuth2.Response{status_code: status_code, body: user} } when status_code in 200..399 ->
      conn
      |> put_private(:spotify_user, user)
      |> put_private(:token, token)
    { :error, %OAuth2.Error{reason: reason} } ->
      set_errors!(conn, [error("OAuth2", reason)])
  end
end
{% endhighlight %}

<!-- Koniec postu -->

Feel free to check out our [Facebook Page](https://www.facebook.com/neontreeltd/) for [more pictures](https://www.facebook.com/neontreeltd/posts/732531366912881).
