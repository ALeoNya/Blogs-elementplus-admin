
/**
 * 根据menuList的meta获取status
 * @param menuList 
 * @param status 
 * @returns 
 */
const fromatMenu = (menuList: any,status: any) =>{
    const father = JSON.parse(JSON.stringify(menuList))
    // console.log(status)
    
    if (!status) {
        status = localStorage.getItem('status')  //刷新后丢失pinia存储的status,改为从本地存储中获取
    }
    for (var j = 0; j < father.length; j++) {
        if (!father[j].meta) {
            // console.log(father[j])
            father.splice(j, 1)
            j--;
        }
    }

    for (var j = 0; j < father.length; j++) {  //如果
        if (father[j].meta.status != status) {
            // console.log(father[j])
            father.splice(j, 1)
            j--;
        }
    }

    return father
}  

export default fromatMenu