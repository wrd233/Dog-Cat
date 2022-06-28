import react from "react";
import {Input} from 'antd';
import '../css/Homepage.css'
import 'antd/dist/antd.css';
import {RightOutlined,CrownTwoTone,BarChartOutlined ,GithubOutlined,InfoCircleTwoTone,StarOutlined,ShareAltOutlined } from '@ant-design/icons';
import { Card, Col, Row ,message} from 'antd';
import Logo from '../image/logo.svg'
import axios from "axios";
import { Link, Route, Redirect, Switch } from 'react-router-dom'
class Homepage extends react.Component{
  state = {
    Githublink:"null",
    topproinfor:[
      {
        protitle:"ethereum / EIPs",
        procontent:"",
        star:"",
        share:"",
        githublink:"",
      },
      {
        protitle:"",
        procontent:"",
        star:"",
        share:"",
        githublink:"",
      },
      {
        protitle:"",
        procontent:"",
        star:"",
        share:"",
        githublink:"",
      },
      {
        protitle:"",
        procontent:"",
        star:"",
        share:"",
        githublink:"",
      }
    ]
  }
  componentWillMount () {
    axios.post('/homepage')
      .then(function (response) {
          const data = response.data
          const result = data.status
          if (result === 'success'){
              this.setState({
                topproinfor:data.proinfor,
              })

          }
          else{
              message.warning('请求错误,请稍后再试', 2)
          }
      })
      .catch(function (error) {
          console.log(error);
      });
}
  handlsubmit = (e) => {
    var string = e.target.value;
    console.log(string);
    if(string.startsWith("https://github.com/")){
      console.log("格式正确,即将跳转")
      this.setState({
        Githublink:string
      })
	  this.props.history.push({ pathname : '/index' , state : { Githublink : string }})
      //<Link to={{ pathname: '/StudentCenter/FindCourse', state: { username: this.state.username, psw: this.state.psw, type: this.state.type } }}></Link>
      //window.location.href = '/index';
    }
    else
      message.warning("请输入正确的github地址")
    
  }
  render(){
    return(
      <div className="root">
        <div className="div2" >
          <div className='div5'>
          <InfoCircleTwoTone />
          <span>&nbsp;</span>
          <a>About&nbsp;&nbsp;</a>| 
          <a>&nbsp;&nbsp;Join us</a>
          </div>
        </div>
        <div className="div1">
        <br/><br/><br/>
        <img src={Logo} className="logo"></img>
        <br/><br/>
          <div className="div3">
          <Input  prefix={<RightOutlined />} bordered={false} size="large" onPressEnter={this.handlsubmit}/>
          </div>
        </div>
        <br/><br/><br/><br/><br/>
        <div className="div4">
          <Row gutter={50}>
            <Col span={6}>
              <Card title={this.state.topproinfor[0].protitle}
              actions={[
                <GithubOutlined key="github" />,
                <BarChartOutlined key="more" />,
              ]}
              >
              The Ethereum Improvement Proposal repository
              </Card>
            </Col>
            <Col span={6}>
              <Card title="microsoft / NUWA" 
              actions={[
                <GithubOutlined key="github" />,
                <BarChartOutlined key="more" />,
              ]}
              > 
              A unified 3D Transformer Pipeline for visual synthesis
              </Card>
            </Col>
            <Col span={6}>
              <Card title="kamranahmedse / developer-roadmap"
               actions={[
                <GithubOutlined key="github" />,
                <BarChartOutlined key="more" />,
              ]}
               >
              Roadmap to becoming a web developer in 2021
              </Card>
            </Col>
            <Col span={6}>
              <Card  title="MunGell / awesome-for-beginners"  
              bodyStyle={{padding: 12}}
              actions={[
                <GithubOutlined key="github" />,
                <BarChartOutlined key="more" />,
              ]}
              >
              A list of awesome beginners-friendly projects.
              <br/>
              <div>
                JavaScript
                &nbsp;&nbsp;&nbsp;
                <StarOutlined />
                <span>&nbsp;335,938</span>
                &nbsp;&nbsp;&nbsp;
                <ShareAltOutlined />
                <span>&nbsp;27,379</span>
              </div>
             
              </Card>
            </Col>
          </Row>
        </div>
        <br/><br/>
        <span style={{textAlign:"center",margin:"auto",fontSize:"20px"}}>
        <CrownTwoTone />
        &nbsp;&nbsp;Github Top Projects
        </span>
      </div>
    )
  }
}
export default Homepage;
