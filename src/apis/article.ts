import request from "@/util/request";

export const getAllTitle  = function() {
    return request({
        url: '/getAllTitle',
        method: 'get'
    })
}

export const getContent = function() {
    return request({
        url: '/blog/getContent',
        method: 'get',
        data: {

        }
    })
}