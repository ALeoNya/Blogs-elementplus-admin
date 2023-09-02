import request from "@/util/request";

export const getAllTitle  = function() {
    return request({
        url: '/getAllTitle',
        method: 'get',
    })
}