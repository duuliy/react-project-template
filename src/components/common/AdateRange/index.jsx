import { PureComponent } from 'react'
import { DatePicker, message } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

import './style.less'

/**
 * 注意： 如果需要重置时，需传递 resetKey 随机值
 * @param onChange{Function} 时间改变回调事件
 * @param initialValue{Array} 默认时间
 * @param limit{Number} 起始日期间隔大小，不传限定
 * @param fullRequest{Boolean} 是否需要选择2个时间才会触发 onChange
 * @param future{Boolean} 是可以选择未来时间
 * @param recentlyDay{Number} 只能选择最近多少天
 * @param todayUsable{Boolean} 是否可以选择今天
 * @param disabledRange{Array} [ Boolean, Boolean] 禁用， 不可操作
 */
export default class AdateRange extends PureComponent {
  constructor(props) {
    super(props)
    const { initialValue, onChange } = props
    const [startValue, endValue] = initialValue || [null, null]
    this.state = {
      PrefixCls: 'AdateRange',
      values: [startValue, endValue],
    }
    // 初始化值，传递给父级
    const range = !startValue && !endValue ? undefined : [startValue, endValue]
    if (range) {
      onChange && onChange(range)
    }
    this.preRestKey = props.resetKey
    this.nextResetKey = props.resetKey
  }
  static defaultProps = {
    fullRequest: false, // 是否必须两个选择完成才会发生请求
    future: false, // 是可以选择未来时间
    todayUsable: true, // 是否可以选择今天
    disabledRange: [false, false], // 禁用， 不可操作
    // limit: 12 // 限制起始之间的间隔天数
  }
  static propTypes = {
    limit: PropTypes.number,
    onChange: PropTypes.func,
    initialValue: PropTypes.array,
    disabledRange: PropTypes.array,
    fullRequest: PropTypes.bool,
    todayUsable: PropTypes.bool,
    recentlyDay: PropTypes.number,
    future: PropTypes.bool,
  }

