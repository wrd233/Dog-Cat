import React,{Component, Modal } from 'react';
import { Avatar, List, Drawer, Descriptions,Skeleton,Space, Card  } from 'antd';
import axios from "axios";

/*
ToDoList:
1. 需要整一个弹窗将用户的解答显示出来
*/
class QAlist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            QAitems:props.QAitems,      // 所有的QA项目
            petID:props.petID,
            // isModalVisible:false,
            visible:false,
            answersToShow:[]            // 选中的待展示的一个问题的多条评论
        }
    }
    componentWillMount () {
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        // axios({
        // method:'get',
        // url:'http://192.168.43.40:8080/showpage?id='+this.state.petId, 
        // }).then(function(response){
        //     console.log(response)
        // })
    }

    checkAnswer = (e,answers) => {
        this.setState({
            visible:true,
            answersToShow:answers
        });
        // console.log(this.state.answersToShow)
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

        // var answerElements = []
        // for(let ans of this.state.answersToShow){
        //     answerElements.push(
        //         <div>
        //             {ans.content}
        //         </div>
        //     )
        // }
        
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
            <Drawer title="问答详情" placement="bottom" onClose={this.onClose} visible={this.state.visible}>
                {/* {answerElements} */}
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.answersToShow}
                    renderItem={item => (
                    <List.Item>
                        {/* <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            // avatar={<Avatar src={item.picture.large} />}
                            title="用户名"
                            // description={item.content}
                        />
                            <Space>
                                {item.content}
                            </Space>
                        {item.content}
                        </Skeleton> */}
                        <Card   
                            title="匿名用户"
                            hoverable={true}
                            >
                            {item.content}
                        </Card>
                    </List.Item>
                    )}
                    />
            </Drawer>
            </>
        );
    }
}
    
//输出组件
export default QAlist;