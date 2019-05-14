import React, {Component} from 'react'
import {Button} from "antd-mobile"
import {connect} from 'react-redux'
import style from "./style.module.less"
import {gethtml5location_fun} from '../../utils/ybapi'
import {Toast} from "antd-mobile"
import {yappVerify, signIn, campusVerify} from "../../api/index"


class Sign extends Component {
    componentDidMount(){
        // gethtml5location_fun()
    }
    handleSign = async () => {
        const {dispatch} = this.props
        Toast.loading('签到中。。。请稍后', 10)
        try {
            console.log('签到前位置', this.props.position)

            if (!this.props.position) { // 一开始是空字符串
                Toast.info('获取位置中请稍后重试')
            } else if (this.props.position === null) { // 如果获取不到则为null 代表没开启定位
                Toast.info('请开启地理定位')
                return false
            }
            // 目的是获取学号
            const res = await yappVerify(this.props.token)
            const { info } = res.data
            const campusRes = await campusVerify(this.props.token, info.yb_studentid)
            if (!campusRes.data.info.result) {
                Toast.info('清先完成校方认证')
                return false
            }
            // 拼接签到带参信息
            const data = {
                sectionId: parseInt(this.props.match.params.courseId),
                student: {
                    studentNum: info.yb_studentid
                },
                state: 1
            }
            const signInRes = await signIn(data)
            if (signInRes.data.status === 0) {
                Toast.success(`课程id: ${this.props.match.params.courseId}, 签到成功`)
                dispatch({
                    type: 'CHANGESIGNSTATUS',
                    payload: {
                        isSigned: true
                    }
                })
            } 
            console.log('签到后信息', this.props.position, info)
            // Toast.info('正在获取地理位置')
        } catch(e) {
            console.log(e)
            Toast.info('签到出错请重试')
        }
        // dispatch({
        //     type: 'CHANGESIGNSTATUS',
        //     payload: {
        //         isSigned: true
        //     }
        // })
    }
    render() {
        /*
            取出redux的值
        */
        const {address, isSigned, sign, token, match} = this.props
        return (
            <div className={style.signWrapper}>
                {/* <h2
                    style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>课程ID：{match.params.courseId}</h2>
                <h2
                    style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>课程名称：C语言程序设计</h2> */}
                {/* <h4
                    style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>当前地址：{address}</h4> */}
                {/* <h2
                    style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>是否签到：{isSigned.toString()}</h2> */}
                <Button  disabled={isSigned} type="primary" onClick={this.handleSign}>{isSigned?`已签到`:`签到`}</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({position: state.position, isSigned: state.isSigned, token: state.accToken})

const mapDispatchToProps = (dispatch,ownProps) => ({
    
})
/*
    不传mapDispatchToProps时会将dispatch方法传入给组件
    传入时，mapDIspatchToProps会有两种形式，一种是对象，一种是返回对象的方法
*/
export default connect(mapStateToProps)(Sign)
