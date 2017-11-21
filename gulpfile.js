/*** INCLUDE ****************************************************************************************/
// GULP
var gulp = require('gulp');
// GENERAL
var concat = require('gulp-concat');
var rename = require("gulp-rename");
// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
// JS
var uglify = require('gulp-uglifyjs');
// IMAGE MIN
var imagemin = require('gulp-imagemin');
var imageminSvgo = require('imagemin-svgo');
var cache = require('gulp-cache');

// BROWSER SYNC
/*var browserSync = require('browser-sync').create();*/

/*** PATHS ******************************************************************************************/
var paths = {
    sass: {
        src:    'web/src/sass/',
        dest:   'web/css/',
        watch:  'web/src/sass/**/*.scss'
    },
    js: {
        src:    'web/src/js/',
        dest:   'web/js/',
        watch:  'web/src/js/*'
    },
    img: {
        src:    'web/src/img/',
        dest:   'web/img/',
        watch:  'web/src/img/**/*'
    }
};

/*** BROWSER SYNC INIT ******************************************************************************/
/*gulp.task('browsersync', function() {
    browserSync.init({
        proxy: 'dev.mg-transaction'
    });
});*/

/*** SASS ZONE **************************************************************************************/
gulp.task('sass', function () {
    // RECUP SOURCE FILES
    return gulp.src(paths.sass.watch)
        // INIT SOURCEMAPS
        .pipe(sourcemaps.init())
        // SASS
        .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
        // AUTO PREFIXER
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        // MINIFY
        .pipe(csso())
        // CONCATENATE
        .pipe(concat('style.css'))
        // RENAME
        .pipe(rename({suffix: '.min'}))
        // WRITE SOURCEMAPS
        .pipe(sourcemaps.write('./'))
        // SAVE
        .pipe(gulp.dest(paths.sass.dest))
        // BROWSER SYNC
        /*.pipe(browserSync.reload({
            stream: true
        }))*/
});
/*** JS ZONE ****************************************************************************************/
gulp.task('js', function () {
    // RECUP SOURCE FILES
    return gulp.src(paths.js.watch)
        // CONCATENATE
        .pipe(concat('script.js'))
        // MINIFY
        .pipe(uglify())
        // RENAME
        .pipe(rename({suffix: '.min'}))
        // SAVE
        .pipe(gulp.dest(paths.js.dest))
});
/*** IMG ZONE ***************************************************************************************/
gulp.task('imgopti', function () {
    // RECUP IMAGES
    return gulp.src(paths.img.watch)
        // CACHE LES IMG + TRAITEMENT
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        // SAVE
        .pipe(gulp.dest(paths.img.dest))
});
/*** WATCH ZONE *************************************************************************************/
gulp.task('watch'/*,['browsersync','sass']*/, function(){
    // WATCH SASS
    gulp.watch(paths.sass.watch, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('sass');
    });
    // WATCH JS
    gulp.watch(paths.js.watch, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('js');
    });
    // WATCH IMG
    gulp.watch(paths.img.watch, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('imgopti');
    });
})