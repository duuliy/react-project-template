const Icon = ({ name, size = 16, fill = '#5AD2FF', className, style }) => {
  return <svg width={size} height={size} fill={fill} className={className} style={style}>
    <use xlinkHref={'#' + name} />
  </svg>
}

export default Icon