import React,{Component} from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


class DetailList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            details:props.details   // 存储待渲染信息的列表
        }
    }

    render(){
        // 列表渲染
        const detailElements = []
        for (let detail of this.state.details) {
            detailElements.push(
                <Panel header={detail.header} key="1" className="site-collapse-custom-panel">
                    <p>{detail.context}</p>
                </Panel>
            )
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