import React, {Component} from 'react';
import { connect } from "react-redux"
import {NavLink, Route, withRouter} from 'react-router-dom'
import HomePage from "./views/Home"
import MePage from "./views/Me"
import SignPage from "./views/Sign"
import oStyles from "./styles/App.module.less"
import queryString from 'query-string'
import {Toast} from "antd-mobile"
import {yappAuth, yappVerify} from "./api"
import {gethtml5location_fun} from './utils/ybapi'

class App extends Component {
    async componentDidMount(){
      /*
        一旦检测到location中有state参数，即在本考勤系统中所设置的课程id参数，
        即进行跳转到此id下的课程签到页面
      */
      setTimeout(() => {
        gethtml5location_fun()
      }, 50)
      let parsed = queryString.parse(window.location.search)
      let accessToken = ''
      const {verify_request, yb_uid} = parsed
      console.log(JSON.stringify(queryString.parse(window.location.search)))
      // Toast.success(JSON.stringify(parsed),3)
      if(parsed.state){
        this.props.history.push(`sign/${parsed.state}`)
      }
      console.log(verify_request, yb_uid)
      // 获取token
      await yappAuth(verify_request)
      .then(res=>{
        const { visit_oauth: {access_token} } = res.data
        this.props.INITACCTOKEN(access_token)
        accessToken = access_token
        console.log(res)
      })
      .catch(res=>console.error(res))


      // 请求信息
      await yappVerify(accessToken)
      .then(res=>{
        const { info } = res.data
        this.props.INITUSERINFO(info)
        console.log(res)
      })
      .catch(res=>console.error(res))
    }
    render() {
      let styles={
        'link':{
          color: 'rgb(56,197,144)',
        },
        'activeStyle': {
          color: 'rgb(240,96,97)'
        }
      }
        return (
            <div className={oStyles.wrapper}>
              <div className={oStyles.mainContent}>
                <Route path="/" exact component={HomePage}></Route>
                <Route path="/me" component={MePage}></Route>
                <Route path="/sign/:courseId" component={SignPage}></Route>
              </div>
              <nav className={oStyles.navBar}>
                <NavLink to="/" exact activeStyle={styles.activeStyle} style={styles.link}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-home"></use>
                  </svg>
                <span>主页</span>  
                </NavLink>
                <NavLink to="/me" activeStyle={styles.activeStyle} style={styles.link}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-me"></use>
                  </svg>
                <span>个人信息</span>  
                </NavLink>
              </nav>
            </div> 
        );
    }
}

const mapDispatchToProps = dispatch => ({
  getGeolocation: ()=>{
    
  },
  INITACCTOKEN: (token) => {
    console.log(token)
    dispatch({
      type: 'INITTOKEN',
      payload: {
        accToken: token
      }
    })
  },
  INITUSERINFO: (info) => {
    console.log(info)
    dispatch({
      type: 'INITUSERINFO',
      payload: {
        userInfo: info
      }
    })
  }
})

export default withRouter(connect(null, mapDispatchToProps)(App));
