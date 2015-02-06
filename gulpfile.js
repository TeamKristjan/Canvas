var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),    // Takes care of loading all plugins from package.json.
    browserSync = require('browser-sync');

// gulp js
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(plugins.jshint())    // Runs JSHint lint tool.
        .pipe(plugins.jshint.reporter('jshint-stylish'))    // Displays JSHint result nicely.
        .pipe(plugins.uglify())    // Minifies JavaScript
        .pipe(plugins.concat('bundle.min.js'))    // Concatinates JavaScript into one file.
        .pipe(gulp.dest('dist/js'));    // Moves JavaScript files into the dist directory.
});

// gulp dependencies
gulp.task('dependencies', function() {
    gulp.src('bower_components/jquery/dist/*.*')
        .pipe(gulp.dest('dist/lib/'));    // Moves JQuery files into the dist directory.
})

// gulp css
gulp.task('css', function() {
    gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css/'))    // Moves CSS files into the dist directory.
    .pipe(browserSync.reload({stream:true}));    // Updates browser.
});

// gulp html
gulp.task('html', function() {
    gulp.src('src/index.html')
        // Updates HTML document with build files location.
        .pipe(plugins.htmlReplace({
            'dependencies': 'lib/jquery.min.js',
            'js': 'js/bundle.min.js'
        }))
        .pipe(gulp.dest('dist/'));
});

// gulp bump
gulp.task('bump', function() {
    gulp.src('./*.json')
        // Increments 'patch' version number (e.g. 1.1.0 to 1.1.1).
        .pipe(plugins.bump())
        .pipe(gulp.dest('./'));
});

// gulp bump:minor
gulp.task('bump:minor', function() {
    gulp.src('./*.json')
        // Increments 'minor' version number (e.g. 1.1.1 to 1.2.0).
        .pipe(plugins.bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

// gulp bump:major
gulp.task('bump:major', function() {
    gulp.src('./*.json')
        // Increments 'major' version number (e.g. 1.2.0 to 2.0.0).
        .pipe(plugins.bump({type: 'major'}))
        .pipe(gulp.dest('./'));
});

// gulp browser-sync
gulp.task('browser-sync', function() {
    // Runs browser-sync server.
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});

// gulp
// Runs all build tasks and starts BrowserSync server.
gulp.task('default', ['js', 'dependencies', 'css', 'html', 'browser-sync'],
function() {
    // Watches for updates in JS files and reloads the page.
    gulp.watch("src/js/*.js", ['js', browserSync.reload]);
    // Watches for updates in CSS files and updates browser.
    gulp.watch("src/css/*.css", ['css']);
    // Watches for updates in HTML files and reloads the page.
    gulp.watch("src/*.html", ['html', browserSync.reload]);
});