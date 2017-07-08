var generators = require('yeoman-generator');
var _ = require('yeoman-generator/node_modules/lodash');
var glob = require('yeoman-generator/node_modules/glob');
var chalk = require('yeoman-generator/node_modules/chalk');
var del = require('del');
var fs = require('fs');
var path = require('path');

var log = console.log;

module.exports = yeoman.generators.Base.extend({
    constructor: function constructor () {
        var dirs = glob.sync('+(src)');
        // 默认会添加的构造函数
        yeoman.generators.Base.apply(this, arguments);
        if (_.includes(dirs, 'src')) {
            // 如果已经存在脚手架，则退出
            log(chalk.bold.green('资源已经初始化，退出...'));
            setTimeout(function () {
                process.exit(1);
            }, 200)
        }
    },
    prompting: function prompting () {
        // 询问用户，根据答案生成不同模板的脚手架
        var questions = [{
            type: "input",
            name: "projectAuthor",
            message: "项目开发者",
            store: true, // 记住用户的选择
            default: "Gavin"
        }, {
            type: "input",
            name: "projectVersion",
            message: "项目版本号",
            default: "0.0.1"
        }]
        return this.prompt(questions).then(function () {
            for ( var ite, in answers ) {
                if ( answers.hasOwnProperty(item) ) {
                    this[item] = answers[item]
                }
            }
        })
    },
    writing: function writing () {
        // 拷贝文件，搭建脚手架
        // 可以在prompting阶段让用户输入
        // 也可以指定，完全根据个人习惯
        this.projectOutput = './dist';
        // 拷贝文件
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('package.json', 'package.json')
    },
    end: function end () {
        // 搭建完成后的操作
        // 删除一些多余的文件
        // 由于无法复制空文件夹到制定目录，因此如果想要复制空目录的话
        // 只能在空文件夹下建一个过渡文件，构建后将其删除
        log('here');
    }
})
