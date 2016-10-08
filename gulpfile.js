var addsrc  = require('gulp-add-src')
var concat  = require('gulp-concat')
var gulp    = require('gulp')
var iife    = require('gulp-iife')
var jasmine = require('gulp-jasmine')

var coreSources = [
  'src/injector.js',
  'src/lib/**/*.js'
]

gulp.task('default', ['concat-sources'], function() {
  return gulp.src(['build/specs.js'])
    .pipe(jasmine())
})

gulp.task('concat-sources', function() {
  gulp.src('src/lib/**/*.js')
    .pipe(iife())
    .pipe(addsrc.prepend('src/injector.js'))
    .pipe(addsrc.append('src/web.js'))
    .pipe(concat('ascetic.js'))
    .pipe(iife())
    .pipe(gulp.dest('dist'))

  return gulp.src(coreSources.concat(['spec/**/*.js']))
    .pipe(concat('specs.js'))
    .pipe(gulp.dest('build'))
})
