import request from '@/utils/request'

const airHost = '/api'

export function getList(query, page, del, phone, status) {
  return request({
    url: `${airHost}/getlistdetl20?isDel=${del}&page=${page}&user_phone=${phone}&status=${status}`,
    method: 'get',
    params: query
  })
}

export function updataUserInfo(data) {
  return request({
    url: `${airHost}/updataUserInfo`,
    method: 'post',
    params: data
  })
}

export function getUserInfo(data, id) {
  return request({
    url: `${airHost}/getUserInfo?id=` + id,
    method: 'get',
    params: data
  })
}

//
// export var Api = {
//   common: {
//     addCard: `${airHost}/addcard`, // 添加用户
//     gitListDetl: `${airHost}/getlistdetl?name=`, // 查询指定用户
//     getlist: `${airHost}/getlist` // 获取所有用户
//   }
// }
