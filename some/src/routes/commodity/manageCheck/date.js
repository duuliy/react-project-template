import { DatePicker,LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from "moment";

export default class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
      
    this.setState({
      [field]: value,
    });

    
  }

  onStartChange = (value) => {
    this.props.fatherHandleClick(moment(value).format('YYYY-MM-DD HH:mm:ss'))
    this.onChange('startValue', value);
   
  }

  onEndChange = (value) => {
    this.props.fatherHandleClickend(moment(value).format('YYYY-MM-DD HH:mm:ss'))
    this.onChange('endValue', value);
    
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
        <LocaleProvider locale={zhCN}>
            <div>
                <DatePicker
                disabledDate={this.disabledStartDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={startValue}
                placeholder="选择开始时间"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
                />
                <DatePicker
                disabledDate={this.disabledEndDate}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={endValue}
                placeholder="选择结束时间"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
                />
            </div>
      </LocaleProvider>
    );
  }
}

// ReactDOM.render(<DateRange />, mountNode);