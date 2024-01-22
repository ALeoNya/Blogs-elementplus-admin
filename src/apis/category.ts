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
export const updcatagoryName = function(categoryName:string) {
    return request({
        url: '/article/updCategory',
        method: 'post',
        data: {
            categoryName: categoryName
        }
    })
}