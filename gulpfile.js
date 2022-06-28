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

const assetsTask = () => gulp.src(['./public/{img,fonts}/*.*']).pipe(gulp.dest('dist-gulp'))
const sassTask = () =>
    gulp.src('./src/styles/**/*.{sass,scss}')
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist-gulp/css'))
const webpackTask = () =>
    gulp.src(['./src/**/*.{js,ts}'])
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Webpack',
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(webpackStream(webpackConfig(), webpack))
        .pipe(gulp.dest('./dist-gulp'))

gulp.task('sass', sassTask)
gulp.task('assets')
gulp.task('webpack', webpackTask)

gulp.task('default', gulp.parallel(webpackTask, sassTask, assetsTask))

