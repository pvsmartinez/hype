var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var env = require('gulp-env');
var nodemon = require('gulp-nodemon');

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
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('nodemon', function() {
  if (fs.existsSync('.env.json'))
    env('.env.json');

  nodemon({
    script: 'server.js'
  });
});

gulp.task('default', ['scripts', 'nodemon', 'watch']);
