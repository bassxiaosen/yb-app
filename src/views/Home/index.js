import React, {Component} from 'react'
import {Button, WingBlank, Toast} from "antd-mobile"
import  style from "./style.module.less"
import {encode_fun,gethtml5location_fun,mobile_api} from "../../utils/ybapi"
export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    componentDidMount(){
        // console.log(11111)
        // setTimeout(this.handleOnluId,0)
    }
    handleScan=()=>{
        try {
            encode_fun();
        } catch(e) {
            Toast.info('请在易班上使用')
            console.log(e)
        }
    }
    handleGetgeol=()=>{
        try {
            gethtml5location_fun();
        } catch(e) {
            console.log(e)
        }
    }
    handleOnluId=()=>{
        mobile_api({action:'uuid',params:{},callback:'onlyid_back'})
    }
    handleDevice=()=>{
        mobile_api({action:'yiban_device',params:{},callback:'device_back'})
    }

    render() {
        return (
            <div className={style.homeWrapper}>
                <div className={style.buttonGroup}>
                    <WingBlank>
                        <Button type='primary' onClick={this.handleScan} className={style.amButton}>扫码签到</Button>
                        {/* <Button type="primary" onClick={this.handleGetgeol} className={style.amButton}>获取当前地址</Button> */}
                        {/* <Button type="primary" onClick={this.handleOnluId} className={style.amButton}>获取相对唯一标识</Button>
                        <Button type="primary" onClick={this.handleDevice} className={style.amButton}>获取设备信息</Button> */}
                    </WingBlank>
                </div> 
            </div>
        )
    }
}
