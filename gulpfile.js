// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const uglify = require("gulp-uglify");
// const pxtorem = require('gulp-pxtorem');
// const minifycss = require("gulp-minify-css");
// const gulpFont = require("gulp-font");
// const webfont = require("gulp-webfont");
// const fontgen = require('gulp-fontgen');
// Load package.json for banner
const pkg = require("./package.json");

// Set the banner content
const banner = [
  "/*!\n",
  " * <%= pkg.title %> v<%= pkg.version %>\n",
  " * Copyright " + new Date().getFullYear(),
  " <%= pkg.author %>\n",
  " */\n",
  "\n",
].join("");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}
// Clean vendor
function clean() {
  return del(["./dist/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp
    .src("./node_modules/bootstrap/dist/**/*")
    .pipe(gulp.dest("./dist/vendor/bootstrap"));
  // jQuery
  var jquery = gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js",
    ])
    .pipe(gulp.dest("./dist/vendor/jquery"));
  return merge(
    bootstrap,
    jquery
  );
}

/*
function font() {
  return gulp
      .src('./fonts/*.{ttf,otf}')
      .pipe(fontgen({
        dest: "./dest/fonts"
      }))
}
*/
// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "expanded",
        includePaths: "./node_modules",
      })
    )
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(
      header(banner, {
        pkg: pkg,
      })
    )
    .pipe(gulp.dest("./dist/css"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src(["./js/*.js", "!./js/*.min.js"])
    .pipe(
      header(banner, {
        pkg: pkg,
      })
    )
    .pipe(gulp.dest("./dist/js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./dist/js"))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", gulp.parallel(css, browserSyncReload));
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
// exports.font = font;
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.watch = watch;
exports.default = build;