// load plugins
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    clean = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    wiredep = require('wiredep').stream,
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;
// paths of the project
const path = {
    watch: {
        html: [
            'src/index.html',
            'src/core/directives/**/*.html',
            'src/templates/**/*.html'
        ],
        js: [
            'src/*.js',
            'src/js/**/*.js',
            'src/core/*.js',
            'src/core/constants/constants.js',
            'src/core/directives/**/*.js',
            'src/core/factories/*.js',
            'src/core/filters/*.js',
            'src/core/services/*.js',
            'src/templates/**/*.js'
        ],
        css: 'src/css/*.css',
        scss: 'src/templates/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        bower: 'src/bower_components/**/**/**/*.*'
    },
    build: {
        app: 'build/',
        bower: 'build/app/bower_components/',
        css: 'build/app/css/',
        img: 'build/app/img/',
        fonts: 'build/app/fonts/'
    }
};

// connect from [ build/ ] - check your build before production!
gulp.task('check-control', function () {
    connect.server({
        port: 9000,
        base: 'build',
        open: false
    });

    browserSync.init({
        notify: false,
        port: 8081,
        server: {
            baseDir: [
                'build/app'
            ]
        }
    });
});

// connect with the root development folder
gulp.task('connect', ['watch'], function () {
    connect.server({
        port: 9001,
        base: 'src',
        open: false
    });

    browserSync.init({
        notify: false,
        port: 8080,
        server: {
            baseDir: [
                'src'
            ]
        }
    });
});

// convert scss to css
gulp.task('css', function () {
    return gulp.src(path.watch.scss)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(concatCss('main.css'))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(reload({stream: true}));
});

// watch for changes in scss, html, js
gulp.task('watch', function () {
    gulp.watch(path.watch.html).on('change', reload);
    gulp.watch(path.watch.js).on('change', reload);
    gulp.watch(path.watch.scss, ['css']);
    gulp.watch(path.watch.css);
    gulp.watch('bower.json', ['bower']);
});

// clean folder [build]
gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});

// auto-write bower plugins src into index.html
// <html>
//  <head>
//      <!-- bower:css -->
//      <!-- endbower -->
//  </head>
//  <body>
//      <!-- bower:js -->
//      <!-- endbower -->
//  </body>
// </html>
gulp.task('bower', function () {
    gulp.src('src/index.html')
        .pipe(wiredep({
            directory: "src/bower_components"
        }))
        .pipe(gulp.dest('src'));
});

// build project
gulp.task('build', ['clean'], function () {
    // get main bower files
    gulp.src(path.watch.bower)
        .pipe(gulp.dest(path.build.bower));
    // get html
    gulp.src(path.watch.html, {base: "."})
        .pipe(gulp.dest(path.build.app));
    // get js
    gulp.src(path.watch.js, {base: "."})
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.app));
    // get css
    gulp.src(path.watch.css)
        .pipe(sourcemaps.init())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
    // get img
    gulp.src(path.watch.img)
        .pipe(imagemin({
            progressive: true,
            svgo: {plugins: [{removeViewBox: true}]},
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
    // get fonts
    gulp.src(path.watch.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// start by default
gulp.task('default', ['css', 'bower', 'connect']);