import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space,Input,Row,Col,Radio,Drawer,Button,message} from 'antd';
import {InfoCircleTwoTone} from '@ant-design/icons'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-wordcloud";
import '../css/Searchlist.css'
import '../css/Homepage.css'
import dog from '../image/dog.jpeg'
import Logo from '../image/logo2.jpeg'
import axios from 'axios';
class Searchlist extends React.Component{
    pic_url=[]
    title=[]
    description=[]
    content=[]
    href=[]
    id=[]
    state={
        hot10:[],
        id:0,
        length:0,
        drawer_visible:false,
        pictures:[],
        pet_species:this.props.location.state.pet_species,
        pet_size:this.props.location.state.pet_size,
        min_price:this.props.location.state.min_price,
        max_price:this.props.location.state.max_price,
        country:this.props.location.state.country,
        input:this.props.location.state.input,
        data: Array.from({ length: 3 }).map((_, i) => ({
            href: this.href[i],
            title: this.title[i],
            pic:this.pic_url[i],
            description:this.description[i],
            content:this.content[i], 
            id:this.id[i]
          })),
         option:{
            backgroundColor: "#fff",
            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
            },
            series: [
              {
                shape: 'circle',
                type: "wordCloud",
                gridSize: 1,
                // Text size range which the value in data will be mapped to.
                // Default to have minimum 12px and maximum 60px size.
                sizeRange: [12, 60],
                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,90] by rotationStep 45
                rotationRange: [-45, 0, 45, 90],
                // 呈现形状图片， 可选
                drawOutOfBound: false,
                layoutAnimation: true,
                textStyle: {
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  // Color can be a callback function or a color string
                  color: function () {
                      // Random color
                      return 'rgb(' + [
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160),
                          Math.round(Math.random() * 160)
                      ].join(',') + ')';
                  }
                      },
                      emphasis: {
                          focus: 'self',
                          textStyle: {
                              textShadowBlur: 10,
                              textShadowColor: '#333'
                          }
                      },
                left: "center",
                top: "center",
                right: null,
                bottom: null,
                data: [],
              }
            ]
          }
        
          
    }
      componentWillMount () {
        // this.pic_url=['http://img.ixiupet.com/uploads/150309/2-15030920514b57.jpg','http://img.ixiupet.com/uploads/allimg/150617/3-15061G055460-L.jpg',
        // 'http://img.ixiupet.com/uploads/150410/2-150410144413b3.jpg']
        // this.title=['苏格兰折耳猫','美国恶霸犬','法国斗牛犬']
        // this.description=['美国恶霸犬,别名:美国恶霸犬,分布区域:世界各地,原产地:美国,体型:小型、中型、大型',
        // '美国恶霸犬,别名:美国恶霸犬,分布区域:世界各地,原产地:美国,体型:小型、中型、大型',
        // '美国恶霸犬,别名:美国恶霸犬,分布区域:世界各地,原产地:美国,体型:小型、中型、大型'
        // ]
        // this.content=['苏格兰折耳猫的耳朵竟是整齐地扣在头上，于是很自然地人们在头脑中把它们划到了精灵族的一边，猫猫中的折耳精灵族非它莫属。',
        // '美国恶霸这个犬种创立于90年代中期，以培育成家庭伴侣犬为最终目的。',
        // '法国斗牛犬(FRENCH BULLDOG)是一种活泼、聪明、肌肉发达的狗，骨骼沉重，被毛平滑、结构紧凑，体型中等或较小。']
        // this.href=['https://www.ixiupet.com/mmpz/199/','https://www.ixiupet.com/ggpz/3106/','https://www.ixiupet.com/ggpz/892/']
        // this.id=[244,125,256]
        // this.setState({
          
        //     data: Array.from({ length: 3 }).map((_, i) => ({
        //         href: this.href[i],
        //         title: this.title[i],
        //         pic:this.pic_url[i],
        //         description:this.description[i],
        //         content:this.content[i], 
        //         id:this.id[i]
        //       })),
        // })
        
        
  
        let _this=this
        let data
        let hot10
        if(this.state.input===undefined){
            axios({
                method:'post',
                url:'http://192.168.43.40:8080/homepage_2',
                params:{
                    pet_size:this.state.pet_size,
                    pet_species:this.state.pet_species,
                    min_price:this.state.min_price,
                    max_price:this.state.max_price,
                    country:this.state.country
                }
            })
                .then(function (response) {
                    if (response.status === 200){  
                        data = response.data
                    }
                    else{
                        message.warning('请求错误,请稍后再试', 2)
                    }
                }).then(()=>{
                    data.map((item,index)=>{
                        _this.pic_url.push(item.url)
                        _this.title.push(item.name)
                        _this.id.push(item.id)
                        _this.description.push(item.name+',别名:'+item.nickname+',分布区域:'+item.region+',体型:'+item.shape+',估价:'+item.price)
                        _this.content.push(item.information)
                    })
                }).then(()=>{
                    this.setState({
                        length:data.length,
                        data: Array.from({ length: data.length }).map((_, i) => ({
                            href: this.href[i],
                            title: this.title[i],
                            pic:this.pic_url[i],
                            description:this.description[i],
                            content:this.content[i], 
                          })),
                    })
                }).then(()=>{
                    axios.get('http://192.168.43.40:8080/hot10')
                    .then(function (response){
                        if(response.status===200)
                         hot10 = response.data
                        else
                        message.error('hot10获取失败')
                    })
                .then(()=>{
                    console.log(99999999)
                    console.log(hot10)
                    this.setState({
                        option:{
                            backgroundColor: "#fff",
                            tooltip: {
                              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
                            },
                            series: [
                              {
                                shape: 'circle',
                                type: "wordCloud",
                                gridSize: 1,
                                // Text size range which the value in data will be mapped to.
                                // Default to have minimum 12px and maximum 60px size.
                                sizeRange: [12, 60],
                                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,90] by rotationStep 45
                                rotationRange: [-45, 0, 45, 90],
                                // 呈现形状图片， 可选
                                drawOutOfBound: false,
                                layoutAnimation: true,
                                textStyle: {
                                  fontFamily: 'sans-serif',
                                  fontWeight: 'bold',
                                  // Color can be a callback function or a color string
                                  color: function () {
                                      // Random color
                                      return 'rgb(' + [
                                          Math.round(Math.random() * 160),
                                          Math.round(Math.random() * 160),
                                          Math.round(Math.random() * 160)
                                      ].join(',') + ')';
                                  }
                                      },
                                      emphasis: {
                                          focus: 'self',
                                          textStyle: {
                                              textShadowBlur: 10,
                                              textShadowColor: '#333'
                                          }
                                      },
                                left: "center",
                                top: "center",
                                right: null,
                                bottom: null,
                                data: hot10,
                              }
                            ]
                          }
                    })
                })
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else{
            axios({
                method:'post',
                url:'http://192.168.43.40:8080/homepage_1',
                params:{
                    input:this.state.input
                }
            })
                .then(function (response) {
       
                    if (response.status === 200){
                        data = response.data
                    }
                    else{
                        message.warning('请求错误,请稍后再试', 2)
                    }
                }).then(()=>{
                    data.map((item,index)=>{
                        _this.pic_url.push(item.url)
                        _this.title.push(item.name)
                        _this.id.push(item.id)
                        _this.description.push(item.name+',别名:'+item.nickname+',分布区域:'+item.region+',体型:'+item.shape+',估价:'+item.price)
                        _this.content.push(item.information)
                    })
                }).then(()=>{
                    this.setState({
                        length:data.length,
                        data: Array.from({ length: data.length }).map((_, i) => ({
                            href: _this.href[i],
                            title: _this.title[i],
                            pic:_this.pic_url[i],
                            description:_this.description[i],
                            content:_this.content[i], 
                          })),
                    })
                }).then(()=>{
                    axios.get('http://192.168.43.40:8080/hot10')
                    .then(function (response){
                        if(response.status===200)
                         hot10 = response.data
                        else
                        message.error('hot10获取失败')
                    })
                .then(()=>{
                    console.log(99999999)
                    console.log(hot10)
                    this.setState({
                        option:{
                            backgroundColor: "#fff",
                            tooltip: {
                              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
                            },
                            series: [
                              {
                                shape: 'circle',
                                type: "wordCloud",
                                gridSize: 1,
                                // Text size range which the value in data will be mapped to.
                                // Default to have minimum 12px and maximum 60px size.
                                sizeRange: [12, 60],
                                // Text rotation range and step in degree. Text will be rotated randomly in range [-90,90] by rotationStep 45
                                rotationRange: [-45, 0, 45, 90],
                                // 呈现形状图片， 可选
                                drawOutOfBound: false,
                                layoutAnimation: true,
                                textStyle: {
                                  fontFamily: 'sans-serif',
                                  fontWeight: 'bold',
                                  // Color can be a callback function or a color string
                                  color: function () {
                                      // Random color
                                      return 'rgb(' + [
                                          Math.round(Math.random() * 160),
                                          Math.round(Math.random() * 160),
                                          Math.round(Math.random() * 160)
                                      ].join(',') + ')';
                                  }
                                      },
                                      emphasis: {
                                          focus: 'self',
                                          textStyle: {
                                              textShadowBlur: 10,
                                              textShadowColor: '#333'
                                          }
                                      },
                                left: "center",
                                top: "center",
                                right: null,
                                bottom: null,
                                data: hot10,
                              }
                            ]
                          }
                    })
                })
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
   
    
        
  
}
    handlsubmit = (e) => {
        var string = e.target.value;
        console.log(string);
        
          this.props.history.push({ pathname : '/searchlist' , state : { input : string }})
    
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
      changespecies=(e)=>{
        this.setState({
          pet_species:e.target.value
        })
      }
      changesize=(e)=>{
        this.setState({
          pet_size:e.target.value
        })
      }
      todetail=(e)=>{
          console.log(e.target.id)
            this.setState({
                id:e.target.id
            })
          this.props.history.push({ pathname : '/showpage' , state : { 
            id : e.target.id,
          }})
      }
      

    
       
    

    render(){
        return(
            <div>
                <br/>
                <Row>
                    <Col span={12}>
                    <div>
                    <Row>
                        <Col span={5}>
                            <div className='outlogo'>
                            <img src={Logo} className="logo1"></img>
                            </div>
                        </Col>
                        <Col span={19}>
                        <div className='div3'>
                            <Input  prefix={
                            <div onClick={this.adsearch} className="div5">
                            <a className="div5">范围搜索 &nbsp;|&nbsp;</a>
                        </div>
                 } bordered={false} size="middle" onPressEnter={this.handlsubmit} />
                 </div>
                        </Col>
                    </Row>
                    </div>
                   
                    </Col>
                    <Col span={12}>
                    <div className='infor'>
                        <InfoCircleTwoTone />
                        <span>&nbsp;</span>
                        <a  href='/homepage'>Homepage&nbsp;&nbsp;</a>| 
                        <a>&nbsp;&nbsp;About us</a>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={2}></Col>
                    <Col span={15}>
                    <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={this.state.data}
                    
                    renderItem={(item) => (
                    <List.Item
                        key={item.title}
                       
                        extra={
                        <img
                            width={230}
                            height={160}
                            alt="logo"
                            src={item.pic}
                        />
                        }
                    >
                        <List.Item.Meta
                        
                        title={<a onClick={this.todetail} id={item.id}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
                    </Col>
                    <Col span={7}>
                    <div >
                        <div className='citu'>
                            热搜云词图
                        </div>
                        <br/>  
                        <ReactEcharts option={this.state.option}
                                theme="ThemeStyle"
                                />
                    

                    </div>
                    </Col>
                </Row>
                


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
                    <Radio.Group onChange={this.changespecies} value={this.state.pet_species}>
                        <Radio value={"dog"}>狗狗</Radio>
                        <Radio value={"cat"}>猫猫</Radio>
                    </Radio.Group>
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
                        />
                    </div> 
                    <div >
                    <br/>
                    <span>宠物体型 : </span>&nbsp;&nbsp;&nbsp;
                    <Radio.Group onChange={this.changesize} value={this.state.pet_size}>
                        <Radio value={"small"}>小型</Radio>
                        <Radio value={"medium"}>中型</Radio>
                        <Radio value={"large"}>大型</Radio>
                    </Radio.Group>
                    </div>
                    <div>
                    <br/> <br/> <br/> 
                    <img src={dog} className='dog'></img>
                    </div>
                    
                </Drawer>
            </div>
        )
    }
}
export default Searchlist