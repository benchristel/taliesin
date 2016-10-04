"use strict"
// this makes everything use strict mode,
// since the code is concatenated before it is run.
// See the gulpfile.

function Ascetic() { // the curly brace is closed in finale.js.

// $export is ultimately returned from the Ascetic function.
// Each module adds itself to the $export object.
var $export = {}

// maps the names of declared Stages to their initializers.
var $stages = {}

// stores the current global state of the application.
var $world = {}
