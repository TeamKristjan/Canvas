var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('bundle.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', [], function() {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css/'));
});

gulp.task('html', function() {
    gulp.src('src/index.html')
        .pipe(plugins.htmlReplace({
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['js', 'css', 'html']);