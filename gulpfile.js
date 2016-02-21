var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
  scripts: ['public/app.js','modulos/*/web/**/*.js']
};


gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(ngAnnotate({
		    remove: true,
		    add: true,
		    single_quotes: true
		}))
    .pipe(sourcemaps.init())
      .pipe(concat('compiled.min.js', {newLine: '\n;'}))
      .pipe(uglify({mangle:false}))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