  // 禁止选择的月份
  disabledDate = (type, current) => {
    const { values } = this.state
    const { future, recentlyDay, todayUsable } = this.props
    // 禁用未来时间
    const isAfter = moment(current.format('YYYY-MM-DD') + ' 00:00:00').isAfter(moment(moment().format('YYYY-MM-DD') + ' 00:00:00'))
    if (isAfter && !future) {
      return isAfter
    }
    // 禁用当天时间
    const isToday = current.isSame(moment(), 'day')
    if (isToday && !todayUsable) {
      return isToday
    }
    // 如果有recentlyDay（最近多少天），这recentlyDay之前都被禁用
    let recentlyDayDisabled = false
    if (typeof recentlyDay === 'number') {
      const now = moment(moment().format('YYYY-MM-DD') + ' 00:00:00').valueOf()
      const cur = moment(current.format('YYYY-MM-DD') + ' 00:00:00').valueOf()
      // 是否在近期多少天内
      recentlyDayDisabled = cur < now - (recentlyDay - 1) * 24 * 60 * 60 * 1000
    }
    if (type === 'start') {
      // 不能选择比结束日期还晚的时间,同一天可选
      return values[1] ? (current.isSame(values[1], 'day') ? false : current.isAfter(values[1]) || recentlyDayDisabled) : recentlyDayDisabled || false
    } else {
      // 不能选择比开始日期还早的时间,同一天可选
      return values[0] ? (current.isSame(values[0], 'day') ? false : current.isBefore(values[0]) || recentlyDayDisabled) : recentlyDayDisabled || false
    }
  }
  /**
   * 选择事件
   * @param type 选择的是起始类型  start:开始  end: 结束
   * @param date 选择的时间，moment对象
   */
  onChange = (type, date) => {
    //fullRequest 两个都必须选择才会发生change事件
    const { fullRequest, onChange, future } = this.props
    // 设置为全部选择完在触发时
    const { values } = this.state
    const { limit } = this.props
    date = date ? moment(date.valueOf()) : date
    const range = [...values]
    if (type === 'start') {
      if (date) {
        range[0] = moment(date.format('YYYY-MM-DD') + ' 00:00:00')
      } else {
        range[0] = date
      }
    } else {
      if (date) {
        // 未来时间时，则给出当前时间
        // 当天
        const now = moment(moment().format('YYYY-MM-DD'))
        // 选择的日期
        const _date = moment(date.format('YYYY-MM-DD'))
        // 选择过去的日期
        if (_date.valueOf() < now.valueOf()) {
          const yearAndMonth = date.format('YYYY-MM')
          // date 日期的月份的最后一天
          const lastDay = date.endOf('day').format('DD')
          range[1] = moment(yearAndMonth + '-' + lastDay + ' 23:59:59')
        } else {
          if (future) {
            // 允许选择未来时间
            range[1] = moment(date.format('YYYY-MM-DD') + ' 23:59:59')
          } else {
            range[1] = moment()
          }
        }
      } else {
        range[1] = date
      }
    }
    this.setState({ values: range })
    // 判断结束时间不能早于开始时间
    if (range.filter(e => e).length === 2) {
      const startIsAfterEnd = range[0].isAfter(range[1])
      if (startIsAfterEnd) {
        message.info('结束日期不能早于开始日期')
        return
      }
      // 结束日期与开始日期间隔不能大于 limit 天
      const end = moment(range[1].valueOf()).subtract(limit, 'day')
      if (typeof limit !== 'undefined') {
        if (end > range[0]) {
          message.info(`起始日期不能超过${limit}天`)
          return
        }
      }
    }

    // 设置必须都选都选择时，才会触发change事件
    if (fullRequest) {
      const hasEmpty = range.filter(e => !e).length
      if (!hasEmpty) {
        onChange && onChange(range)
      } else {
        // message.info('请选择完整的查询日期')
      }
    } else {
      // 只要选择任意一个都会触发change事件
      // let _range = range.filter((e)=>e)
      // _range = _range.length === range ? range : _range
      onChange && onChange(range)
    }
  }
  render() {
    const { format = 'YYYY-MM-DD', style, placeholder = ['请选择开始日期', '请选择结束日期'], itemStyle, allowClear, disabledRange } = this.props
    const obj = { allowClear }
    const {
      values: [startValue, endValue],
    } = this.state
    // 重置时
    if (this.preRestKey !== this.nextResetKey) {
      // obj.value = null
      this.preRestKey = this.nextResetKey
      // this.setState({ values: [] })
    }
    let disabledArr = []
    if (disabledRange && disabledRange.length) {
      disabledArr = disabledRange
    }
    return (
      <div className="daterange-custom" style={{ ...style }} key={this.nextResetKey}>
        <DatePicker
          getCalendarContainer={triggerNode => triggerNode.parentNode}
          disabled={disabledArr[0]}
          {...obj}
          value={startValue}
          format={format}
          placeholder={placeholder[0]}
          style={{ ...itemStyle }}
          disabledDate={date => {
            return this.disabledDate('start', date)
          }}
          onChange={date => {
            this.onChange('start', date)
          }}
        />
        <span className="split">-</span>
        <DatePicker
          className="end-time"
          getCalendarContainer={triggerNode => triggerNode.parentNode}
          disabled={disabledArr[1]}
          {...obj}
          value={endValue}
          format={format}
          placeholder={placeholder[1]}
          style={{ ...itemStyle }}
          disabledDate={date => {
            return this.disabledDate('end', date)
          }}
          onChange={date => {
            this.onChange('end', date)
          }}
        />
      </div>
    )
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value.length) {
      const values = [...(nextProps.value || [null, null])]
      //重置初始化日期
      this.setState({ values })
    }
    if (nextProps.resetKey && this.nextResetKey !== nextProps.resetKey) {
      this.nextResetKey = nextProps.resetKey
      const { onChange } = this.props
      const values = [...(nextProps.initialValue || [null, null])]
      //重置初始化日期
      this.setState({ values })
      onChange && onChange([...values])
    }
  }
}
