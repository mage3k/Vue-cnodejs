var http = require('vue').http

var gateway = 'https://cnodejs.org/api/v1'

exports.login = function(params, success, error) {
  http.post(gateway + '/access_token', params, success).error(error)
}

exports.topic = {
  list: function(params, success, error) {
    http.get(gateway + '/topics', params, success).error(error)
  },
  fetch: function(id, params, success, error) {
    http.get(gateway + '/topic/' + id, params, success).error(error)
  },
  create: function(params, success, error) {
    http.post(gateway + '/topics', params, success).error(error)
  },
  collect: function(params, success, error) {
    http.post(gateway + '/topic/collect', params, success).error(error)
  },
  uncollect: function(params, success, error) {
    http.post(gateway + '/topic/de_collect', params, success).error(error)
  }
}

exports.reply = {
  create: function(topic_id, params, success, error) {
    http.post(gateway + '/topic/' + topic_id + '/replies', params, success).error(error)
  },
  vote: function(reply_id, params, success, error) {
    http.post(gateway + '/reply/' + reply_id + '/ups', params, success).error(error)
  }
}

exports.message = {
  list: function(params, success, error) {
    http.get(gateway + '/messages', params, success).error(error)
  },
  count: function(params, success, error) {
    http.get(gateway + '/message/count', params, success).error(error)
  }
}

exports.user = {
  fetch: function(name, params, success, error) {
    http.get(gateway + '/user/' + name, success).error(error)
  }
}