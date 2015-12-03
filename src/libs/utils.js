'use strict'

var _ = require('lodash');


var getCheck = {
    checkEmail: function(val) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    checkPhone: function(val) {
        var filter = /^1\d{10}$/;

        if (filter.test(val)) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 从文本中提取出@username 标记的用户名数组
 * @param {String} text 文本内容
 * @return {Array} 用户名数组
 */
var fetchUsers = function(text) {
    if (!text) {
        return [];
    }

    var ignoreRegexs = [
        /```.+?```/g, // 去除单行的 ```
        /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
        /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
        /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
        /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
        /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
    ];

    ignoreRegexs.forEach(function(ignore_regex) {
        text = text.replace(ignore_regex, '');
    });

    var results = text.match(/@[a-z0-9\-_]+\b/igm);
    var names = [];
    if (results) {
        for (var i = 0, l = results.length; i < l; i++) {
            var s = results[i];
            //remove leading char @
            s = s.slice(1);
            names.push(s);
        }
    }
    names = _.uniq(names);
    return names;
};

/**
 * 根据文本内容，替换为数据库中的数据
 * @param {String} text 文本内容
 * @param {Function} callback 回调函数
 */
var linkUsers = function(text) {
    var users = fetchUsers(text);
    for (var i = 0, l = users.length; i < l; i++) {
        var name = users[i];
        text = text.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](/user/' + name + ')');
    }
    return text;
};

/**
 * 获取相对时间
 * @param  {[Number]} time [description]
 * @return {[String]}      [description]
 */
var timeago = function(time) {
    time = new Date(time)
    var secs = (new Date() - time) / 1000;
    Math.floor(secs);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
        return secs + '秒前';
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + '分钟前';
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + '小时前';
    }
    var weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
        return days + '天前';
    }
    var months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
        return weeks + '周前';
    }
    var years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
        return months + '月前';
    }
    years = Math.floor(years);
    return years + '年前';
}


exports.linkUsers = linkUsers;
exports.fetchUsers = fetchUsers;
exports.getCheck = getCheck;
exports.timeago = timeago;
