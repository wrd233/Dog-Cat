import React,{Component} from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
const { Panel } = Collapse;



class DetailList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // details:props.details   // 存储待渲染信息的列表
        }
    }
    render(){
        // 列表渲染
        const detailElements = []
        var i=1
        for (let detail of this.props.details) {
            detailElements.push(
                <Panel header={detail.header} key={i} className="site-collapse-custom-panel">
                    {/* <p>{detail.context}</p> */}
                    <div style={{display: 'inline-block'}}
                    dangerouslySetInnerHTML=
                        {{__html: detail.context}}
                    ></div>
                </Panel>
            )
            i = i+1;
        }
        
        return(
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
                {detailElements}
            </Collapse>
        );
    }
};
    
//输出组件
export default DetailList;