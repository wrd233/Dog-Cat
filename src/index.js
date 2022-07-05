import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

// -----------------------[单元测试] 测试首页面(搜索页面)-----------------------
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// // -----------------------[单元测试] 测试搜索结果的卡片显示-----------------------
// import SearchCard from './components/SearchCard/searchCard'
// const petMeta={
//   name: '骑士查理王小猎犬',
//   summary: '查理士王小猎犬来源于它高贵的祖先，15～16世纪的绘画中，该犬总是伴随着宫廷的孩子一起出现。普通人养不起这种从不工作的犬。骑士查理一世对于这种犬非常的喜爱，查理士王小猎犬由此得名。',
//   picUrl: 'http://img.ixiupet.com/uploads/150416/3-150416105049392.jpg',
// }
// ReactDOM.render(<SearchCard petMeta={petMeta}/>, document.getElementById('root'));

// // -----------------------[单元测试] 测试详细信息栏-----------------------
// import DetailList from './components/DetailList/detailList'
// const details = [
//   {header:'基本信息', context:'苏格兰折耳猫的耳朵竟是整齐地扣在头上，于是很自然地人们在头脑中把它们划到了精灵族的一边，猫猫中的折耳精灵族非它莫属'},
//   {header:'性格特点', context:'苏格兰折耳猫诞生于苏格兰的一户农家，它属于基因变种的猫咪。它的耳朵整齐地扣在头上，为此人们也形象的给它命名为“苏格兰折耳猫”。这种猫咪最独特的外表就是它有着一双折起的耳朵，而且还吸引了众多爱猫者的关注。'},
//   {header:'生活习性', context:'无论是长毛还是短毛，折耳猫的被毛都是非常厚的，所以最好每天都替它们梳理，这样可以保持被毛亮丽并且去除死毛。'},
// ]
// ReactDOM.render(<DetailList details={details}/>, document.getElementById('root'));

// // -----------------------[单元测试] 测试基本信息栏 -----------------------
// import DetailTable from './components/DetailTable/detailTable'
// const details = [
//     {key:'中文学名', value:'哈多利系博美犬'},
//     {key:'别　　名', value:'波美拉尼亚犬|松鼠犬'},
//     {key:'分布区域', value:'德国|日本|美国'},
//     {key:'原 产 地', value:'德国波美拉尼亚地区'},
//     {key:'体　　型', value:'小型'},
//     {key:'身　　高', value:'22-28cm'},
//     {key:'体　　重', value:'3.5kg'},
//     {key:'寿　　命', value:'12-15年'},
// ]
// ReactDOM.render(<DetailTable details={details}/>, document.getElementById('root'));


// // -----------------------[单元测试] 测试打分列表 -----------------------
// import Stars from './components/Stars/stars'
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
// ReactDOM.render(<Stars starList={starList}/>, document.getElementById('root'));

// // -----------------------[单元测试] 测试QA列表 -----------------------
// import QAlist from './components/QAlist/QAlist'
// const QAitems = [
//     {
//         href: 'https://ant.design',
//         title: `问到狗肉香，耶稣也跳墙`,
//         avatar: 'https://joeschmoe.io/api/v1/random',
//         content:'请问狗肉真的有这么香吗？另外耶稣跳墙的时候是先迈右脚还是先迈左脚？耶稣能不能创造一个他跳不过的墙？',
//         answers:[
//             {content:'我不知道'},
//             {content:'我也不知道'},
//         ]
//     },
//     {
//         href: 'https://ant.design',
//         title: `问到狗肉香，耶稣也跳墙`,
//         avatar: 'https://joeschmoe.io/api/v1/random',
//         content:'请问狗肉真的有这么香吗？另外耶稣跳墙的时候是先迈右脚还是先迈左脚？耶稣能不能创造一个他跳不过的墙？',
//         answers:[
//             {content:'我不知道'},
//             {content:'我也不知道'},
//         ]
//     }
// ]
// ReactDOM.render(<QAlist QAitems={QAitems}/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
