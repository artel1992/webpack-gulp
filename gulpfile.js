const gulp = require('gulp')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpackStream = require('webpack-stream')
const named = require('vinyl-named')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require("gulp-autoprefixer")
const browserSync = require("browser-sync").create()

const paths = {
    buildDirectory: './dist',
    assets: './public/{img,fonts}/*.*',
    styles: './src/styles/**/*.{sass,scss}',
    webpack: ['./src/**/*.*', './public/index.html'],
}

const assetsTask = () =>
    gulp.src([paths.assets])
        .pipe(gulp.dest(paths.buildDirectory))
        .pipe(browserSync.stream())

const sassTask = () =>
    gulp.src(paths.styles)
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(`${paths.buildDirectory}/css`))
        .pipe(browserSync.stream())

const webpackTask = () =>
    gulp.src(paths.webpack)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Webpack',
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(webpackStream(webpackConfig(), webpack))
        .pipe(gulp.dest(paths.buildDirectory))
        .pipe(browserSync.stream())

gulp.task('sass', sassTask)
gulp.task('assets', assetsTask)
gulp.task('webpack', webpackTask)

gulp.task('default', gulp.parallel(webpackTask, assetsTask))

gulp.task('watch', (finish) => {
    browserSync.init({
        server: paths.buildDirectory,
    })
    gulp.watch(paths.webpack, webpackTask).on("change", (paths, stats) => {
        console.log(`File ${paths} changed`)
        // browserSync.reload()

    })
    gulp.watch([paths.assets], gulp.series(assetsTask)).on("change", browserSync.reload)
})

