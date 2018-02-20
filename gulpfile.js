"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
cleanCSS = require('gulp-clean-css'),
   image = require('gulp-image');


// Scripts ******************

gulp.task('concatScripts', function() {
    return gulp.src([
      'js/global.js',
      'js/circle/autogrow.js',
      'js/circle/circle.js'
      ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', ['concatScripts'], function() {
  return gulp.src('dist/scripts/app.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});


// Styles *******************

gulp.task('compileSass', function() {
  return gulp.src('sass/global.scss')
      .pipe(rename('all.css'))
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', ['compileSass'], function() {
  return gulp.src('dist/styles/all.css')
    .pipe(cleanCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('dist/styles'));
});


// Images *******************

gulp.task('images', function () {
  return gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/content'));
});


// Clean ********************

gulp.task('clean', function() {
  return del(['dist', 'css/all*.css*', 'js/all*.js*']);
});


// Build ********************

gulp.task('build', ['scripts', 'styles', 'images'], function() {
  return gulp.src(['css/all.min.css','js/all.min.js','index.html',
                   'icons/**', 'icons/svg/**'], { base: './'})
            .pipe(gulp.dest('dist'));
});


// Default ******************

gulp.task('default', ['clean'], function() {
  gulp.start('build');
  gulp.watch('sass/**/*.scss', ['styles']);
});


