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


// const QAitems = [
//     {
//         questionID:124,
//         title: `问到狗肉香，耶稣也跳墙`,
//         avatar: 'https://joeschmoe.io/api/v1/random',
//         content:'请问狗肉真的有这么香吗？另外耶稣跳墙的时候是先迈右脚还是先迈左脚？耶稣能不能创造一个他跳不过的墙？',
//         answers:[
//             {content:'众所周知，7，8岁的狗狗就已经步入老年，那么这个年龄段的狗狗应该如何训练才能让他保持健康已经成了很多人的烦恼，毕竟这时候的博美已经把医生都共享给了人类，我们对博美也有了一定的感情我们当然不希望博美和我们说88。因此我们每天要给博美进行适当的运动， 让博美的状态保持最佳，小编的建议是，可以带狗狗去跑跑操场，这样我们不仅可以对博美进行锻炼，同时我们的身体素质也会得到很大程度的训练。正常一开始可以跑个一两圈，后面可以慢慢增加路程，慢慢的狗狗的核心就提升了上来，我们也和狗狗一样。跑步之后可以和狗狗散散步，有空也可以带博美爬爬山，让博美更贴近大自然。'},
//             {content:'相信大家听完小编对8岁博美饲养训练的教学之后一定对如何对博美进行训练有了更好的理解吧！那大家快去带上自己的博美出去跑跑步吧！给他一个更好的身体！'},
//         ]
//     },
//     {
//         questionID:123,
//         title: `问到狗肉香，耶稣也跳墙`,
//         avatar: 'https://joeschmoe.io/api/v1/random',
//         content:'请问狗肉真的有这么香吗？另外耶稣跳墙的时候是先迈右脚还是先迈左脚？耶稣能不能创造一个他跳不过的墙？',
//         answers:[
//             {content:'是必须要接种疫苗，因为接种疫苗不光可以保障狗狗身体的健康，增强狗狗自身的免疫力，同时也可以避免狗狗把一些疾病传染给人类，所以接种疫苗对人和狗狗都有好处。但并不是每次接受疫苗都会成功的，有时狗狗接种了疫苗但还是得了传染病，这就是接种疫苗失败。揭晓狗狗注射疫苗失败的原因,主人莫慌!下面就一起来看看吧。'},
//             {content:'当狗狗注射完疫苗之后，抗原进入机体也会产生不同水平的免疫反应，但这都是需要有一定的营养物质来做铺垫的，因此如果狗狗体内营养物质缺乏或者不足，特别是维生素A，D，B，E和多种微量元素及全价蛋白缺乏的时候，你e抗体就没有办法迅速生成该有的数量，从而导致免疫反应停滞或者免疫应答能力下降，这么一来就出会直接导致免疫失败。'},
//         ]
//     }
// ]

// const starList = [
//     {key:'粘 人 程 度',value:3},
//     {key:'喜 叫 程 度',value:3},
//     {key:'友 善 程 度',value:5},
//     {key:'掉 毛 程 度',value:4},
//     {key:'美容程度',value:4},
//     {key:'体味程度',value:2},
//     {key:'口水程度',value:1},
//     {key:'可训程度',value:3},
// ]

// const detailForTable = [
//     {key:'中文学名', value:'哈多利系博美犬'},
//     {key:'别　　名', value:'波美拉尼亚犬|松鼠犬'},
//     {key:'分布区域', value:'德国|日本|美国'},
//     {key:'原 产 地', value:'德国波美拉尼亚地区'},
//     {key:'体　　型', value:'小型'},
//     {key:'身　　高', value:'22-28cm'},
//     {key:'体　　重', value:'3.5kg'},
//     {key:'寿　　命', value:'12-15年'},
// ]

// const detailForList = [
//   {header:'基本信息', context:'苏格兰折耳猫的耳朵竟是整齐地扣在头上，于是很自然地人们在头脑中把它们划到了精灵族的一边，猫猫中的折耳精灵族非它莫属'},
//   {header:'性格特点', context:'苏格兰折耳猫诞生于苏格兰的一户农家，它属于基因变种的猫咪。它的耳朵整齐地扣在头上，为此人们也形象的给它命名为“苏格兰折耳猫”。这种猫咪最独特的外表就是它有着一双折起的耳朵，而且还吸引了众多爱猫者的关注。'},
//   {header:'生活习性', context:'无论是长毛还是短毛，折耳猫的被毛都是非常厚的，所以最好每天都替它们梳理，这样可以保持被毛亮丽并且去除死毛。'},
// ]

