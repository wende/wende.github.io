---
layout: post
title: Few thought on React Native and mobile development
tags: mobile, frontend, react-native, react, javascript
author: cichocinski
draft: false
---

Right now we're developing our app - *Swingby*. We're using React Native for mobile development, and I have few thoughts after working with mobile platforms and React Native for few weeks now.

### Background

I'm developing for web mostly. I revolve around web technologies and languages. That's why I'm responsibe for our Fronend Engineering at Neon Tree.
I've wrote few mobile apps back in school, both Android and iOS, but I've never been into mobile development at production level. And it seems I might change my mind in the near future.

I was staring with real web development with Angular 1. It was ok but I've never felt in love with this technology. Back then I was working on my web game engine [amble-engine](https://github.com/Baransu/amble-engine),
where whole interface was done in Polymer and Angular.
Performance was importand because there was a lot of connected components like Scene and Inspector, sharing state so moving one element on Scene cause a lot of rerenders to Inspector, which was responsible for displaying Actor properties,
and it worked the same both ways.
I know that fault lies mostly on my site but technology should enforce good design and my stack didn't help me develop better experience to end user.

Then I learned React. And I felt in love with it. Composition, immutability, JSX, unidirectional data flow, lifecycles. Bunch of greate concepts helping you develop better, more fault tolerant applications.
I'm with React in heart for almost a year or so right now. And it works perfect for our projects. But we have to develop mobile application. And we want it to be on both Android and iOS.
But none of us has production experience with both iOS and Android at the same time.
So we decided to jump into React Native because we had a lot of experience with working with React.

### Learn once, build everywhere
And this is trully the best aspect of React ecosystem. I scaffolded project and start working. And it was so natural for someone with web development background in comparison to native Android or iOS.
It's the same JavaScript with ES6 syntax. It's the same API with the same lifecycle for components. It's the same state managment library (we're using Redux). So I was writing and creating like I would be doing that for years.
But few problems show up. Router and pages managment and blur effect for images.
I was looking for good solution to both problems. I've tried few libraries to manage pages and routing but `react-native-router-flux` turns to be the best solution. It has simple and clean API so showing and hiding pages is no more a headache.
Second problem was blur effect on images. And this time I'was looking for good library to solve problem. I found `react-native-blur`, and it's great library. Which works on our codebase only with iOS not on Android due to differences between these platforms.

### Platofrm differences
I think this is the biggest downsite of shared mobile development with the same codebase for both platforms in genreal.
In hybrid apps like overything Cordova based there is not that much problem, because you're writing HTML as in usual web application and only few things require
to interact with underlying native platform. But in React Native you're writing everything native. So my blur example failed because there is not consistency between iOS and Android. Right, there is common a lot, but few things are just not.
For example `elevation API` on Android. It's unique to Android because it gives you this pretty looking Material Design effect. And I'm not expecting iOS to provide the same API and the same look and feel. But thease differences are making our development harder.
And since elevation/shadow is not a big problem other things like blur are. Why to hell Android has no blur support for images at the first place?! It's so common to blur background images for example and use blur in general.

This is not a strike at React Native nor `react-native-blur`. It's just toward mobile development in general. Web is in someways standarized. We have JavaScript, CSS and HTML standards. And this allows us to create trully crossplatform experiences.
Right there are differences in web development they're marginal. And on mobile we have two major platforms with different languages, different aproaches to rendering, etc. It's really hard to make fast, good looking application for both platforms at the same time.

### React Native genius
React Native is so genius. In this savage mobile world, folks at Facebook were able to create tools that allows you to write native mobile applications almost exact same way for both platforms. And it's magic.
And look for whole React Native community, so many good libraries, plugins. Great community with open source in minds and hearts.
So big thanks to React and React Native team and the whole community for making our lives easier, here at Neon Tree.
