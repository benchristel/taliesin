var concat  = require('gulp-concat')
var gulp    = require('gulp')
var jasmine = require('gulp-jasmine')

gulp.task('default', ['concat-sources'], function() {
  return gulp.src(['build/specs.js'])
    .pipe(jasmine())
})

gulp.task('concat-sources', function() {
  gulp.src(['src/lib/**/*.js', 'src/web.js'])
    .pipe(concat('ascetic.js'))
    .pipe(gulp.dest('dist'))

  return gulp.src(['src/lib/**/*.js', 'spec/**/*.js'])
    .pipe(concat('specs.js'))
    .pipe(gulp.dest('build'))
})
