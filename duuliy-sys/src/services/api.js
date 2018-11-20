import request from '../utils/request';

const query=() =>request('get','/api/users');


const AddOrAsync=(data)=> request('post','/api/Organization/AddAsync',data)


const UpdateAsync=(data)=> request('put','/api/Organization/UpdateAsync',data)


const DeleteAsync=(data)=> request('delete','/api/Organization/DeleteAsync',data)


const GetByQueryAsync=(data)=> request('patch','/api/App/GetByQueryAsync',data)

const logoutUser=()=>'/user/login'



export {
	query,
	AddOrAsync,
	UpdateAsync,
    DeleteAsync,
    GetByQueryAsync,
    logoutUser
}