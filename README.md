# Ascetic

Ascetic is a frontend web framework based on a [Cynical](#cynicism) philosophy of software development. It is intended to be the standard application framework of the BadOS operating system, but it can also be used outside of BadOS.

## Philosophy

Ascetic has the following priorities:

### Product

- **Immediate utility**
  - _over perfect solutions that may never ship_
- **Addressing a need**
  - _over making money_
- **Simple, text-based UI**
  - _over complex information architecture_
- **Focused workflows**
  - _over multitasking_
- **Standardized UX**
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

### Cynicism

The opinions and beliefs that shaped Ascetic bear a strong resemblance to the philosophy of the ancient Cynics.

From the [Wikipedia article on Cynicism](https://en.wikipedia.org/wiki/Cynicism_%28philosophy%29):

> - The goal of life is _eudaimonia_ [human flourishing] and mental clarity or lucidity (ἁτυφια) [...].
> - Eudaimonia is achieved by living in accord with Nature as understood by human reason.
> - Arrogance (τύφος) is caused by false judgments of value, which cause negative emotions, unnatural desires, and a vicious character.
> - Eudaimonia [...] depends on self-sufficiency (αὐτάρκεια), equanimity, _arete_ [virtue], love of humanity, _parrhesia_ [frank speech] and indifference to the vicissitudes of life (ἁδιαφορία).
> - One progresses towards flourishing and clarity through ascetic practices (ἄσκησις) which help one become free from influences – such as wealth, fame, and power – that have no value in Nature. [...]
> - A Cynic practices shamelessness or impudence (Αναιδεια) and defaces the _nomos_ of society; the laws, customs, and social conventions which people take for granted.

## Why???

I ask myself that question a lot, too! I observe the interminable parade of new technologies, each more dubiously valuable than the last, and wonder, "why? Why??? WHYYYYY."

Maybe [we're searching for the Holy Grail](http://blog.cleancoder.com/uncle-bob/2016/05/21/BlueNoYellow.html). Maybe [we want to believe these technologies will be the silver bullet that makes programming easy](https://8thlight.com/blog/uncle-bob/2015/08/06/let-the-magic-die.html). Maybe [we're just chasing what's new and hip](http://blog.cleancoder.com/uncle-bob/2016/07/27/TheChurn.html). Or maybe we're seeing real problems with the way we produce software, but we keep coming up with fantastically wrongheaded solutions.

The recent history of software-development tooling has been characterized by additive solutions to small problems. When we see something that's not working quite as smoothly as it could, we add a new tool to our tech stack to patch the problem.

The downside of this approach is that each tool we add has to be understood and maintained. New concepts and dependencies add complexity to our systems. To overcome this complexity requires _arcane knowledge_ and _overwhelming force_.

- **Arcane knowledge** means understanding the full stack of tools you're using. To be an excellent Rails programmer, you can't be content to know just the Rails APIs, you have to understand Ruby syntax and semantics and maybe be able to imagine how you'd implement parts of Rails yourself. Occasionally you'll need to understand how Ruby itself is implemented—how else could you decide intelligently between MRI and JRuby, or understand the behavior of your "multithreaded" program?
- **Overwhelming force** usually means turning things off and then turning them on again. [When we don't understand what's causing our problem, sometimes the only way to fix it is to start over from a known good state](https://xkcd.com/1597/)—which often means going back to square one.

Of course, there's a third option for dealing with complexity: [create a new layer of tooling to simplify it](https://github.com/benchristel/gulp-express-example). Brilliant! No one's tried _that_ before.

I now believe that there are very few problems that can be solved by the addition of new entities to a system. Rather, when we encounter a problem, our first step should be to ask what it would take to remove the cause of the problem. Rather than constantly acquiring new tools that ultimately just weigh us down, we should pare down our tools and our skills and simplify our products and processes. In other words, we should live like ascetics.

## Is this for real? Or is it all a bizarre joke?

Yes.
