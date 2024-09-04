const gulp = require('gulp');
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();

//sökvägar
const files = {
    htmlPath: 'src/**/*.html',
    cssPath: 'src/**/*.css',
    jsPath: 'src/**/*.js',
    sassPath: 'src/**/*.scss'
}

// HTML-Task, kopiera filer
function copyHTML() {
    return src(files.htmlPath)
    .pipe(dest('pub'))
}

// JS-task, konkatinera, minifiera
function jsTask() {
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('pub/js'));
}

// SASS-task, konvertering och konkatnirering
function sassTask() {
    return src(files.sassPath)
        .pipe(sass().on("error", sass.logError))
        .pipe(concat('main.css'))
        .pipe(dest("pub/css"));
}

function watchTask() {
    browserSync.init({
        server: {
            baseDir: './pub'
        }
        
    });
    gulp.watch('src/**/*.scss').on('change', browserSync.reload);
    gulp.watch('src/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/**/*.css').on('change', browserSync.reload);
    gulp.watch('src/**/*.js',).on('change', browserSync.reload);
    watch(files.sassPath, sassTask);
    watch([files.htmlPath, files.jsPath], parallel(copyHTML, jsTask));
}

exports.default = series(
    sassTask,
    parallel(copyHTML, jsTask),
    watchTask
);