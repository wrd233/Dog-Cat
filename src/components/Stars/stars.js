import React,{Component} from 'react';
import { Descriptions, Rate } from 'antd';

/*
ToDoList:
1. 排版上存在问题
2. 如果不交互的话则取消它的互动性；如果考虑交互的话，需要数据流通
*/
class Stars extends Component{
    constructor(props) {
        super(props);
        this.state = {
            starList:props.starList
        }
    }

    render(){
        const starElements = []
        for (let elmt of this.state.starList) {
            starElements.push(
                <Descriptions.Item label={elmt.key}>
                    <Rate allowHalf defaultValue={elmt.value}/>
                </Descriptions.Item>
            )
        }
        return(
            <Descriptions>
               {starElements}
            </Descriptions>
        );
    }
};
    
//输出组件
export default Stars;