const QAitems = []
    
const starList = []

const detailForTable = []

const detailForList = []


class Showpage extends react.Component{
    state = {
        petID:this.props.location.state.id,
        // petID:350,
        QAitems:[],
        starList:[],
        detailForTable:[],
        detailForList:[],
        // picture:"http://img.ixiupet.com/uploads/allimg/150403/2-150403152148.jpg",
        // price:"1300-6500",
        // name:"博美犬/松鼠犬"
        name:"",
        price:"",
        picture:"",
      }

async componentDidMount () {
    // console.log("当前页面pet的ID为:"+this.state.petID)
    // console.log("当前页面pet的ID为:"+this.props.location.state.id)
    var res;
    await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showpage?id='+this.state.petID, 
    }).then(function(response){
        console.log(response)
        res = response
        QAitems = []
    
        starList = []
        
        detailForTable = []
        
        detailForList = []
        /*--------- 组装starList ---------*/
        starList.push({key:"粘 人 程 度",value:response.data.clingyLevel})
        starList.push({key:"喜 叫 程 度",value:response.data.noisyLevel})
        starList.push({key:"友 善 程 度",value:response.data.friendLevel})
        starList.push({key:"掉 毛 程 度",value:response.data.hairShedLevel})
        starList.push({key:"美 容 程 度",value:response.data.cosmetologyLevel})
        starList.push({key:"体 味 程 度",value:response.data.odourLevel})
        starList.push({key:"口 水 程 度",value:response.data.slobberLevel})

        starList.push({key:"可 训 程 度",value:response.data.trainLevel})
        starList.push({key:"活 跃 程 度",value:response.data.activeLevel})
        starList.push({key:"友 善 程 度",value:response.data.cityLevel})
        starList.push({key:"城 市 适 度",value:response.data.coldLevel})
        starList.push({key:"耐 寒 程 度",value:response.data.heatLevel})
        starList.push({key:"耐 热 程 度",value:response.data.sportsLevel})
        starList.push({key:"运 动 程 度",value:response.data.information})

        // ToDo:遍历一遍列表，把value是非数字的项替换为0

        /*--------- 组装detailForTable ---------*/
        detailForTable.push({key:"中文学名",value:response.data.chineseName})
        detailForTable.push({key:"别　　名",value:response.data.alias})
        detailForTable.push({key:"分布区域",value:response.data.region})
        detailForTable.push({key:"原 产 地",value:response.data.habitat})
        detailForTable.push({key:"体　　型",value:response.data.shape})
        detailForTable.push({key:"身　　高",value:response.data.height})
        detailForTable.push({key:"体　　重",value:response.data.weight})
        detailForTable.push({key:"寿　　命",value:response.data.lifetime})
        // ToDo:遍历一遍列表，把字符间的空格统一一下

        /*--------- 组装detailForList ---------*/
        detailForList.push({header:"基本信息",context:response.data.information})
        detailForList.push({header:"性格特点",context:response.data.characteristics})
        detailForList.push({header:"生活习性",context:response.data.habits})
        detailForList.push({header:"优点缺点",context:response.data.advAndDis})
        detailForList.push({header:"喂养方法",context:response.data.feeding})
        detailForList.push({header:"甄别挑选",context:response.data.picking})
        /*--------- 组装QAitems ---------*/
    })

    this.setState({
        picture:res.data.picture,
        price:res.data.price,
        name:res.data.species,
        // picture:"http://img.ixiupet.com/uploads/allimg/150403/2-150403152148.jpg",
        // price:"1000-2000",
        // name:"小狗",
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
                width={500}
                src={this.state.picture}
            />
            </Col>
            <Col span={16}>
                <div className="petname">
                    <h1>{this.state.name}</h1>
                </div>
                <p className="price">
                    <span className="cankao">
                        参考价格:
                        <strong>{this.state.price}</strong>
                        元
                    </span>
                </p>
                <DetailTable className="detail_table" details={this.state.detailForTable}/>
                <Stars starList={this.state.starList}/>
            </Col>
        </Row>
        <DetailList details={this.state.detailForList}/>
        <QAlist QAitems={this.state.QAitems} petID={this.state.petID}/>
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