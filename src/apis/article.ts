import request from "@/util/request";
import type { Article } from '@/pojo/article'

// 获取所有的文章
export const getAllArticle = function() {
    return request({
        url: '/article/allArticle',
        method: 'post'
    })
}

// 获取所有的假删除文章
export const getAllDelArticle = function() {
    return request({
        url: '/article/allDelArticle',
        method: 'post'
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

// 文章更新
export const save = function(article:Article) {
    return request({
        url: '/article/updArticle',
        method: 'post',
        data: {
            id: article.id,
            articleTitle: article.articleTitle,
            articleAbstract: article.articleAbstract,
            articleContent: article.articleContent,
            isDelete: article.isDelete
        }
    })  
}

// 假删除
export const fakeDelArticle = function(article:Article) {
    return request({
        url: '/article/fakeDelArticle',
        method: 'post',
        data: {
            id: article.id
        }
    })
}

// 真删除
export const deleteArticle = function(article:Article) {
    return request({
        url: '/article/delArticle',
        method: 'post',
        data: {
            id: article.id
        }
    })
}

// 假删除恢复
export const recoverArticle = function(article:Article) {
    return request({
        url: '/article/recoverArticle',
        method: 'post',
        data: {
            id: article.id
        }
    })
}

export const insert = function(article: Article) {
    console.log(article)
    return request({
        url: '/addArticle',
        method: 'post',
        data: {
            userId: article.userId,
            articleTitle: article.articleTitle,
            articleAbstract: article.articleAbstract,
            articleContent: article.articleContent  
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