import React, {Component} from 'react'
import {Button} from "antd-mobile"
import {connect} from 'react-redux'
import style from "./style.module.less"
import {gethtml5location_fun} from '../../utils/ybapi'
import {Toast} from "antd-mobile"
class Sign extends Component {
    componentDidMount(){
        // gethtml5location_fun()
    }
    handleSign = () => {
        const {dispatch} = this.props
        gethtml5location_fun()
        dispatch({
            type: 'CHANGESIGNSTATUS',
            payload: {
                isSigned: true
            }
        })
    }
    render() {
        /*
            取出redux的值
        */
        const {address, isSigned, sign, match} = this.props
        return (
            <div className={style.signWrapper}>
                {/* <h2
                    style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>课程ID：{match.params.courseId}</h2> */}
                <h2
                    style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>课程名称：C语言程序设计</h2>
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
                <Button  disabled={isSigned} type="primary" onClick={sign}>{isSigned?`已签到`:`签到`}</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({address: state.address, isSigned: state.isSigned})

const mapDispatchToProps = (dispatch,ownProps) => ({
    sign: () => {
        //loading状态阻挡点击穿透
        Toast.loading('签到中。。。请稍后',10)
        gethtml5location_fun()
        // dispatch({
        //     type: 'CHANGESIGNSTATUS',
        //     payload: {
        //         isSigned: true
        //     }
        // })
    }
})
/*
    不传mapDispatchToProps时会将dispatch方法传入给组件
    传入时，mapDIspatchToProps会有两种形式，一种是对象，一种是返回对象的方法
*/
export default connect(mapStateToProps, mapDispatchToProps)(Sign)
