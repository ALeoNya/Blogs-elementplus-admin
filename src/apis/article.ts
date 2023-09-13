import request from "@/util/request";
import exp from "constants";

export const getAllTitle  = function() {
    return request({
        url: '/getAllTitle',
        method: 'get'
    })
}

export const getContent  = function(cid:number) {
    return request({
        url: '/getContentByid',
        method: 'post',
        data: {
            cid,
        }
    })
}


export const save = function(cid:number,content:string,tid:number,title:string,digest:string,date:string) {
    return request({
        url: '/updateTitleContent',
        method: 'post',
        data: {
            cid,
            content,
            tid,
            title,
            digest,
            date
        }
    })
}

export const deleteArticle = function(tid:number,cid:number) {
    return request({
        url: 'deleteArticle',
        method: 'post',
        data: {
            tid,
            cid
        }
    })
}