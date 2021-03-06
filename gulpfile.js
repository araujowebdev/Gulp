// add installed packages
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// compiles SASS and adds prefixes
function compileSass() {
  return gulp
    .src('css/scss/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }),
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// gulp task for SASS function
// gulp.task('sass', function (done) {
//   compileSass();
//   done();
// });
exports.compileSass = compileSass;

// Concat JS
function gulpJS() {
  return gulp
    .src('js/main/*.js')
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// gulp.task('mainjs', gulpJS);
exports.gulpJS = gulpJS;

// JS Plugins
function pluginJS() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/moment/min/moment.min.js',
      'js/plugins/*.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// gulp.task('pluginjs', pluginJS);
exports.pluginJS = pluginJS;

// function to start the browser server
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

// task to start the browser-sync
// gulp.task('browser-sync', browser);
exports.browser = browser;

// gulp watch function
function watch() {
  gulp.watch('css/scss/*.scss', compileSass);
  gulp.watch('js/main/*.js', gulpJS);
  gulp.watch('js/plugins/*.js', pluginJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// starts watch task
// gulp.task('watch', watch);
exports.watch = watch;

// default gulp task that starts watch and browser-sync
exports.default = gulp.parallel(watch, browser, compileSass, gulpJS, pluginJS);