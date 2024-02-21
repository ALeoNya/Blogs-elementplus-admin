import request from "@/util/request";
import type { Resource } from "@/views/resource/resourceList.vue"

export const allResource = function() {
    return request({
        url: '/resource/allResource',
        method: 'post'
    })
}

export const updResource = function(resource:Resource) {
    console.log(resource.id)
    return request({
        url: '/resource/updResource',
        method: 'post',
        data: {
            id: resource.id,
            resourceName: resource.resourceName,
            url: resource.url,
            requestMethod: resource.requestMethod,
        }
    })
}

export const delResource = function(resource:Resource) {
    return request({
        url: '/resource/delResource',   
        method: 'post',
        data: { 
            id: resource.id
        }
    })
}

export const addResource = function(resource:Resource) {
    return request({
        url: '/resource/addResource',
        method: 'post',
        data: {
            resourceName: resource.resourceName,
            url: resource.url,
            requestMethod: resource.requestMethod,
            isAnonymous: resource.isAnonymous,
            parentId: resource.parentId
        }
    })
}