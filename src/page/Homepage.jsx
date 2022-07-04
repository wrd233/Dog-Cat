import react from "react";
import {Input,Divider,Button,Radio,Checkbox} from 'antd';
import '../css/Homepage.css'
import 'antd/dist/antd.css';
import { SearchOutlined,PlusOutlined } from '@ant-design/icons';
import {RightOutlined,CrownTwoTone,BarChartOutlined ,GithubOutlined,InfoCircleTwoTone,StarOutlined,ShareAltOutlined } from '@ant-design/icons';
import { Card, Col, Row ,message,Drawer,DatePicker,Form,Select,Space} from 'antd';
import Logo from '../image/logo2.jpeg'
import Font from '../image/font.png'
import rank1 from '../image/1_blue.svg'
import rank2 from '../image/2.svg'
import rank3 from '../image/3.svg'
import dog from '../image/dog.jpeg'
import axios from "axios";
import { useState } from 'react';
import { Collapse } from 'antd';

import { Link, Route, Redirect, Switch } from 'react-router-dom'
const { Panel } = Collapse;
const { Option } = Select;
class Homepage extends react.Component{
 
  rank=[rank1,rank2,rank3]
  list=[]
  state = {
    drawer_visible:false,
    input:"",
    pet_species:1,
    pet_size:4,
    min_price:0,
    max_price:100000,
    country:"中国",
    url:[],
    nickname:[],
    price:[],
    list1:[
      {
        id:0,
        name:'dog',
        nickname:'dog1',
        price:'3',
        url:'https://img.ixiupet.com/uploads/150403/2-150403152450K3.jpg',
      },
      {
        id:'',
        name:'dog',
        url:'https://img.ixiupet.com/uploads/150403/2-150403152450K3.jpg',
        nickname:'dog2',
        price:4,
      },
      {
        id:'',
        name:'dog',
        url:'https://img.ixiupet.com/uploads/150403/2-150403152450K3.jpg',
        
      
        nickname:'dog2',
        price:4,
      },
      {
        id:'',
        name:'cat',
        url:'https://img.ixiupet.com/uploads/150403/2-150403152450K3.jpg',
        
      
        nickname:'cat1',
        price:3,
      },
      {
        id:'',
        name:'cat',
        url:'https://img.ixiupet.com/uploads/150403/2-150403152450K3.jpg',
        
     
        nickname:'cat2',
        price:4,
      },
      {
        id:'',
        name:'cat',
        url:'https://img.ixiupet.com/uploads/150403/2-150403152450K3.jpg',
       
 
        nickname:'cat2',
        price:4,
      }
    ],
    
  }
  
