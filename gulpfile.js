const gulp = require('gulp');
const concat = require('gulp-concat');  // gulp-concat 모듈을 호출
const sass = require('gulp-sass')(require('sass')); // gulp-sass 모듈을 호출
const replace = require('gulp-replace');

// sass 컴파일
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')  // scss를 컴파일 할 위치
        .pipe(sass({outputStyle: 'expanded'}).once('error',sass.logError))
        .pipe(gulp.dest('dist/css')) // 컴파일된 파일이 저장될 위치
});

// css 병합
gulp.task('concat', function () {
    return gulp.src([
        'dist/css/reset.css',
        'dist/css/layout.css',
        'dist/css/common.css',
        'dist/css/component.css',
        'dist/css/contents.css',
        'dist/css/responsive.css'
    ])    // concat으로 탐색할 위치
        .pipe(replace('@charset "UTF-8";', ''))
        .pipe(concat('style.css'))      // concat으로 병합할 파일명               
        .pipe(gulp.dest('dist'));   // concat으로 병합된 파일이 저장될 위치        
});

// 실시간 추적
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', gulp.series('sass','concat'));
});

// gulp 구동 시 함께 실행할 기본 모듈
gulp.task('default', gulp.series('sass', 'concat', 'watch' ));