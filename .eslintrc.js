module.exports = {
  'extends': 'standard',
  'plugins': [
    'standard',
    'promise',
    'json'
  ],
  'globals': {
    'App': true,
    'Page': true,
    'getApp': true,
    'wx': true
  },
  'rules': {
      'semi': ['error', 'always'],          // 强制加分号
      'indent': ['error', 2],               // 2个 space 缩进
      'no-tabs': 'error',                   // 强制使用 spaces
      'no-sparse-arrays': 'error',          // 禁止稀疏数组
      'no-mixed-spaces-and-tabs': 'error',  // 禁止混合 tab spaces
      'no-var': 'error',                    // 禁止使用 var
      'space-infix-ops': 'error',           // 操作符两边空格
      'no-trailing-spaces': 'error',        // 禁用行尾空格
      'eqeqeq': 'warn',                     // 要求使用===
      'no-trailing-spaces': 'error',        // 禁止行尾空格
      'no-const-assign': 'error',           // 禁止 const变量赋值
      'quotes': ['error', 'single'],        // 单引号
  }
};
