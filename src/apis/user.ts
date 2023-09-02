import request from "@/util/request"

export const login = function (username: any, password: string) {
    return request({
        url: '/tologin',
        method: "post",
        data: {
            username,
            password
        }
    })
}
