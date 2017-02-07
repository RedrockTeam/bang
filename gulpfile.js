const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const runSequence = require('run-sequence');
const inquirer = require('inquirer');
const generatePage = require('./utils/generate-page');

const LessFunctions = require('less-plugin-functions');
const lessFunction = new LessFunctions();
const plumber = require('gulp-plumber');
/**
 *  gulpLoadPlugins 自动加载 gulp 相关模块
 *  del 删除文件、文件夹
 *  runSequence 控制任务跑的序列
 *  generatePage 生成小程序页面
 */

const plugins = gulpLoadPlugins();
const env = process.env.NODE_ENV || 'development';
const isProduction = () => env === 'production';
//  加载 gulp 相关插件

function generateFile (options) {
  const files = generatePage({
    root: path.resolve(__dirname, './src/pages/'),
    name: options.pageName,
    less: options.styleType === 'less',
    scss: options.styleType === 'scss',
    css: options.styleType === 'css',
    json: options.needConfig
  });

  files.forEach && files.forEach(file => plugins.util.log('[generate]', file));

  return files;
}

function generateJson (options) {
  const filename = path.resolve(__dirname, 'src/app.json');
  const now = fs.readFileSync(filename, 'utf8');
  const temp = now.split('\n    // Dont remove this comment');

  if (temp.length !== 2) {
    return plugins.util.log('[generate]', 'Append json failed');
  }

  const result = `${temp[0].trim()},
    "pages/${options.pageName}/${options.pageName}"
    // Dont remove this comment
  ${temp[1].trim()}`;

  fs.writeFileSync(filename, result);
}
/**
 *  generateJson
 *  匹配小程序顶层 app.json 里的页面配置
 *  当使用 npm run generate 的时候，自动在 app.json 中添加一条新的页面
 *  注：不要删掉那条作为 flag 的注释
 */

gulp.task('clean', del.bind(null, ['dist/*']));
/**
 *  gulp clean
 *  清除 dist 文件夹
 */

gulp.task('lint', () => {
  return gulp.src(['*.{js,json}', '**/*.{js,json}', '!node_modules/**', '!dist/**', '!**/es6-promise.js', '!utils/**'])
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format('node_modules/eslint-friendly-formatter'))
  .pipe(plugins.eslint.failAfterError());
});

gulp.task('compile:js', () => {
  return gulp.src(['src/**/*.js'])
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.babel())
  .pipe(plugins.if(isProduction, plugins.uglify()))
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
});
//  编译 js

gulp.task('compile:xml', () => {
  return gulp.src(['src/**/*.xml'])
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.if(isProduction, plugins.htmlmin({
    collapseWhitespace: true,
    // collapseBooleanAttributes: true,
    // removeAttributeQuotes: true,
    keepClosingSlash: true, // xml
    removeComments: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
  })))
  .pipe(plugins.rename({ extname: '.wxml' }))
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
});
//  编译 xml 文件并且转化到 wxml 后缀

gulp.task('compile:less', () => {
  return gulp.src(['src/**/*.less'])
  .pipe(plugins.sourcemaps.init())
  .pipe(plumber())
  .pipe(plugins.less({
    plugins: [lessFunction]
  }))
  .pipe(plugins.if(isProduction, plugins.cssnano({ compatibility: '*' })))
  .pipe(plugins.rename({ extname: '.wxss' }))
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
});
//  编译 less 代码

gulp.task('compile:json', () => {
  return gulp.src(['src/**/*.json'])
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.jsonminify())
  .pipe(plugins.sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
});
//  编译 json

gulp.task('compile:img', () => {
  return gulp.src(['src/**/*.{jpg,jpeg,png,gif}'])
  .pipe(plugins.imagemin())
  .pipe(gulp.dest('dist'));
});
//  压图片的

gulp.task('compile', ['clean'], next => {
  runSequence([
    'compile:js',
    'compile:xml',
    'compile:less',
    'compile:json',
    'compile:img'
  ], next);
});
//  总的 编译命令 采用 run sequence 控制执行序列

gulp.task('extras', [], () => {
  return gulp.src([
    'src/**/*.*',
    '!src/**/*.js',
    '!src/**/*.xml',
    '!src/**/*.less',
    '!src/**/*.json',
    '!src/**/*.md',
    '!src/**/*.{jpe?g,png,gif}'
  ])
  .pipe(gulp.dest('dist'));
});
//  打包额外文件

gulp.task('build', ['lint'], next => runSequence(['compile', 'extras'], next));
//  build 打包构建

gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.js', ['compile:js']);
  gulp.watch('src/**/*.xml', ['compile:xml']);
  gulp.watch('src/**/*.less', ['compile:less']);
  gulp.watch('src/**/*.json', ['compile:json']);
  gulp.watch('src/**/*.{jpe?g,png,gif}', ['compile:img']);
});
//  监听文件变动

gulp.task('generate', next => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: 'Input the page name',
      default: 'index'
    },
    {
      type: 'confirm',
      name: 'needConfig',
      message: 'Do you need a configuration file',
      default: false
    },
    {
      type: 'list',
      name: 'styleType',
      message: 'Select a style framework',
      choices: ['less', 'css'],
      default: 'less'
    }
  ])
  .then(options => {
    const res = generateFile(options);
    if (res) {
      generateJson(options);
    }
  })
  .catch(err => {
    throw new plugins.util.PluginError('generate', err);
  });
});
//  generate 新的 page

gulp.task('default', ['watch']);
//  默认任务
