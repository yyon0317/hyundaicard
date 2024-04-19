"use strict";
//npm install --save-dev gulp gulp-newer gulp-sass sass gulp-sourcemaps del gulp-autoprefixer gulp-clean-css gulp-rename gulp-concat gulp-uglify gulp-npm-dist browser-sync gulp-file-include gulp-replace

var gulp = require("gulp"),
    newer = require("gulp-newer"),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require("gulp-sourcemaps"),
    // del = require('del'),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    npmdist = require('gulp-npm-dist'),
    browsersync = require("browser-sync"),
    //babel = require('gulp-babel'),
    fileinclude = require('gulp-file-include');
    const replace = require('gulp-replace');
    const del = require('del');//npm install --save-dev del@2


var folder = {
    src: "src/", // source files
    dist: "dist/", // build files
    dist_assets: "dist/assets/", //build assets files
    href : "" // link varble
};

// command line args
var arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;

        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;

        }
    }
    return arg;
})(process.argv);

// cleaning the dist directory
function clean(done) {
    del.sync(folder.dist)
    done();
}

// image processing
function imageMin() {
    var out = folder.dist_assets + "images";
    return gulp
        .src(folder.src + "images/**/*")
        .pipe(newer(out))
        //.pipe(imagemin())
        .pipe(gulp.dest(out))
}

// copy fonts from src folder to dist folder
function fonts() {
    var out = folder.dist_assets + "fonts/";

    return gulp.src([folder.src + "fonts/**/*"]).pipe(gulp.dest(out));
}
function html() {
    var out = folder.dist;

    return gulp
        .src([
            folder.src + "html/**", "!" + folder.src + "html/partials/**"
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(replace(folder.href, ''))
        .pipe(gulp.dest(out));
}

// compile & minify sass
// function css() {
//     return gulp
//         .src([folder.src + "/scss/bui/*.scss"])
//         //.pipe(sourcemaps.init())
//         .pipe(sass()) // scss to css
//         .pipe(
//             autoprefixer({
//                 overrideBrowserslist: ['> 1%']
//             })
//         )
//         .pipe(gulp.dest(folder.dist_assets + "css/"))
//         .pipe(cleanCSS())
//         .pipe(
//             rename({
//                 // rename app.css to icons.min.css
//                 suffix: ".min"
//             })
//         )
//         //.pipe(sourcemaps.write("./")) // source maps for icons.min.css
//         .pipe(gulp.dest(folder.dist_assets + "css/"));
// }
// function cssVendor() {
//     return gulp
//         .src([folder.src + "/scss/bui/**/*.css"])
//         .pipe(gulp.dest(folder.dist_assets + "css/"))
// }

/////////////////////////

// compile & minify sass for 'bui' folder
function cssBui() {
    return gulp
        .src([folder.src + "/scss/bui/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(gulp.dest(folder.dist_assets + "css/bui/")) // 'bui' 폴더에 컴파일된 CSS 파일 추가
        .pipe(cleanCSS())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(folder.dist_assets + "css/bui/"));
}

// compile & minify sass for 'front' folder
function cssFront() {
    return gulp
        .src([folder.src + "/scss/front/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(gulp.dest(folder.dist_assets + "css/front/")) // 'front' 폴더에 컴파일된 CSS 파일 추가
        .pipe(cleanCSS())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(folder.dist_assets + "css/front/"));
}

// function cssVendor() {
//     return gulp
//         .src([folder.src + "/scss/**/*.css"]) // 수정된 부분
//         .pipe(gulp.dest(folder.dist_assets + "css/"));
// }

///////////////////////////////
// js
function jsPages() {
    var out = folder.dist_assets + "js/";

    return gulp.src(folder.src + "js/*.js")
        //.pipe(uglify())
        //.pipe(babel())
        .on("error", function (err) {
            console.log(err.toString());
        })
        .pipe(gulp.dest(out));

}

function jsVendor() {
    var out = folder.dist_assets + "js";

    return gulp.src([
        folder.src + "js/libs/jquery-3.6.0.min.js",
        folder.src + "js/libs/slick.min.js"
    ])
    .on("error", function (err) {
        console.log(err.toString());
    })
    
    .pipe(gulp.dest(out));

}

// live browser loading
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: folder.dist,
            routes: {
                "/assets": folder.dist + 'assets'
            }
        }
    });
    done();
}

function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}

// copy data folder to dist folder
function copyDataFolder() {
    return gulp.src(folder.src + "data/**/*")
        .pipe(gulp.dest(folder.dist + "data/"));
}

// task to compile sass for 'bui' and 'front' folders
gulp.task("compileSass", gulp.parallel(cssBui, cssFront));
// watch all changes
function watchFiles() {
    gulp.watch(folder.src + "html/**", gulp.series(html, reloadBrowserSync));
    gulp.watch(folder.src + "assets/images/**/*", gulp.series(imageMin, reloadBrowserSync));
    gulp.watch(folder.src + "assets/fonts/**/*", gulp.series(fonts,reloadBrowserSync));
    gulp.watch(folder.src + "scss/bui/**/*", gulp.series("compileSass", reloadBrowserSync));
    gulp.watch(folder.src + "scss/front/**/*", gulp.series("compileSass", reloadBrowserSync));
    //gulp.watch(folder.src + "scss/**/*", gulp.series(cssVendor,reloadBrowserSync));
    //gulp.watch(folder.src + "scss/**/*", gulp.series(css,reloadBrowserSync));
    gulp.watch(folder.src + "js/**/*", gulp.series(jsVendor, jsPages,reloadBrowserSync));    
}

// watch all changes
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// default task
gulp.task(
    "default",
    gulp.series(
        html,
        imageMin,
        fonts,
        gulp.parallel(cssBui, cssFront),
        //cssVendor,
        //css,
        jsVendor,
        jsPages,
        copyDataFolder, // 추가
        'watch'
    ),
    function (done) { done(); }
);

// build
gulp.task(
    "build",
    //gulp.series(clean,html,imageMin,fonts,cssVendor,css,jsVendor,jsPages)
    gulp.series(clean,html,imageMin,fonts,gulp.parallel(cssBui, cssFront),jsVendor,jsPages)
);
