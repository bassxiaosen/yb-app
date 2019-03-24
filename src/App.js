import React, {Component} from 'react';
import {NavLink, Route, withRouter} from 'react-router-dom'
import HomePage from "./views/Home"
import MePage from "./views/Me"
import SignPage from "./views/Sign"
import oStyles from "./styles/App.module.less"
import queryString from 'query-string'
import {Toast} from "antd-mobile"
import {yappAuth} from "./api"
class App extends Component {
    componentDidMount(){
      /*
        一旦检测到location中有state参数，即在本考勤系统中所设置的课程id参数，
        即进行跳转到此id下的课程签到页面
      */
      let parsed = queryString.parse(window.location.search)
      const {verify_request, yb_uid} = parsed
      console.log(JSON.stringify(queryString.parse(window.location.search)))
      // Toast.success(JSON.stringify(parsed),3)
      if(parsed.state){
        this.props.history.push(`sign/${parsed.state}`)
      }
      console.log(yb_uid)
      yappAuth(verify_request).then(res=>console.log(res)).catch(res=>console.error(res))
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
    
  }
})

export default withRouter(App);
