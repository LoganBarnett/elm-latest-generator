var gulp = require('gulp');
var elm  = require('gulp-elm');
var newer = require('gulp-newer');
var browserSync = require('browser-sync');

var sourceDirectory = 'src'
var buildDirectory = 'public'

gulp.task('elm-init', elm.init);

gulp.task('elm', ['elm-init'], function() {
    return gulp.src(sourceDirectory + '/*.elm')
        .pipe(newer(buildDirectory + '/generated/'))
        .pipe(elm())
        .on('error', function(e) { console.error('Error compiling elm', e)})
        .pipe(gulp.dest(buildDirectory + '/generated/'));
});

gulp.task('reload', browserSync.reload);
gulp.task('compile-and-reload', ['elm'], browserSync.reload);

gulp.task('watch', ['elm'], function() {
    browserSync({ server: { baseDir: 'public' }, open: false });

    gulp.watch([sourceDirectory + '/**/*.elm'], ['compile-and-reload']);
    gulp.watch(
        [
            buildDirectory + '/**/*.html',
            buildDirectory + '/**/*.css',
            buildDirectory + '/**/*.js'
        ],
        ['reload']
    );
});

gulp.task('default', ['watch']);
