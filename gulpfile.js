// add installed packages
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// compiles SASS and adds prefixes
function compileSass() {
  return gulp
  .src('css/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

// gulp task for SASS function
gulp.task('sass', compileSass);

// function to start the browser server
function browser() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// task to start the browser-sync
gulp.task('browser-sync', browser);

// gulp watch function
function watch() {
  gulp.watch('css/scss/*.scss', compileSass);
  gulp.watch(['*html', '*.php']).on('change', browserSync.reload);
}

// starts watch task
gulp.task('watch', watch);

// default gulp task that starts watch and browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync'));