import React,{Component} from 'react';
import { Descriptions } from 'antd';


/*
ToDoList:
1. 将作为标签的字体修改为灰色
2. 优化排版实质良好对齐
*/
class DetailTable extends Component{
    constructor(props) {
        super(props);
        console.log("DetailTable组件内部测试:")
        console.log(props)
        this.state = {
            details:props.details
        }
    }
    
    render(){
        console.log(this.state.details)
        const detailElements = []
        for (let detail of this.state.details) {
            detailElements.push(
                <Descriptions.Item label={detail.key}>
                    {detail.value}
                </Descriptions.Item>
            )
        }
        return(
            <Descriptions>
               {detailElements}
            </Descriptions>
        );
    }
}; 

//输出组件
export default DetailTable;