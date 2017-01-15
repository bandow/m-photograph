//引入gulp
var gulp = require('gulp'),

//引入组件
borwserSync = require('browser-sync').create(),
reload = borwserSync.reload,
watch = require('gulp-watch'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
sass = require('gulp-sass');
  
//浏览器同步  
// 静态服务器
gulp.task('browser-sync',function(){
	borwserSync.init({
		server:{
		   baseDir:'./dist/'
		}
	});
	//监听所有文件
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/scripts/*.js', ['scripts']);
	gulp.watch('./dist/*.html').on('change',reload);
});

//编译sass
gulp.task('sass',function(){
   return gulp.src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest( './dist/styles' ));
});

//检查脚本
gulp.task('default',function(){
   	return gulp.src('./src/scripts/*.js')
   		.pipe(jshint())
   		.pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
  return gulp.src('./src/scripts/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(rename('all.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/scripts'));
});

// 默认任务
gulp.task('default', function(){
    return gulp.run('browser-sync', 'sass', 'scripts');
});

