var concat  = require('gulp-concat')
var gulp    = require('gulp')
var jasmine = require('gulp-jasmine')

var coreSources = [
  'src/prelude.js',
  'src/lib/**/*.js',
  'src/finale.js'
]

gulp.task('default', ['concat-sources'], function() {
  return gulp.src(['build/specs.js'])
    .pipe(jasmine())
})

gulp.task('concat-sources', function() {
  gulp.src(coreSources.concat(['src/web.js']))
    .pipe(concat('ascetic.js'))
    .pipe(gulp.dest('dist'))

  return gulp.src(coreSources.concat(['spec/**/*.js']))
    .pipe(concat('specs.js'))
    .pipe(gulp.dest('build'))
})
