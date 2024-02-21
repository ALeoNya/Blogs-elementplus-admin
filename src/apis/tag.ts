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

export const addTag = function(newTagName:string,id:number) {
    return request({
        url: '/tag/addTag',
        method: 'post',
        data: {
            id: id,
            tagName: newTagName 
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