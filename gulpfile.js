const gulp = require('gulp');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

// Static Server + watching scss/html files
gulp.task('server', ['sass', 'babel', 'js', 'html', 'img', 'fonts'], function() {

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

gulp.task('babel', () =>
	gulp.src('assets/js/es6.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('assets/js/babel'))
);

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
		// .pipe(uglify({
		// 	sequences     : true,  // join consecutive statemets with the “comma operator”
		// 	properties    : true,  // optimize property access: a["foo"] ? a.foo
		// 	dead_code     : true,  // discard unreachable code
		// 	drop_debugger : true,  // discard “debugger” statements
		// 	unsafe        : false, // some unsafe optimizations (see below)
		// 	conditionals  : true,  // optimize if-s and conditional expressions
		// 	comparisons   : true,  // optimize comparisons
		// 	evaluate      : true,  // evaluate constant expressions
		// 	booleans      : true,  // optimize boolean expressions
		// 	loops         : true,  // optimize loops
		// 	unused        : true,  // drop unused variables/functions
		// 	hoist_funs    : true,  // hoist function declarations
		// 	hoist_vars    : true, // hoist variable declarations
		// 	if_return     : true,  // optimize if-s followed by return/continue
		// 	join_vars     : true,  // join var declarations
		// 	cascade       : true,  // try to cascade `right` into `left` in sequences
		// 	side_effects  : true,  // drop side-effect-free statements
		// 	warnings      : true  // warn about potentially dangerous optimizations/code
		// }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("public/js/"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['server']);