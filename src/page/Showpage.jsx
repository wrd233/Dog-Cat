import react from "react";
import {Breadcrumb, Layout, Menu} from 'antd';
import '../css/Showpage.css'
import 'antd/dist/antd.css';
import {RightOutlined,CrownTwoTone,BarChartOutlined ,GithubOutlined,InfoCircleTwoTone,StarOutlined,ShareAltOutlined } from '@ant-design/icons';
import { Card, Col, Row ,message, Image} from 'antd';
import Logo from '../image/logo.svg'
import axios from "axios";
import { Link, Route, Redirect, Switch } from 'react-router-dom'

import DetailList from '../components/DetailList/detailList'
import DetailTable from '../components/DetailTable/detailTable'
import Stars from '../components/Stars/stars'
import QAlist from '../components/QAlist/QAlist'


const { Header, Content, Footer } = Layout;


const QAitems = [
    {
        href: 'https://ant.design',
        title: `问到狗肉香，耶稣也跳墙`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        content:'请问狗肉真的有这么香吗？另外耶稣跳墙的时候是先迈右脚还是先迈左脚？耶稣能不能创造一个他跳不过的墙？',
        answers:[
            {content:'我不知道'},
            {content:'我也不知道'},
        ]
    },
    {
        href: 'https://ant.design',
        title: `问到狗肉香，耶稣也跳墙`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        content:'请问狗肉真的有这么香吗？另外耶稣跳墙的时候是先迈右脚还是先迈左脚？耶稣能不能创造一个他跳不过的墙？',
        answers:[
            {content:'我不知道'},
            {content:'我也不知道'},
        ]
    }
]

const starList = [
    {key:'粘 人 程 度',value:3},
    {key:'喜 叫 程 度',value:3},
    {key:'友 善 程 度',value:5},
    {key:'掉 毛 程 度',value:4},
    {key:'美容程度',value:4},
    {key:'体味程度',value:2},
    {key:'口水程度',value:1},
    {key:'可训程度',value:3},
]

const detailForTable = [
    {key:'中文学名', value:'哈多利系博美犬'},
    {key:'别　　名', value:'波美拉尼亚犬|松鼠犬'},
    {key:'分布区域', value:'德国|日本|美国'},
    {key:'原 产 地', value:'德国波美拉尼亚地区'},
    {key:'体　　型', value:'小型'},
    {key:'身　　高', value:'22-28cm'},
    {key:'体　　重', value:'3.5kg'},
    {key:'寿　　命', value:'12-15年'},
]

const detailForList = [
  {header:'基本信息', context:'苏格兰折耳猫的耳朵竟是整齐地扣在头上，于是很自然地人们在头脑中把它们划到了精灵族的一边，猫猫中的折耳精灵族非它莫属'},
  {header:'性格特点', context:'苏格兰折耳猫诞生于苏格兰的一户农家，它属于基因变种的猫咪。它的耳朵整齐地扣在头上，为此人们也形象的给它命名为“苏格兰折耳猫”。这种猫咪最独特的外表就是它有着一双折起的耳朵，而且还吸引了众多爱猫者的关注。'},
  {header:'生活习性', context:'无论是长毛还是短毛，折耳猫的被毛都是非常厚的，所以最好每天都替它们梳理，这样可以保持被毛亮丽并且去除死毛。'},
]


class Showpage extends react.Component{
  state = {
    // petId:this.props.location.state.id,
    QAitems:[],
    starList:[],
    detailForTable:[],
    detailForList:[],
    picture:"http://img.ixiupet.com/uploads/allimg/150403/2-150403152148.jpg",
    price:"1300-6500",
    name:"博美犬/松鼠犬"
  }
componentWillMount () {
    console.log(this.state.petId)
    // axios.post('http://192.168.43.40:8080/showpage',{id:this.state.id})
    // .then(function(response){
    //     console.log(response)
    // })


    
    // axios({
    //     method:'get',
    //     url:'http://192.168.43.40:8080/showpage?id='+this.state.petId, 
    // }).then(function(response){
    //     this.setState({
    //         picture:response.data.picture,
    //         price:response.data.price,
    //         name:response.data.species
    //     })
    //     /*--------- 组装starList ---------*/
    //     starList.push({key:"粘人程度",value:response.data.clingyLevel})
    //     starList.push({key:"喜叫程度",value:response.data.noisyLevel})
    //     starList.push({key:"友善程度",value:response.data.friendLevel})
    //     starList.push({key:"掉毛程度",value:response.data.hairShedLevel})
    //     starList.push({key:"美容程度",value:response.data.cosmetologyLevel})
    //     starList.push({key:"体味程度",value:response.data.odourLevel})
    //     starList.push({key:"口水程度",value:response.data.slobberLevel})

    //     starList.push({key:"可训程度",value:response.data.trainLevel})
    //     starList.push({key:"活跃程度",value:response.data.activeLevel})
    //     starList.push({key:"友善程度",value:response.data.cityLevel})
    //     starList.push({key:"城市适度",value:response.data.coldLevel})
    //     starList.push({key:"耐寒程度",value:response.data.heatLevel})
    //     starList.push({key:"耐热程度",value:response.data.sportsLevel})
    //     starList.push({key:"运动程度",value:response.data.information})

    //     // ToDo:遍历一遍列表，把value是非数字的项替换为0

    //     /*--------- 组装detailForTable ---------*/
    //     detailForTable.push({key:"中文学名",value:response.data.chineseName})
    //     detailForTable.push({key:"别名",value:response.data.alias})
    //     detailForTable.push({key:"分布区域",value:response.data.region})
    //     detailForTable.push({key:"原产地",value:response.data.habitat})
    //     detailForTable.push({key:"体型",value:response.data.shape})
    //     detailForTable.push({key:"身高",value:response.data.height})
    //     detailForTable.push({key:"体重",value:response.data.weight})
    //     detailForTable.push({key:"寿命",value:response.data.lifetime})
    //     // ToDo:遍历一遍列表，把字符间的空格统一一下
    //     /*--------- 组装detailForList ---------*/
    //     detailForList.push({header:"基本信息",context:response.data.information})
    //     detailForList.push({header:"性格特点",context:response.data.characteristics})
    //     detailForList.push({header:"生活习性",context:response.data.habits})
    //     detailForList.push({header:"优点缺点",context:response.data.advAndDis})
    //     detailForList.push({header:"喂养方法",context:response.data.feeding})
    //     detailForList.push({header:"甄别挑选",context:response.data.picking})
    //     /*--------- 组装QAitems ---------*/

    // })

    this.setState({
        QAitems:QAitems,
        starList:starList,
        detailForTable:detailForTable,
        detailForList:detailForList
    })
  }
  render(){
    return(
    <Layout className="layout">
        <Header>
        <div className="logo" />
        </Header>
        <Content
        style={{
            padding: '0 50px',
        }}
        >
        <Row>
            <Col span={8} align="middle">
            <Image
                width={200}
                src={this.state.picture}
            />
            </Col>
            <Col span={16}>
                <h1>{this.state.name}</h1>
                <p>
                    参考价格:<strong>{this.state.price}</strong>
                </p>
                <DetailTable details={this.state.detailForTable}/>
                <Stars starList={this.state.starList}/>
            </Col>
        </Row>
        <DetailList details={this.state.detailForList}/>
        <QAlist QAitems={this.state.QAitems}/>



        </Content>
        <Footer
        style={{
            textAlign: 'center',
        }}
        >
        Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>
    )
  }
}
export default Showpage;