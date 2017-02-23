const Promise = require('./es6-promise');

function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject });
  });
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject });
  });
}

// function checkSession () {
//   return new Promise((resolve, reject) => {
//     wx.checkSession({
//       success: resolve,
//       fail: reject
//     });
//   });
// }

// function login () {
//   return new Promise((resolve, reject) => {
//     success: resolve,
//     fail: reject
//   });
// }

// function getUserInfo () {
//   return new Promise((resolve, reject) => {
//     success: resolve,
//     fail: reject
//   });
// }

module.exports = { login, getUserInfo };
