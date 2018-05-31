import modelExtend from 'dva-model-extend'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {

  state: {
    list: [],
    ldsjList:[],
    status:'',
    pagination: {
      // showSizeChanger: true,
      // showQuickJumper: true,
      showTotal: total => `总共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { list,status, pagination,ldsjList } = payload
      return {
        ...state,
        list,
        status,
        ldsjList,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
        
      }
    },
  },

})


module.exports = {
  model,
  pageModel,
}
