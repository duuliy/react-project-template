export default {
  namespace: 'common',
  state: {
    count: 0,
  },

  effects: {
    *logout({ payload }, { call, put, select }) {},
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