  plainOptions = ['狗狗', '猫猫'];
  plainOptions1 = ['小型', '中型','大型'];
  componentWillMount () {
    let data
     axios.get('http://192.168.43.40:8080/homepage_0')
      .then(function (response) {
        // console.log(response)
          if (response.status === 200){
            data=response.data
          }
          else{
              message.warning('请求错误,请稍后再试', 2)
          }
      }).then(()=>{
        this.setState({
          list1:data
        })
      //   console.log(111111)
      //   console.log(111111)
      //  console.log(this.state.list1)
      })
      .catch(function (error) {
          console.log(error);
      });
    
  
      
}
  handlsubmit = (e) => {
    var string = e.target.value;
    console.log(string);
    
	  this.props.history.push({ pathname : '/searchlist' , state : { 
      input : string ,
    }})
  }
  handlsubmit1=(e)=>{
    this.setState({
      input:''
    })
    this.props.history.push({ pathname : '/searchlist' , state : { 
      pet_size :  this.state.pet_size,
      pet_species:this.state.pet_species,
      min_price:this.state.min_price,
      max_price:this.state.max_price
    }})
  }
  adsearch=(e)=>{
    this.setState({
      drawer_visible:true
    })
  }
  onClose=(e)=>{
    this.setState({
      drawer_visible:false
    })
  }
  changespecies=(checkedValues) => {
    console.log('checked = ', checkedValues);
    if(checkedValues.includes('猫猫')&&checkedValues.includes('狗狗'))
      this.setState({
        pet_species:2
      })
    else if (checkedValues.includes('猫猫'))
    this.setState({
      pet_species:0
    })
    else if (checkedValues.includes('狗狗'))
    this.setState({
      pet_species:1
    })
    else if(!checkedValues.includes('猫猫')&&!checkedValues.includes('狗狗'))
    this.setState({
      pet_species:2
    })
  };
  changesize=(checkedValues) => {
    console.log('checked = ', checkedValues);
    if(checkedValues.includes('小型')&&checkedValues.includes('中型')&&checkedValues.includes('大型'))
      this.setState({
        pet_size:7
      })
    else if (checkedValues.includes('小型')&&checkedValues.includes('中型'))
    this.setState({
      pet_size:6
    })
    else if (checkedValues.includes('小型')&&checkedValues.includes('大型'))
    this.setState({
      pet_size:5
    })
    else if (checkedValues.includes('中型')&&checkedValues.includes('大型'))
    this.setState({
      pet_size:3
    })
    else if (checkedValues.includes('中型'))
    this.setState({
      pet_size:2
    })
    else if (checkedValues.includes('小型'))
    this.setState({
      pet_size:4
    })
    else if (checkedValues.includes('大型'))
    this.setState({
      pet_size:1
    })
    else{
      this.setState({
        pet_size:7
      })
    }
  };
  minichange=(e)=>{
    console.log(e.target.value)
    this.setState({
      min_price:e.target.value
    })
  }
  maxchange=(e)=>{
    console.log(e.target.value)
    this.setState({
      max_price:e.target.value
    })
  }
  changecountry=(e)=>{
    console.log(e.target.value)
    this.setState({
      country:e.target.value
    })
  }
 
  
  render(){
    return(

      
      <div className="root">
        <Drawer
        title="范围搜索"
        width={400}
        onClose={this.onClose}
        visible={this.state.drawer_visible}
        bodyStyle={{
          paddingBottom: 40,
        }}
        extra={
          <Space>
            <Button onClick={this.onClose}>Cancel</Button>
            <Button onClick={this.handlsubmit1} type="primary">
              Search
            </Button>
          </Space>
        }
      >
        <div >
          <span>宠物类别 : </span>&nbsp;&nbsp;&nbsp;
          <Checkbox.Group options={this.plainOptions} defaultValue={['狗狗']} onChange={this.changespecies} />
          
        </div>
        <br/>
        <div >
          <Input.Group compact>
          价格区间(元) :  &nbsp;&nbsp;&nbsp;
              <Input
                style={{
                  width: 100,
                  textAlign: 'center',
                  height:25
                }}
                placeholder="Minimum"
                onChange={this.minichange}
              />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                  height:25
                }}
                placeholder="~"
                disabled
              />
              <Input
                className="site-input-right"
                style={{
                  width: 100,
                  textAlign: 'center',
                  height:25
                }}
                placeholder="Maximum"
                onChange={this.maxchange}
              />
            </Input.Group>
          <br/>
        </div>
        <div>
          所属国家 :&nbsp;&nbsp;&nbsp;
        <Input
                style={{
                  width: 150,
                  textAlign: 'center',
                  height:25
                }}
                placeholder="中国"
                onChange={this.changecountry}
              />
        </div> 
        <div >
          <br/>
          <span>宠物体型 : </span>&nbsp;&nbsp;&nbsp;
          <Checkbox.Group options={this.plainOptions1} defaultValue={['小型']} onChange={this.changesize} />
        </div>
        <div>
          <br/> <br/> <br/> 
        <img src={dog} className='dog'></img>
        </div>
        
      </Drawer>



        <br></br>
        <div className="div1">
        <br/><br/>
        <img src={Logo} className="logo"></img>
        <img src={Font} className="font"></img>
        <br/>
          <div className="div3">
          <Input  prefix={
            <div onClick={this.adsearch} className="div5">
              <a className="div5">范围搜索 &nbsp;|&nbsp;</a>
            </div>
          } bordered={false} size="large" onPressEnter={this.handlsubmit}/>
          
          </div>
          {/* <Button type="primary" shape="round" icon={<SearchOutlined />}>
            Search
          </Button> */}
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
        <div className="div4">
          <Row gutter={50}>
            <Col span={12}>
            <Divider orientation="left">热门狗狗</Divider>
            <Collapse accordion>
              {
                this.state.list1.map((item,index)=>{
                  console.log(this.state.list1)
                  if(index<3){
                  return <Panel showArrow={false} header={
                    <span>
                      <img src={this.rank[index]} className="rank1"></img>
                      &nbsp; &nbsp;
                      {item.name}
                    </span>} 
                    key={index}>
                      <div >
                        <Row>
                          <Col span={6}>
                          <img src={item.url} className="p"/>
                          </Col>
                          <Col span={18} >
                            <div className="font1">别名:{item.nickname}</div>
                        <br/>
                        估价:{item.price}
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  }
                })
              }
             
            </Collapse>
            </Col>
            <Col span={12}>
            <Divider orientation="left">热门猫猫</Divider>
            <Collapse accordion>
              {
                this.state.list1.map((item,index)=>{
                  if(index>2){
                  return <Panel showArrow={false} header={
                    <span>
                      <img src={this.rank[index-3]} className="rank1"></img>
                      &nbsp; &nbsp;
                      {item.name}
                    </span>} 
                    key={index}>
                      <div >
                        <Row>
                          <Col span={6}>
                          <img src={item.url} className="p"/>
                          </Col>
                          <Col span={18} >
                            <div className="font1">别名:{item.nickname}</div>
                        <br/>
                        估价:{item.price}
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  }
                })
              }
             
            </Collapse>
            </Col>
            
            
          </Row>
        </div>
        <br/><br/>
        
      </div>
    )
  }
}
export default Homepage;
