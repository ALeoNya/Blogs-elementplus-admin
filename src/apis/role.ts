import request from "@/util/request";
// 数据传输接口

export interface Role {
    id: number,
    roleName: string,
    isDisable: string,
    createTime: number
}

// 函数方法
export const add = function(role:Role) {
    return request({
        url: '/role/addRole',
        method: 'post',
        data: {
            role: role.roleName,
            isDisable: 0
        }       
    })
}

export const del = function(role:Role) {
    return request({
        url: '/role/delRole',
        method: 'post',
        data: {
            id: role.id
        }       
    })
}

export const getAllRole = function() {
    return request({
        url: '/role/allRole',
        method: 'post',       
    })
}

export const getResourceTree = function(role:Role) {
    return request({
        url: '',
        method: 'post',
        data: {

        }       
    })
}

export const udp = function(role:Role) {
    return request({
        url: '/role/updRole',
        method: 'post',
        data: {
            id: role.id,
            roleName: role.roleName
        }       
    })
}