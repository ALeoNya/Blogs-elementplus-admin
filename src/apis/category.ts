import request from "@/util/request";
import type { Category } from '@/pojo/category'

// 所有分类
export const allCategory = function() {
    return request({
        url: '/article/allCategory',
        method: 'post',
    })
}

// 更新catagoryName字段
export const updCatagoryName = function(categoryName:string,id:number) {
    return request({
        url: '/article/updCategory',
        method: 'post',
        data: {
            categoryName: categoryName,
            id: id
        }
    })
}

// 删除catagoryName字段
export const delCatagory = function(id:number, categoryName:string) {
    return request({
        url: '/article/delCategory',
        method: 'post',
        data: {
            categoryName: categoryName,
            id: id
        }
    })
}

// 新增catagoryName字段
export const addCatagory = function(id:number, categoryName:string) {
    return request({
        url: '/article/addCategory',
        method: 'post',
        data: {
            categoryName: categoryName,
            id: id
        }
    })
}
