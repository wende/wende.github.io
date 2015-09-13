---
layout: post
title: Why You have to stop using Windows for programming
comments: true
tags: linux, unix, windows, commands, console
---

You've got to admit, we all don't like to hear that the stuff we use right now sucks. There is plenty of psychological studies proving that no matter what, we will stand by the side of the thing (I kindly recommend Dr Robert Cialidini's analysis of American brainwashed prisoners at war in China)
Lion share of us started using personal computers with MS Windows on it. We used it for years, and also we started programming on it, hence we got used to saying it's the right way.
I've used to be in this camp. I thought the difference is insignificant. Right now I know - it isn't.
I'm using Linux (Ubuntu to be precise [pangolin]). It took me quite long time to convince myself to make a shift. It took me way too much. It was a great mistake not to take that shot for so long, and that's why I will try to convince You too that it is worth it.

### Command-line

The most (only?) significant advantage of Linux (or OS X) system is the CLI. You might have underestimated it before. But as a programmer You'll probably admit that a GUI is never as powerful as a text interface - especially when it comes to automation.
I'm not saying I'm a pro Linux user, and never probably be one. But there are few secret weapons I got to discover throughout last several years. Here are some of these

### Amazing tab completion
It just works. Period

### Any problem is copy-paste solvable
Something doesn't work as You would like it to? Google the problem. Copy the answer. Paste it into CLI. Problem solved.

### One-line command for anything - seriously
You probably all know `apt-get install` (or `yum` or other distro alternatives). It's a huge relief to change the installation workflow from:
1. Google it
2. Go to the website
3. Find download page
4. download
5. open the installer
6. Next... Next... Finish

to:
1. `sudo apt get install name_of_the_package`
2. RET

But that's just a beginning of the journey. You can do almost anything in a one-liner if You know how to.

#### Execute a shell script under some URL
`bash <(wget -qO- URL)`
And done, it downloads the script and executes it when it finishes.
For example try my script for checking whether You've got everything installed for my upcoming Elixir lecture tutorial ([Feel free to join BTW if You're from Cracow in Poland](http://www.meetup.com/Elixir-Krakow/events/225061900/))
`bash <(wget -qO- https://raw.githubusercontent.com/wende/mongoosetutorial/master/checkenv.sh)`


#### See the HTTP response of a website under the url
`curl URL`
or
`wget URL`

Or save it to a file:

`echo curl URL > filename`

#### Copy a file over SSH
You want to copy a file but You don't have FTP configured? No problem
`scp /path/to/file username@address:/path/to/destination`

#### Beep
Sometime when You execute long commands it would be nice to know when it has finished.
Add
`alias beep=(speaker-test -t sine -f 1000 )& pid=$! ; sleep 0.2s ; kill -9 $pid`
To Your .bashrc file and when You want an information about it getting finished just use:
`(command ; beep)`

### Shitload of great tools

On Unix systems You've got just infinite amount of tools that will help You do the job in one line (And they take one line to install as well)

#### Entr
This is probably one of my favorite. I use it all the time.
Entr tracks the files You give it and whenever they change it executes a command You said it to.
Example
`find . | entr mix test`
And from now on every time I change anything in my project files I get all of my Mix (Elixir) unit tests executed.

#### Telnet
If You ever worked with bare TCP connection You know how troublesome it can be to test it, and most of the time
You just end up writing Your own TCP client which sends the input string and writes out the response.
Well on Linux You've got that in the package

#### Cloc
A great tool to count lines of code in Your project.
Here is the output of this blog:

`cloc .`

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
CSS                             23          13230          10845          82840
Javascript                     150          11954           9382          65926
HTML                           108           5168            678          44150
SASS                           143           4928           4057          24361
XML                              3            183              0            964
YAML                             1             10             12             54
Ruby                             2             13             26             14
-------------------------------------------------------------------------------
SUM:                           432          35531          25072         218979
-------------------------------------------------------------------------------
```

#### TMUX

Divides Your terminal into panes and windows, and also allows You to close a terminal without losing Your session.
I use it all the time. Even right now during writing it. That way I can use the editor, see Jekyll logs and execute commands, all in one screen.  

![Tmux session](/img/tmux.png)


#### Emacs (or VIM)
I don't want to start over an editor war so I will write it universally:
You're a programmer. The quality of the tools You use is in direct proportion to the speed and quality of Your coding.
So why wouldn't You use an editor that is capable of being developed by Yourself in any way You want to. Not to mention that these extensions are shared by all of the users. Thanks to that in my Emacs I can:

- Read and write emails (Rmail)
- Edit files over FTP or SSH (AngeFTP)
- Write code in **ANY** programming language
- Make TODO lists (OrgMode)
- Write a blog - doh
- And probably a lot more but I still haven't discovered


#### Nethogs
You've got low bandwidth on Your internet contract? Track which program uses the most of it.
It's like `top` for bandwidth.
![Nethogs](/img/nethogs.png)

### Language specific tools
Every language has it's toolset. And most (or even all of the) are commandline tools. And You don't want to use Window's commander. Trust me. It's quite impossible to list all of the important tools but I will try to list some of them:

- Every REPL - Node.js's, Ruby's, Python's, Erlang's, Scala's
- Most unit tests interfaces
- GIT
- Task automation tools - Grunt, automated compilers, transcompiled languages (CoffeeScript, Less, Sass, YAML, ...)
- Language compilers

### Summary

There is a lot of tools that will make Your programming experience richer, and most of them will only work on Linux or OS X.
And what great findings do You know?
I'd love to see You share that in comments!

Cheers!

## Bonus - badass shortcut for rebooting the system
`Alt + PrtSc + R -> E -> I -> S -> U -> B`
Or using a laptop with fn key:
`Alt + Fn + PrtSc + release Fn + R -> E -> I -> S -> U -> B`

It'll never stop to cheer me up ;)
