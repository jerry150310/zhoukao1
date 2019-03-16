const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const concat = require("gulp-concat");
const minCss = require("gulp-clean-css");

const uglify = require("gulp-uglify");

const minHtml = require("gulp-htmlmin");

const webserver = require("gulp-webserver");

//css
gulp.task("devCss", () => {
        return gulp.src("./src/scss/*.scss")
            .pipe(gulpSass())
            .pipe(minCss())
            .pipe(gulp.dest("./build/css"))
    })
    //js
gulp.task("devJs", () => {
        return gulp.src("./src/js/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("./build/js"))
    })
    //html
gulp.task("devHtml", () => {
        return gulp.src("./src/*.html")
            .pipe(minHtml({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest("./build"));
    })
    //watch监听事件
gulp.task("watch", () => {
        gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
        gulp.watch("./src/js/*.js", gulp.series("devJs"))
        gulp.watch("./src/*.html", gulp.series("devHtml"))
    })
    //服务器
gulp.task("server", () => {
    gulp.src("./src")
        .pipe(webserver({
            port: 9999,
            livereload: true,
            middleware: (req, res, next) => {
                res.end("");
            }
        }))
})
gulp.task("go", gulp.parallel("watch", "server"))