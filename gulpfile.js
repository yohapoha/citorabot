var gulp,
    file_concat,
    file_if,
    javascript_typescrypt,
    javascript_uglify;

gulp = require('gulp');
file_concat = require('gulp-concat');
file_if = require('gulp-if');
javascript_typescrypt = require('gulp-typescript-compiler');
javascript_uglify = require('gulp-uglify');

gulp.task('default', ['watch', 'ts2js']);

gulp.task('watch', function() {
    gulp.watch('app/ts/*.ts', ['ts2js']);
});
gulp.task('ts2js',function() {
    gulp.src('app/ts/*.ts')
        .pipe(javascript_typescrypt({
            module: '',
            target: 'ES5',
            sourcemap: false,
            logErrors: false
        }))
        .pipe(gulp.dest('app/'));
});