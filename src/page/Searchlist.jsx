import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space,Input,Row,Col,Radio,Drawer,Button,message,Checkbox} from 'antd';
import {InfoCircleTwoTone} from '@ant-design/icons'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import "echarts-wordcloud";
import '../css/Searchlist.css'
import '../css/Homepage.css'
import dog from '../image/dog.jpeg'
import Logo from '../image/logo2.jpeg'
import axios from 'axios';
import cookie from 'react-cookies';
class Searchlist extends React.Component{
    pic_url=[]
    title=[]
    description=[]
    content=[]
    href=[]
    id=[]
    url=[]

  plainOptions = ['狗狗', '猫猫'];
  plainOptions1 = ['小型', '中型','大型'];
    state={
        id:0,
        length:0,
        drawer_visible:false,
        pet_species:this.props.location.state.pet_species,
        pet_size:this.props.location.state.pet_size,
        min_price:this.props.location.state.min_price,
        max_price:this.props.location.state.max_price,
        country:this.props.location.state.country,
        input:this.props.location.state.input,
        data: 
        Array.from({ length: 3 }).map((_, i) => ({
            href: this.href[i],
            title: this.title[i],
            pic:this.pic_url[i],
            description:this.description[i],
            content:this.content[i], 
            id:this.id[i],
            url:this.url[i]
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
        this.pic_url=JSON.parse(localStorage.getItem("pic_url"));
        this.title=JSON.parse(localStorage.getItem("title"));
        this.id=JSON.parse(localStorage.getItem("id"));
        this.description=JSON.parse(localStorage.getItem("description"));
        this.url=JSON.parse(localStorage.getItem("url"));
        this.content=JSON.parse(localStorage.getItem("content"));
        let hot =JSON.parse(localStorage.getItem("hot10"));
        console.log(this.pic_url.length)
        if(this.pic_url.length!==0){
            console.log('已经从cookie读入数据了,不用再请求')
            this.setState({
                length:this.pic_url.length,
                data: Array.from({ length: this.pic_url.length }).map((_, i) => ({
                    href: this.href[i],
                    title: this.title[i],
                    pic:this.pic_url[i],
                    description:this.description[i],
                    content:this.content[i], 
                    url:this.url[i]
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
                            data: hot,
                          }
                        ]
                      }
                
            })
        }
        else{
        console.log(this.state)
        let _this=this
        let data
        let hot10
        let outdata
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
                    localStorage.setItem("pic_url",JSON.stringify(this.pic_url));
                    localStorage.setItem("title",JSON.stringify(this.title));
                    localStorage.setItem("id",JSON.stringify(this.id));
                    localStorage.setItem("description",JSON.stringify(this.description));
                    localStorage.setItem("content",JSON.stringify(this.content));
                    
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
                    localStorage.setItem("hot10",JSON.stringify(hot10));
                    console.log('hot10')
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
                        _this.url.push("")
                    })
                }).then(()=>{
                    console.log('test')
                    console.log(data)
                    console.log(this.pic_url)
                    this.setState({
                        length:data.length,
                        data: Array.from({ length: data.length }).map((_, i) => ({
                            href: _this.href[i],
                            title: _this.title[i],
                            pic:_this.pic_url[i],
                            description:_this.description[i],
                            content:_this.content[i], 
                            url:_this.url[i],
                          })),
                    })
                }).then(()=>{
                   
                    axios({
                        method:'post',
                        url:'http://192.168.43.40:8080/outlink',
                        params:{
                            input:this.state.input
                        }
                    })
                        .then(function (response) {
               
                            if (response.status === 200){
                                outdata = response.data
                            }
                            else{
                                message.warning('请求错误,请稍后再试', 2)
                            }
                        }).then(()=>{
                            outdata.map((item,index)=>{
                                _this.pic_url.push(item.picture)
                                _this.title.push(item.title)
                                _this.id.push(item.id)
                                _this.description.push(item.source) 
                                  _this.content.push(item.content)
                                _this.url.push(item.url)
                            })
                            localStorage.setItem("pic_url",JSON.stringify(this.pic_url));
                            localStorage.setItem("title",JSON.stringify(this.title));
                            localStorage.setItem("id",JSON.stringify(this.id));
                            localStorage.setItem("description",JSON.stringify(this.description));
                            localStorage.setItem("content",JSON.stringify(this.content));
                            localStorage.setItem("url",JSON.stringify(this.url));
                        }).then(()=>{
                            this.setState({
                                length:data.length+outdata.length,
                                data: Array.from({ length: data.length+outdata.length }).map((_, i) => ({
                                    href: _this.href[i],
                                    title: _this.title[i],
                                    pic:_this.pic_url[i],
                                    description:_this.description[i],
                                    content:_this.content[i], 
                                    url:_this.url[i]
                                  })),
                            })
                        })
                })
                .then(()=>{
                    axios.get('http://192.168.43.40:8080/hot10')
                    .then(function (response){
                        if(response.status===200)
                         hot10 = response.data
                        else
                        message.error('hot10获取失败')
                    })
                .then(()=>{
                    localStorage.setItem("hot10",JSON.stringify(hot10));
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
  
}
    handlsubmit = (e) => {

      
        console.log(e.target.value);
        this.id=[]
        this.pic_url=[]
        this.title=[]
        this.description=[]
        this.content=[]
        this.href=[]
      
            let _this=this
            let data
            let hot10
            let outdata

            axios({
                method:'post',
                url:'http://192.168.43.40:8080/homepage_1',
                params:{
                    input:e.target.value
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
                        _this.url.push("")
                    })
                 
                }).then(()=>{
                    this.setState({
                        input:e.target.vaule,
                        length:data.length,
                        data: Array.from({ length: data.length }).map((_, i) => ({
                            href: _this.href[i],
                            title: _this.title[i],
                            pic:_this.pic_url[i],
                            description:_this.description[i],
                            content:_this.content[i], 
                            url:_this.url[i],
                          })),
                    })
                }).then(()=>{
                    axios({
                        method:'post',
                        url:'http://192.168.43.40:8080/outlink',
                        params:{
                            input:e.target.value
                        }
                    })
                        .then(function (response) {
               
                            if (response.status === 200){
                                outdata = response.data
                            }
                            else{
                                message.warning('请求错误,请稍后再试', 2)
                            }
                        }).then(()=>{
                            outdata.map((item,index)=>{
                                _this.pic_url.push(item.picture)
                                _this.title.push(item.title)
                                _this.id.push(item.id)
                                _this.description.push(item.source) 
                                _this.content.push(item.content)
                                _this.url.push(item.url)

                            })
                            localStorage.setItem("pic_url",JSON.stringify(this.pic_url));
                            localStorage.setItem("title",JSON.stringify(this.title));
                            localStorage.setItem("id",JSON.stringify(this.id));
                            localStorage.setItem("description",JSON.stringify(this.description));
                            localStorage.setItem("content",JSON.stringify(this.content));
                            localStorage.setItem("url",JSON.stringify(this.url));
                        }).then(()=>{
                            this.setState({
                                length:data.length+outdata.length,
                                data: Array.from({ length: data.length+outdata.length }).map((_, i) => ({
                                    href: _this.href[i],
                                    title: _this.title[i],
                                    pic:_this.pic_url[i],
                                    description:_this.description[i],
                                    content:_this.content[i], 
                                    url:_this.url[i]
                                  })),
                            })
                        })
                })
                .then(()=>{
                    axios.get('http://192.168.43.40:8080/hot10')
                    .then(function (response){
                        if(response.status===200)
                         hot10 = response.data
                        else
                        message.error('hot10获取失败')
                    })
                .then(()=>{
                    localStorage.setItem("hot10",JSON.stringify(hot10));
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
          
        
          
   
        //this.props.history.push({ pathname : '/searchlist' , state : { input : string }})
    
      }
      handlsubmit1=(e)=>{
        this.id=[]
        this.pic_url=[]
        this.title=[]
        this.description=[]
        this.content=[]
        this.href=[]
            let _this=this
            let data
            let hot10
           console.log(this.state)
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
                        localStorage.setItem("pic_url",JSON.stringify(this.pic_url));
                        localStorage.setItem("title",JSON.stringify(this.title));
                        localStorage.setItem("id",JSON.stringify(this.id));
                        localStorage.setItem("description",JSON.stringify(this.description));
                        localStorage.setItem("content",JSON.stringify(this.content));
                        
                    }).then(()=>{
                        this.setState({
                            drawer_visible:false,
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
                        localStorage.setItem("hot10",JSON.stringify(hot10));
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
      adsearch=(e)=>{
        this.setState({
            pet_species:1,
            pet_size:4,
            min_price:0,
            max_price:100000,
            country:'中国',
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
      todetail=(e)=>{
          console.log(e.target.name)
          if(e.target.name!=="")
          window.location.href=e.target.name
          else{
            this.setState({
                id:e.target.id
            })
          this.props.history.push({ pathname : '/showpage' , state : { 
            id : e.target.id,
          }})
          }
           
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
                        
                        title={<a name={item.url} onClick={this.todetail} id={item.id}>{item.title}</a>}
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
          <Checkbox.Group options={this.plainOptions} defaultValue={['狗狗']}  
          onChange={this.changespecies} />
          
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
            </div>
        )
    }
}
export default Searchlist