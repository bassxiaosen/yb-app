import React, { Component } from 'react'
import { connect } from "react-redux"
import style from "./style.module.less"
class Me extends Component {
  render() {
    const { info } = this.props
    return (
      <div className={style.meWrapper}>
        <div className={style.avatarArea}>
          <div className={style.avatar}>
            {/* 头像区域 */}
          </div>
          <span>{info.yb_realname}</span>
        </div>
        <div className={style.infoArea}>
          <div className={style.infoBox}>
            <p className={style.item}><span>姓名：</span><span className={style.bt}>{info.yb_realname}</span></p>
            {/* <p className={style.item}><span>性别：</span><span className={style.bt}>男</span></p> */}
            <p className={style.item}><span>学院：</span><span className={style.bt}>{info.yb_collegename}</span></p>
            <p className={style.item}><span>专业：</span><span className={style.bt}>{info.yb_classname}</span></p>
            <p className={style.item}><span>学号：</span><span className={style.bt}>{info.yb_studentid}</span></p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  info: state.userInfo
})

const mapDispatchToProps = {
  
}


export default connect(mapStateToProps)(Me)