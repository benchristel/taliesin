# Taliesin API

## Error-printing

All errors emitted from the framework are fatal. That is, they halt the application and the only way to recover is to restart.

When an error occurs, it is printed to the DOM. It is also printed to the JS console. Depending on the browser's console implementation, this may also log the error's stacktrace or other details.

## Stage()

`Stage(name: string, definition: (World) => void): void`

Taliesin applications are built around the concept of "stages". A stage is a single "screen" of the application. It typically differs from other stages by its appearance when rendered on the screen, and the set of interactions available to the user.

A splash screen is a trivial example of a stage. Other stages might be data entry forms, option-selectors, text editors, loading screens, command line interfaces, levels of a game, the high-scores screen, etc.

To declare a stage, the application programmer calls `Stage()`, passing the name of the Stage (which can be any string as long as it is unique among the names of other stages), and a function that defines the stage's behavior.

Passing a non-unique name for the stage will print an error to the console and to the DOM.

The definition function for a stage should accept a single argument—the `world` object. This represents the global state of the application.

### getDataToRender

The definition function **must** define a `getDataToRender` function on the `world` object. Failure to do this results in an error when that Stage is invoked for the first time.

The `getDataToRender` function may return any value, as long as it is understood by the renderer of that stage.

### renderer

The definition function **may** define a `renderer` function on the `world` object. The `renderer` function must return an array of strings representing lines to be printed to the screen.

The returned array may be of any length. If the length of the array is greater than the actual number of printable lines on the screen, the output will be truncated. If it is less, the remaining space on the screen will be empty.

If no renderer function is explicitly defined, the default behavior is to convert the output of `getDataToRender` to JSON with `JSON.stringify` and return that as the first and only line of output. // TODO should this just be toString instead? Might make more sense for the majority of use cases.

### Key Bindings

A Stage may listen for keyboard input with the following APIs on the World object:

```
world.onKey(keyName: string)
world.onAnyKey
world.onOtherKey
world.onCharKey
world.onOtherCharKey
```

The value of each of the above expressions is an object with the following properties:

```
typed: (key: string) => void
pressed: (key: string) => void
released: (key: string) => void
held: (key: string) => void
```

- `typed` events fire when the user initially presses the key, as well as when the key repeats.
- `pressed` events fire when the user initially presses the key. It occurs before the `typed event`
- `released` events fire when the user releases a pressed key.
- `held` events fire on the first key repeat after the initial press. It occurs before the `typed` event.

The callbacks fire in order from most to least specific:

- onKey(keyName)
- onOtherCharKey (if no onKey callback was given for this key)
- onCharKey
- onOtherKey (if no onKey callback was given for this key)
- onAnyKey

To ease internationalization, information about key codes and modifier keys is not made available to the application. Thus, if the application user presses a key or key combination that would have the effect of inputting '+' on their keyboard layout, the string `'+'` will be passed as the key name to each of the callbacks.

Additionally, there are no events for non-printing keys (arrow keys, modifiers, `home`, `del`, etc.) since these are not present on every keyboard.

The backtick (\`) acts as a dead key which can be used to type accented characters. Details are WIP.

### Timer Bindings

A Stage may subscribe to timer events, which are triggered at regular intervals.

```
world.everyTick = (elapsedSeconds: number) => void
world.every(5).ticks = (elapsedSeconds: number) => void
```

The argument to the callback is the actual elapsed time since the last call _to this particular callback_.

There are 30 ticks per second.

### External Calls

WIP

```
function handleSelection() {
  world.fileIndex = getJSON('some.url')
}

world.fileIndex = {
  data: [],
  error: '',
  done: false
}
```

## Schemas and Validation

During test execution, the test runner validates rendered data and the state of the world against schemas.

Renderer functions may define an associated schema as a property on the function object:

```javascript
function myRenderer(data) {
  // ...
}
myRenderer.inputSchema = {
  // ...
}
```

The application may define a schema to describe the shape of the `world` object. The schema and with the initial state of the world are passed to the `initWorld` function which must be called before states can be defined.

initWorld({score: 0}, {score: isNumber})

`initWorld` immediately validates the initial state (the first argument) against the schema. If the initial state is not valid, it throws an error.

Each test that runs also validates the state of the world and the output of getDataToRender

- after `setUpWorld` is called
- after each event (input, timer, request returning, etc.)

If setUpWorld is not called, the initial state passed to initWorld is used.
