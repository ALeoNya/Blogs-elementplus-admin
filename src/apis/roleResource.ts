import request from "@/util/request";
export interface RoleResource {
    id: number,
    roleId: number,
    resourceId: number
}

export const allRoleResource = function() {
    return request({
        url: '',
        method: 'post'
    })
}

export const selResourceByRole = function(roleId:number) {
    return request({
        url: '/roleResource/selAllResourceIdById',
        method: 'post',
        data: {
            roleId: roleId
        }
    })
}
