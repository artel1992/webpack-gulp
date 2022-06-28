const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = webpackStream.webpack
const webpackConfig = require('./webpack.config.js')

// gulp.task('build', () => {
//     gulp.src('./src/index.ts')
//         .pipe(webpackStream(webpackConfig), webpack)
//         .pipe(gulp.dest('./dist/js'))
// })
gulp.task('hello', (cb) => {
    console.log('HELLO')
    cb()
})
gulp.task('default', () =>
    gulp.src('./src/**/*.{js|ts}').on('data', (file) => console.log(file)).pipe(
        gulp.dest((file) => file.extname.includes('sass') ? 'dist/css' : 'dist/ts')
    )
)
