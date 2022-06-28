import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

// // [单元测试] 测试首页面(搜索页面)
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//         <App/>
//     </BrowserRouter>,
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// [单元测试] 测试搜索结果的卡片显示
import SearchCard from './components/SearchCard/searchCard'
const petMeta={
  name: '骑士查理王小猎犬',
  summary: '查理士王小猎犬来源于它高贵的祖先，15～16世纪的绘画中，该犬总是伴随着宫廷的孩子一起出现。普通人养不起这种从不工作的犬。骑士查理一世对于这种犬非常的喜爱，查理士王小猎犬由此得名。',
  picUrl: 'http://img.ixiupet.com/uploads/150416/3-150416105049392.jpg',
}
ReactDOM.render(<SearchCard petMeta={petMeta}/>, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
