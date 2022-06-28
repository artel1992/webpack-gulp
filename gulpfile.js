const gulp = require('gulp')
const concat = require('gulp-concat')
const debug = require('gulp-debug')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpackStream = require('webpack-stream')
const named = require('vinyl-named')
const webpack = webpackStream.webpack
const webpackConfig = require('./webpack.config.js')
const sass = require('gulp-sass')(require('sass'));
// gulp.task('build', () => {
//     gulp.src('./src/index.ts')
//         .pipe(webpackStream(webpackConfig), webpack)
//         .pipe(gulp.dest('./dist/js'))
// })
gulp.task('hello', (cb) => {
    console.log('HELLO')
    cb()
})

gulp.task('styles', () =>
    gulp.src(['./public/img/*.*', './src/**/*.*'])
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: 'Webpack',
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(debug({title: 'src'}))
        .pipe(webpackStream(webpackConfig()))
        .pipe(debug({title: 'wp'}))
        .pipe(gulp.dest('./dist-gulp'))
)

gulp.task('default', () =>
    gulp.src('./src/**/*.{js|ts}').on('data', (file) => console.log(file)).pipe(
        gulp.dest((file) => file.extname.includes('sass') ? 'dist/css' : 'dist/ts')
    )
)
gulp.task('wp', () => gulp.src('./src/**/*.*')
)
