import axios from "axios"
const url = 'http://119.29.121.40:8081'
const lurl = 'http://119.29.121.40:9999'
const vurl = 'http://123.207.1.115:8090'

export async function yappAuth(vq){
    return await axios.get(`${vurl}/yApp`,{params:{verifyString: vq}})
}

export async function yappVerify(access_token){
    return await axios.get(`${vurl}/verifyMe`,{params:{access_token: access_token}})
}

export async function signIn(data) {
    return await axios.post(`${lurl}/attendance/updateAttendance`, data)
}

export async function campusVerify(access_token, student_id) {
    return await axios.get(`${vurl}/campusVerify`, {
        params: {
            access_token,
            verify_value: student_id
        }
    })
}
