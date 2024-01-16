import request from "@/util/request"

export const login = function (username: string, password: string) {
    return request({
        url: '/user/login',
        method: "post",
        data: {
            username,
            password
        }
    })
}
