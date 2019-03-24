import React, { Component } from 'react'
import style from "./style.module.less"
export default class Me extends Component {
  render() {
    return (
      <div className={style.meWrapper}>
        <div className={style.avatarArea}>
          <div className={style.avatar}>
            {/* 头像区域 */}
          </div>
          <span>蔡宇森</span>
        </div>
        <div className={style.infoArea}>
          <div className={style.infoBox}>
            <p className={style.item}><span>姓名：</span><span className={style.bt}>蔡宇森</span></p>
            <p className={style.item}><span>性别：</span><span className={style.bt}>男</span></p>
            <p className={style.item}><span>专业：</span><span className={style.bt}>计算机科学与技术</span></p>
            <p className={style.item}><span>班级：</span><span className={style.bt}>医工15计算机4</span></p>
            <p className={style.item}><span>学号：</span><span className={style.bt}>2015081004</span></p>
          </div>
        </div>
      </div>
    )
  }
}
