# Taliesin

Taliesin is a frontend web framework. It is intended to be the standard application framework of the BadOS operating system, but it can also be used outside of BadOS.

It differs from other frameworks in affording very little control over the appearance of the application—output is rendered as an 80x30-character grid of monospace text. (Styled text, images, video, and audio are under consideration.) Additionally, there is no facility for mouse input; only keyboard input is supported.

Why would you ever endure these sacrifices or inflict them on your users? Taliesin lacks UI gloss, but it makes up for it in UX quality and development speed.

- Runtime type-checking and an integrated test framework let you write bulletproof code. Every part of the system can be thoroughly checked from multiple angles. If you test-drive your code, your users will not experience bugs.
- Can't get your coworkers to run tests? With Taliesin, your tests run _every time the app loads in a browser_. If they fail, the app will confront you with an error message instead of starting.
- The straightforward API and complete lack of CSS mean you'll have fewer mysterious issues that can only be fixed by your local web guru whispering a bizarre incantation.
- The affordances for mutating global state (safely!) finally make it possible to avoid the scenario where every third request from the PM leaves your carefully-architected module boundaries in shambles. PMs (and users) don't understand encapsulation; don't expect them to think in terms of components.
- There is no tooling. No compilation, no transpilation, no transclusion, no `include`s, no polyfills<sup>*</sup>, no sourcemaps, no expression language, no task runner, and no config files. You just write JavaScript, and it just runs.
- Your users will never be frustrated by having to navigate your app with the crappy trackpad on their netbook. They'll only have to deal with the slightly-less-crappy keyboard.
- It's _damn fast_.
- Retro UIs are cool.

<sup>*</sup>Okay, there's one, for Proxies, but it's baked into the framework and you don't have to worry about it.

## Getting Started

The `taliesin` executable creates a new project with everything you need to get started.

Assuming you have `node` already, here's what you gotta do:

```bash
cd ~ # (or wherever you like to put projects)

# install Taliesin
npm install --global taliesin

# create your project
taliesin my-awesome-project

# see it work
cd my-awesome-project
open index.html
```

## Philosophy

Taliesin has the following priorities:

### Product

- **Immediate utility**
  - _over perfect solutions that may never ship_
- **Addressing a need**
  - _over captivating users_
- **Simple, text-based UI**
  - _over complex information architecture_
- **Focused workflows**
  - _over multitasking_
- **Standardized UI**
  - _over branding and individuality_
- **Contentment with what can be done simply**
  - _over risk-taking and pushing the limits of what's possible_

### Code

- **Confidence in code**
  - _over magic that "just works"_
- **Test-loving code**
  - _not just "testable code"_
- **Self-sufficient code**
  - _that doesn't need a mountain of dependencies_
- **A stable platform**
  - _enabling long-lived, evolving applications_
- **Minimal hardware and software requirements**
  - _over the latest technology_
- **A framework you could write yourself**
  - _but be glad you don't have to_

## Why???

I ask myself that question a lot, too! I observe the interminable parade of new technologies, each more dubiously valuable than the last, and wonder, "why? Why??? WHYYYYY."

Maybe [we're searching for the Holy Grail](http://blog.cleancoder.com/uncle-bob/2016/05/21/BlueNoYellow.html). Maybe [we want to believe these technologies will be the silver bullet that makes programming easy](https://8thlight.com/blog/uncle-bob/2015/08/06/let-the-magic-die.html). Maybe [we're just chasing what's new and hip](http://blog.cleancoder.com/uncle-bob/2016/07/27/TheChurn.html). Or maybe we're seeing real problems with the way we produce software, but we keep coming up with fantastically wrongheaded solutions.

The recent history of software-development tooling, especially in the JavaScript world, has been characterized by additive solutions to small problems. When we see something that's not working quite as smoothly as it could, we add a new tool to our tech stack to patch the problem.

The downside of this approach is that each tool we add has to be understood and maintained. New concepts and dependencies add complexity to our systems. To overcome this complexity requires _arcane knowledge_ and _overwhelming force_.

- **Arcane knowledge** means understanding the full stack of tools you're using. To be an excellent Rails programmer, you can't be content to know just the Rails APIs, you have to understand Ruby syntax and semantics and maybe be able to imagine how you'd implement parts of Rails yourself. Occasionally you'll need to understand how Ruby itself is implemented—how else could you decide intelligently between MRI and JRuby, or understand the behavior of your "multithreaded" program?
- **Overwhelming force** usually means turning things off and then turning them on again. [When we don't understand what's causing our problem, sometimes the only way to fix it is to start over from a known good state](https://xkcd.com/1597/)—which often means going back to square one.

Of course, there's a third option for dealing with complexity: [create a new layer of tooling to simplify it](https://github.com/benchristel/gulp-express-example). Brilliant! No one's tried _that_ before.

I now believe that there are very few problems that can be solved by the addition of new entities to a system. Rather, when we encounter a problem, our first step should be to ask what it would take to remove the cause of the problem. Rather than constantly acquiring new tools that ultimately just weigh us down, we should pare down our tools and our skills and simplify our products and processes.
