import request from "@/util/request"

export const tagList = function() {
    return request({
        url: '/tag/allTag',
        method: 'post',
    })
}

export const updTag = function() {
    return request ({
        url: '',
        method: '',
        data: {

        }
    })
}

export const delTag = function() {
    return request({
        url: '',
        method: '',
        data: {
            
        }
    })
}