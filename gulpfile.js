var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var babel       = require('gulp-babel');

/**
 * Compile files from scss
 */
function styles() {
  return gulp.src(['scss/styles.scss'])
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}))
}

function stylesProd() {
  return gulp.src(['scss/styles.scss'])
    .pipe(sass({
      includePaths: ['scss'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest('./'))
}

/**
 * Compile files from js
 */
function scripts() { 
  return gulp.src(['js/*.js', 'js/custom.js'])
    .pipe(babel({
      'presets': [ '@babel/preset-env' ]
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({ stream:true }))
}

function scriptsProd() { 
  return gulp.src(['js/*.js', 'js/custom.js'])
    .pipe(babel({
      'presets': [ '@babel/preset-env' ]
    }))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
}

/**
 * Reload page when html changes
 */
function browserSyncServe(done) {
  browserSync.init({
    server: "./",
    port: 8356
  })
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}
/**
 * Watch source files for changes & recompile
 * Watch html/md files, run Jekyll & reload BrowserSync
 */
function watchMarkup() {
  gulp.watch(['index.html'], browserSyncReload);
}

function watchScripts() { 
  gulp.watch(['js/*.js'], scripts);
}

function watchStyles() { 
  gulp.watch(['scss/*.scss'], styles)
}

var compile = gulp.parallel(scripts, styles)
var serve = gulp.series(compile, browserSyncServe)
var watch = gulp.parallel(watchMarkup, watchStyles, watchScripts)

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the Jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.parallel(serve, watch))
gulp.task('build', gulp.parallel(scriptsProd, stylesProd))
