export interface Article {
[x: string]: any;
    id: number,
    userId: number,
    categoryId: number,
    articleCover: string,
    articleTitle: string,
    articleAbstract: string,
    articleContent: string,
    isTop: number,
    isFeatured: number,
    isDelete: number,
    status: number,
    type: number,
    password: number,
    originalUrl: number,
    createTime: number,
    updateTime: number
} 