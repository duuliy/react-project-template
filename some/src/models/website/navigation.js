
import { create, remove, update } from '../../services/website/navigation'
import * as navigationService from '../../services/website/navigation'
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { pageModel } from '../common'

const { query,getListData } = navigationService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'navigation',

    state:{
        currentItem: {},
        modalVisible:false,
        alertVisible:false,
        modalType:'create',
        isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',

    },

    subscriptions:{
        setup({dispatch,history}){
            console.log("kanxia")
            console.log(history)
            history.listen((location)=>{
                if(location.pathname ==='/navigation'){
                    const paylod =queryString.parse(location.seach) || {page:1,pageSize:10}
                    dispatch({
                        type:'query',
                        payload:{
                            type:Number(1)
                        },
                    })
                }
            })
        },
    },

    effects:{
        * query ({payload={}},{call,put}){
            const data =yield call(query,payload)
            if(data.status==1){
                yield put({
                    type:'querySuccess',
                    payload:{
                        list:data.obj,
                        type:payload.type,
                    }
                })
            }
        },

        * getListData ({payload},{call,put}){
        if(isNaN(payload.type)){
            payload.type=1
        }
            const data =yield call(getListData,payload)
      
            if(data.status==1){
                yield put({
                    type:'ListData',
                    payload:{
                        list:data.obj,
                        type:payload.type
                    }
                })
            }
        },

        * create ({payload},{call,put}){
        if(isNaN(payload.type)){
            payload.type=1
        }
            const data = yield call(create,payload)
        
            if(data.status==1){
                yield put(
                    {type:"hideModal"}
                )
            }else{
                throw data
            }
        },

        * remove ({payload},{call,put}){
            const data = yield call(remove,payload)
            if(data.status==1){
                yield put(
                    {type:"removeList"}
                )
            }else{
                throw data
            }

        },

        * update ({payload},{call,put}){
         const data = yield call(update,payload)
         if(data.status==1){
            yield put(
                {type:"hideModal"}
            )
            }else{
                throw data
            }
        }

    },


    reducers:{
        ListData(state,{payload}){
            return{...state,...payload}
        },
        showModal (state, { payload }) {
            return { ...state, ...payload, modalVisible: true }
        },
      
        hideModal (state) {
            return { ...state, modalVisible: false }
        },
        removeList(state){
            return { ...state }
        }

    }

})
