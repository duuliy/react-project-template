import { createLogger } from 'redux-logger';
import { message } from 'antd';
export const dva = {
  config: {
    // onAction: createLogger(), //redux数据流转打印
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
