import request from '@/utils/request'

const airHost = '/api'

export function getList(query, page, del, phone, status) {
  if (phone === undefined) {
    phone = ''
  }
  if (status === undefined) {
    status = ''
  }
  return request({
    url: `${airHost}/getlistdetl20?isDel=${del}&page=${page}&user_phone=${phone}&status=${status}`,
    method: 'get',
    params: query
  })
}

export function delAll(data) {
  return request({
    url: `${airHost}/delAll`,
    method: 'post',
    params: data
  })
}

export function updataStatusALl(data) {
  return request({
    url: `${airHost}/updata/status/all`,
    method: 'post',
    params: data
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

export function getTxt(data, id) {
  return request({
    url: `${airHost}/exportTxt`,
    method: 'get',
    params: data
  })
}

export function login(data, name, password) {
  return request({
    url: `${airHost}/login`,
    method: 'get',
    params: data
  })
}

export function getListAll(data, id) {
  return request({
    url: `${airHost}/getList`,
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
