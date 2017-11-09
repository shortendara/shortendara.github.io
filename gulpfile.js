var gulp = require('gulp');
var image_min = require('gulp-imagemin');
var image_resize = require('gulp-image-resize');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
var del = require('del');
var parallel = require('concurrent-transform');
var debug = require('gulp-debug');

var paths = {
	images: './img/portfolio/*.{jpg,png}',
	style: './css/agency.css'
}

gulp.task('clean', () =>{
	return del(['build']);
});

gulp.task('minify-css', ['clean'], () => {
  return gulp.src(paths.style)
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css/'));
});

gulp.task('images', ['clean'],() =>{
	return gulp.src('./img/portfolio/*.{jpg,png,JPG,gif}')
		.pipe(debug())
		.pipe(parallel(
			image_resize({
				width: 150,
				height: 130,
				crop: false
			}))
		)
		.pipe(image_min({optimizationLevel: 5}))
		.pipe(gulp.dest('build/img'));
});

gulp.task('default', ['minify-css', 'images']);

var beautify = require('gulp-beautify');
 
gulp.task('beautify', function() {
  gulp.src('./build/css/agency.css')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('.css/aggency.css'))
});