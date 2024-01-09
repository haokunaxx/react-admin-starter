module.exports = {
  // 可选类型
  types: [
    {
      value: 'fix',
      name: 'fix: 修复'
    },
    {
      value: 'feat',
      name: 'feat: 新功能'
    },
    {
      value: 'chore',
      name: 'chore: 构建过程或辅助工具的变动'
    },
    {
      value: 'docs',
      name: 'docs: 文档变更'
    },
    {
      value: 'test',
      name: 'test: 增加测试'
    },
    {
      value: 'style',
      name: 'style: 代码格式(不影响代码运行的变动)'
    },
    {
      value: 'refactor',
      name: 'refactor: 重构 (既不增加feature, 也不是修复bug)'
    },
    {
      value: 'perf',
      name: 'perf: 性能优化'
    },
    {
      value: 'optimization',
      name: 'optimization: 其他优化'
    },
    {
      value: 'revert',
      name: 'revert: 回退'
    },
    {
      value: 'build',
      name: 'build: 打包'
    }
  ],

  // 范围
  scopes: [
    { name: 'All' }
  ],

  // 步骤
  messages: {
    type: '请选择提交的类型：',
    scope: '请选择修改的范围',
    customScope: '请输入修改的范围(可选)',
    subject: '请简要描述提交(必填)',
    body: '请输入详细描述(可选)',
    footer: '请输入要关闭的issues(可选)',
    confirmCommit: '确认要使用以上信息提交？(y/n)'
  },
  allowCustomScopes: true,
  // 默认长度72
  subjectLimit: 72
}
