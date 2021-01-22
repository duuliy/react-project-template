

export default () => {
  const PrefixCls = 'ErrorPage'
  return (
    <div className={PrefixCls}>
      <div className={`${PrefixCls}-cont`}>
        <h2>您的访问未授权！</h2>
        <p>您可以尝试：刷新页面、联系管理员</p>
      </div>
    </div>
  )
}
