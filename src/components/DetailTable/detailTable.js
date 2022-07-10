import React,{Component} from 'react';
import { Descriptions } from 'antd';
import './detailTable.css'

/*
ToDoList:
1. 将作为标签的字体修改为灰色
2. 优化排版实质良好对齐
*/
class DetailTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // details:props.details
        }
    }

    render(){
        const detailElements = []
        for (let detail of this.props.details) {
            detailElements.push(
                <Descriptions.Item label={detail.key} labelStyle={{color:"dimgray"}}>
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