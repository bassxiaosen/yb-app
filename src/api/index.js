import axios from "axios"

export async function verifyIf(yb_uid) {
    const formData = new FormData()
    const config = {headers: { 'Content-Type': 'multipart/form-data',}}
    formData.append('client_id','0ac9a8dfb4fcf79f')
    formData.append('yb_uid', yb_uid)
    return await axios.post('https://openapi.yiban.cn/oauth/token_info', formData, config)
}

export async function yappAuth(vq){
    return await axios.get('http://localhost:8089/yApp',{params:{verifyString: vq}})
}
