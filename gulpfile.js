var gulp		=require('gulp'),  				//gulp基础库
    minifycss	=require('gulp-minify-css'),	//css压缩
    concat		=require('gulp-concat'),   		//合并文件
    uglify		=require('gulp-uglify'),   		//js压缩
    rename		=require('gulp-rename'),   		//文件重命名
    jshint		=require('gulp-jshint'),   		//js检查
	del			=require('del'),				//文件删除
    notify		=require('gulp-notify'),   		//提示
    less		=require('gulp-less');			//less编译

gulp.task('clean', function() {
	// 清除指定文件
	return del([
		'./dist/css/*.css',
		'./dist/css/temp/*.css'
	]);
});

//编译less
//在命令行输入gulp less启动此任务
gulp.task('less', function(){
    return gulp.src('./src/**.less') 					// 找到less文件   
		.pipe(less()) 							// 编译为css
        .pipe(gulp.dest('dist/css/temp'))		// 另存为css
})

// 处理css
gulp.task('minify-css', function(){
   return gulp.src('./dist/css/temp/**.css')
       .pipe(concat('index.css'))      					//合并css
       .pipe(gulp.dest('dist/css'))           			//输出 index.css
       .pipe(rename({suffix:'.min'}))         			//重命名
       .pipe(minifycss())                    			//压缩
       .pipe(gulp.dest('dist/css'))            			//输出 index.min.css
});

//在命令行gulp auto启动此任务
gulp.task('auto', function(){    
    gulp.watch('src/**.less', gulp.series('clean', 'less', 'minify-css')) //监听文件修改，当文件修改则执行less任务
})

//使用gulp.task('default')定义默认任务
//在命令行使用gulp启动minify-css任务和auto任务
gulp.task('default', gulp.series('clean', 'less', 'minify-css', 'auto', function(done){
	done();
}))

