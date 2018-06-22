const gulp = require('gulp');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('server', ['sass', 'js', 'html', 'img', 'fonts'], function() {

	browserSync.init({
		server: "./public"
	});

	gulp.watch("assets/scss/*.scss", ['sass']);
	gulp.watch("assets/html/*.html", ['html']);
	gulp.watch("assets/img/*.*", ['img']);
	gulp.watch("assets/fonts/*.*", ['fonts']);
	gulp.watch("assets/js/**/*.js", ['js']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("assets/scss/styles.scss")
		.pipe(sass({errLogToConsole: true}))
		.pipe(prefixer({ browsers: ['last 12 versions'] }))
		.pipe(cssmin())
		.pipe(gulp.dest("public/css/"))
		.pipe(browserSync.stream());
});

// Compile html into browsers
gulp.task('html', function() {
	return gulp.src("assets/html/*.html")
		.pipe(gulp.dest("public/"))
		.pipe(browserSync.stream());
});

// Compile img into browsers
gulp.task('img', function() {
	return gulp.src("assets/img/**/*.*")
		.pipe(gulp.dest("public/img/"))
		.pipe(browserSync.stream());
});
gulp.task('fonts', function() {
	return gulp.src("assets/fonts/*.*")
		.pipe(gulp.dest("public/fonts/"))
		.pipe(browserSync.stream());
});

// Compile js auto-inject into browsers
gulp.task('js', function() {
	return gulp.src(
		[
			'assets/js/jquery-3.2.1.min.js',
			'assets/js/siema.min.js',
			'assets/js/main.js',
			'assets/js/babel/es6.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("public/js/"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['server']);