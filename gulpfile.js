"use strict";

// Import plugins
const gulp = require("gulp"),
    newer = require("gulp-newer"),
    sass = require("gulp-sass")(require("sass")),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    replace = require("gulp-replace"),
    del = require("del");


// Paths
const paths = {
    src: "src/",
    dist: "dist/",
    assets: {
        img: "dist/assets/img/",
        fonts: "dist/assets/fonts/",
        css: "dist/assets/css/",
        js: "dist/assets/js/",
        data: "dist/data/",
    },
    external: {
        swiperCSS: "node_modules/swiper/swiper-bundle.min.css",
        swiperJS: "node_modules/swiper/swiper-bundle.min.js",
        marqueeJS: "node_modules/jquery.marquee/jquery.marquee.min.js",
        gsapJS: "node_modules/gsap/dist/gsap.min.js",
    },
};

// Clean dist directory
function clean() {
    return del(paths.dist);
}

// Process images
function images() {
    return gulp.src(`${paths.src}img/**/*`)
        .pipe(gulp.dest(paths.assets.img)); // dist/assets/img로 복사
}

// Copy fonts
function fonts() {
    return gulp.src(`${paths.src}fonts/**/*`).pipe(gulp.dest(paths.assets.fonts));
}

// Compile HTML
function html() {
    return gulp.src([`${paths.src}*.html`, `${paths.src}html/**/*.html`]) // src 및 html 디렉토리의 모든 .html 파일 선택
        .pipe(fileinclude({ prefix: "@@", basepath: "@file" }))
        .pipe(replace("{href}", ""))
        .pipe(gulp.dest(paths.dist)); // dist 루트로 파일 출력
}

// Compile and minify SCSS
function cssBui() {
    return gulp.src(`${paths.src}scss/bui/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["> 1%"] }))
        .pipe(gulp.dest(`${paths.assets.css}bui/`))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(`${paths.assets.css}bui/`));
}

function cssFront() {
    return gulp.src(`${paths.src}scss/front/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["> 1%"] }))
        .pipe(gulp.dest(`${paths.assets.css}front/`))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(`${paths.assets.css}front/`));
}

// Process JavaScript
function jsPages() {
    return gulp.src(`${paths.src}js/*.js`)
        .pipe(uglify())
        .pipe(gulp.dest(paths.assets.js));
}

function jsVendor() {
    return gulp.src([
        `${paths.src}js/libs/jquery-3.6.0.min.js`,
        `${paths.src}js/libs/slick.min.js`,
    ]).pipe(gulp.dest(paths.assets.js));
}

// Copy external libraries
function externalAssets() {
    // Swiper CSS and JS
    gulp.src(paths.external.swiperCSS)
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.assets.css));

    gulp.src(paths.external.swiperJS)
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.assets.js));

    // GSAP and Marquee JS
    gulp.src(paths.external.gsapJS).pipe(gulp.dest(paths.assets.js));
    return gulp.src(paths.external.marqueeJS).pipe(gulp.dest(paths.assets.js));
}

// Copy data files
function copyData() {
    return gulp.src(`${paths.src}data/**/*.json`).pipe(gulp.dest(paths.assets.data));
}

// BrowserSync
function browserSync(done) {
    browsersync.init({ server: { baseDir: paths.dist } });
    done();
}

function reloadBrowserSync(done) {
    browsersync.reload();
    done();
}

// Watch files
function watchFiles() {
    gulp.watch(`${paths.src}html/**`, gulp.series(html, reloadBrowserSync));
    gulp.watch(`${paths.src}img/**/*`, gulp.series(images, reloadBrowserSync));
    gulp.watch(`${paths.src}fonts/**/*`, gulp.series(fonts, reloadBrowserSync));
    gulp.watch(`${paths.src}scss/bui/**/*`, gulp.series(cssBui, reloadBrowserSync));
    gulp.watch(`${paths.src}scss/front/**/*`, gulp.series(cssFront, reloadBrowserSync));
    gulp.watch(`${paths.src}js/**/*`, gulp.series(jsVendor, jsPages, reloadBrowserSync));
    gulp.watch(`${paths.src}data/**/*.json`, gulp.series(copyData, reloadBrowserSync));
}

// Define tasks
gulp.task("clean", clean);
gulp.task("html", html);
gulp.task("css", gulp.parallel(cssBui, cssFront));
gulp.task("js", gulp.parallel(jsVendor, jsPages));
gulp.task("external", externalAssets);
gulp.task("images", images);
gulp.task("fonts", fonts);
gulp.task("data", copyData);
gulp.task("watch", gulp.parallel(watchFiles, browserSync));
// Default task
gulp.task(
    "default",
    gulp.series(
        clean,
        gulp.parallel(html, cssBui, cssFront, jsVendor, jsPages, images, fonts, copyData, externalAssets),
        "watch"
    )
);

// Build task
gulp.task(
    "build",
    gulp.series(
        clean,
        gulp.parallel(html, cssBui, cssFront, jsVendor, jsPages, images, fonts, copyData, externalAssets)
    )
);