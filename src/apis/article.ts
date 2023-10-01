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
        url: '/article/getContentByid',
        method: 'post',
        data: {
            cid,
        }
    })
}


export const save = function(cid:number,content:string,tid:number,title:string,digest:string,date:string) {
    return request({
        url: '/article/updateArticle',
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
        url: '/article/deleteArticle',
        method: 'post',
        data: {
            tid,
            cid
        }
    })
}

export const insert = function(content:string,title:string,digest:string,date:string) {
    return request({
        url: '/article/InsertArticle',
        method: 'post',
        data: {
            title,
            digest,
            date,
            content,         
        }
    })
}

export const uploadFile = function(formData:FormData) {
    return request({
        url: '/minio/uploadFile',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data" 
        },
        data: formData,
    })
}