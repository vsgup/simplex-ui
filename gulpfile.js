var gulp = require('gulp'),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

/* paths */
var paths = {
    vendor_scripts:'./src/js/vendor/**/*.js',
    app_scripts:'./src/js/app.js',
    styles:'./src/scss/**/*.scss',
    images:'./src/img/**/*',
    dist:'./dist'
};

/* builtVendorScripts */
gulp.task('builtVendorScripts', function(){

    return gulp
        .src(paths.vendor_scripts)
        .pipe(order(['jquery.js']))
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/js'));

});

/* builtAppScripts */
gulp.task('builtAppScripts', function(){

    return gulp
        .src(paths.app_scripts)
        .pipe(order(['app.js']))
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/js'));

});

/* builtAppStyles */
gulp.task('builtAppStyles', function(){

    return gulp
        .src(paths.styles)
        .pipe(sass({
            errLogToConsole:true
        }))
        .pipe(autoprefixer({
            browsers:['last 2 versions']
        }))
        .pipe(minifycss())
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.dist + '/css'));

});

/* watchFiles */
gulp.task('watchFiles', function(){
    gulp.watch(paths.vendor_scripts, ['builtVendorScripts']);
    gulp.watch(paths.app_scripts, ['builtAppScripts']);
    gulp.watch(paths.styles, ['builtAppStyles']);
});

/* default */
gulp.task('default', ['builtVendorScripts', 'builtAppScripts', 'builtAppStyles', 'watchFiles']);