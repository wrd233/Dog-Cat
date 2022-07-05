import React,{Component, Modal } from 'react';
import { Avatar, List, Drawer, Descriptions } from 'antd';


/*
ToDoList:
1. 需要整一个弹窗将用户的解答显示出来
*/
class QAlist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            QAitems:props.QAitems,
            // isModalVisible:false,
            visible:false,
            answersToShow:[]
        }
    }

    checkAnswer = (e,answers) => {
        this.setState({
            visible:true,
            answersToShow:answers
        });
        console.log(this.state.answersToShow)
    };

    onClose = ()=>{
        this.setState({
            visible:false
        });
    }

    render(){
        const detailElements = []
        for (let detail of this.state.QAitems) {
            detailElements.push(
                <Descriptions.Item label={detail.key}>
                    {detail.value}
                </Descriptions.Item>
            )
        }

        var answerElements = []
        for(let ans of this.state.answersToShow){
            answerElements.push(
                <div>
                    {ans.content}
                </div>
            )
        }
        
        return(
            <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.QAitems}
                renderItem={(item) => (
                <List.Item
                    key={item.title}
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                        <a onClick={(e) => { this.checkAnswer(e,item.answers); } }>
                            {item.title}
                        </a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />
            <Drawer title="问答详情" placement="right" onClose={this.onClose} visible={this.state.visible}>
                {answerElements}
            </Drawer>
            </>
        );
    }
}
    
//输出组件
export default QAlist;
