var gulp = require('gulp'),
    del = require('gulp-rimraf'),
    copyfile = require('gulp-copy'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    htmlmin = require('gulp-htmlmin'),
    px2rem = require('gulp-px2rem-plugin');
//路径设定
var paths = {
    distRoot: 'dist/',
    srcRoot: 'src/',
    bowerRoot: 'bower_components/'
};
//拷贝资源文件(icon字体)
gulp.task('copy',function(){
    gulp.src(paths.bowerRoot + 'framework7-icons/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(paths.distRoot + 'css'));
    gulp.src(paths.bowerRoot + 'framework7-icons/fonts/*.*')
    .pipe(gulp.dest(paths.distRoot + 'fonts'));
});
//编译less文件
gulp.task('less', function() {
    return gulp.src(paths.srcRoot + 'less/*.less')
        .pipe(less())
        .pipe(
            px2rem({
                'width_design': 640, // width_design：设计稿宽度。默认为640，如果你的屏幕是750的可以直接修改该参数为750即可
                'pieces': 10, // pieces：将整屏切份。默认为10，相当于10rem = width_design(设计稿宽度)
                'valid_num': 6, // valid_num：生成rem后的小数位数。默认值4
                'ignore_px': [1, 2], // ignore_px：让部分px不在转换成rem。默认为空数组
                'ignore_selector': ['.views'] // ignore_selector：让部分选择器不在转换为rem。默认为空数组
            })
        )
        .pipe(gulp.dest(paths.srcRoot + 'css'));
});

//删除dist目录
gulp.task('del', function() {
    return gulp.src(paths.distRoot, { read: false })
        .pipe(del());
});

//图片压缩
gulp.task('minifyimages', function() {
    return gulp.src(paths.srcRoot + 'img/**')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest(paths.distRoot + 'img'));
});

//HTML页面资源打包
gulp.task('usemin', function() {
    return gulp.src(paths.srcRoot + '/*.html')
        .pipe(usemin({
            css: [cssmin],
            js: [uglify],
            copy: [copyfile]
        }))
        .pipe(gulp.dest(paths.distRoot))
});

//打包到dist目录
gulp.task('dist', ['copy', 'less', 'usemin', 'minifyimages'],function(){
    //htmlmin压缩选项
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src(paths.distRoot + '/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest(paths.distRoot));

});
//监控
gulp.task('watch', function() {
    //监控所有.less
    gulp.watch(paths.srcRoot + 'less/*.less', ['less']);
});