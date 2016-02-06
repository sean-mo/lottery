var gulp   		= require('gulp'),
    concat      = require('gulp-concat'),
    uglify 		= require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    imagemin    = require('gulp-imagemin'),
    include     = require('gulp-file-include'),
    sass        = require('gulp-sass'),
    base64      = require('gulp-base64'),
    browserSync = require('browser-sync');


var projectDir = 'html', sourceDir = projectDir + '/src';

var filesPath = function(fileEx, files){
	var i = 0, len = files.length;
	for(;i<len; i++) files[i] = sourceDir + fileEx + files[i];
	return files;
};

var paths 	= {
	scripts		: filesPath('/js/',       ['jq*.js','*.js']),
	sass   		: filesPath('/sass/', 	  ['*.scss']),
	template    : filesPath('/template/', ['*.html', '**/*.html']),
	images      : filesPath('/images/',   ['*.{png,jpg,gif}']),
	watchSass   : filesPath('/sass/',     ['*.scss', '**/*.scss']),
	base64      : projectDir + '/base64'
};

var	build   = {
	scripts     : projectDir + '/js',
	css     	: projectDir + '/css',
	images  	: projectDir + '/images',
	template	: projectDir,
	base64      : projectDir + '/base64',
	scriptname  : 'app.min.js'
};


// scripts
gulp.task('scripts', function(){
	return gulp.src(paths.scripts)
		   .pipe(concat(build.scriptname))
		   .pipe(gulp.dest(build.scripts));
});

// uglify
gulp.task('minJS', ['scripts'], function(){
	return gulp.src([build.scripts + '/*.js', '!' + build.scripts + '/jq*.js'])
	      .pipe(uglify({ 
	      	  mangle: ['jQuery']
	      }))
		  .pipe(rename(build.scriptname))
		  .pipe(gulp.dest(build.scripts));
});



// sass
gulp.task('sass', function(){
	return gulp.src(paths.sass)
	      .pipe(sass())
	      .pipe(gulp.dest(build.css));
});

// minifyCSS 
gulp.task('minifyCss', ['sass'], function(){
	return gulp.src([build.css + '/*.css', '!' + build.css + '/*.min.css'])
		  .pipe(minifyCss())
		  .pipe(rename({
		  	  suffix: '.min'
		  }))
		  .pipe(gulp.dest(build.css));
});

// images min
gulp.task('imagemin', function(){
	return gulp.src(paths.images)
		  .pipe(imagemin({
		  	   optimizationLevel: 3,
		  	   progressive: true, // jpg
		  	   interlaced : true  // gif
		  }))
		  .pipe(gulp.dest(build.images));
});

// html template
gulp.task('template', function(){
	return gulp.src(paths.template)
	      .pipe(include({
	      	  prefix: '@@',
  			  basepath: '@file'
	      }))
	      .pipe(gulp.dest(build.template))
});

// browserSync
gulp.task('server', function(){
	var files = [
		projectDir +  '/js/*.js', 
		projectDir +  '/css/*.js', 
		projectDir + '*.html'
	];

	 browserSync.init(files, {
	      server: {
	         baseDir: projectDir
	      }
	   });
});

// base64
gulp.task('base64', function(){
	return gulp.src(build.css + '/*.css')
		  .pipe(base64({
		  		baseDir: paths.base64,
		  		extensions: ['svg', 'png', 'jpg', /\.jpg#datauri$/i],
		  		// exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
	            maxImageSize: 8*1024, // bytes
	            debug: true
		  }))
		  .pipe(gulp.dest(build.base64));
});

// watch
gulp.task('watch', function(){
	gulp.watch(paths.scripts,      ['scripts']);
	gulp.watch(paths.watchSass,    ['minifyCss']);
	gulp.watch(paths.template,     ['template']);
	gulp.watch(paths.images,       ['imagemin']);
});