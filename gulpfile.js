let project_folder = "dist";
let source_folder = "#src";

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },

    src: {
        html: source_folder + "/",
        scss: source_folder + "/scss/",
        js: source_folder + "/js/",
        img: source_folder + "/img/",
        fonts: source_folder + "/fonts/"
    }
};

var gulp = require('gulp');
var minify = require('gulp-clean-css');

function scss() {
    var sass = require('gulp-sass');
    var rename = require('gulp-rename');

    return gulp.src(path.src.scss + "*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.build.css))
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(rename(function(k) {
        k.extname = ".min.css";
    }))
    .pipe(gulp.dest(path.build.css));
}

function html() {
    var fInclude = require('gulp-file-include');
    return gulp.src(path.src.html + 'index.html')
        .pipe(fInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html));
}

exports.scss = scss;
exports.html = html;
exports.default = function() {
        var watch_scss = gulp.watch([path.src.scss + "*.scss"], gulp.series(scss));
        gulp.watch(path.src.html + 'index.html', gulp.series(html));
};