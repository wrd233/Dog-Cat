import React,{Component } from 'react';
import { Avatar, List, Drawer, Descriptions,Skeleton,Space, Card,Modal, Button, Form,Input} from 'antd';
import Answers from "./Answers"
import axios from "axios";

/*
ToDoList:
1. 多级访问:
    宠物界面向QAlist传递宠物的ID
    QAlist向问题的详情列表传递问题的ID
    QAitem来渲染问题的展示界面，同时也提交问题的解答
*/
class QAlist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            QAitems:[],      // 所有的QA项目
            petID:props.petID,
            // isModalVisible:false,
            visible:false,
            answersToShow:[],            // 选中的待展示的一个问题的多条评论
            answerToShowTitle:"",
            answerToShowContent:"",
            questionToShow:-1,
            isModal:false,
            isLoading:false,
        }
    }
    // [ToDo]:在渲染这个之前得到QA
    async componentDidMount () {
        let answerlist = []
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showQuestion?id='+this.state.petID, 
        }).then(function(response){
            // [ToDo]组装QAitems
            console.log(response.data)
            for (let que of response.data){
                answerlist.push({
                    id:que.id,
                    title:que.title,
                    content:que.content,
                })
            }
        })
        this.setState({
            QAitems:answerlist
        })
    }

    async renew(){
        let answerlist = []
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showQuestion?id='+this.state.petID, 
        }).then(function(response){
            // [ToDo]组装QAitems
            console.log(response.data)
            for (let que of response.data){
                answerlist.push({
                    id:que.id,
                    title:que.title,
                    content:que.content,
                })
            }
        })
        this.setState({
            QAitems:answerlist
        })
    }

    showModal = () => {
        this.setState({
            isModal:true
        });
    };

    handleCancel = () => {
        this.setState({
            isModal:false
        });
    };

    onFinish = async(values) => {
        this.setState({
            isLoading:true
        });

        await axios({
            method:'get',
            url:'http://192.168.43.40:8080/Question_submit?id='+this.state.petID+'&title='+values.title+'&content='+values.content, 
            }).then(function(response){
                console.log(response)
            })

        // [ToDo] 完成表单的提交和QAlist的刷新
        this.setState({
            isModal:false,
            isLoading:false
        });
        console.log("上传成功")
        console.log(values);
        this.renew()
      };

    checkAnswer = (e,ID,title,content) => {
        console.log("ID:")
        console.log(ID)
        this.setState({
            visible:true,
            questionToShow:ID,
            answerToShowTitle:title,
            answerToShowContent:content
        });
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

        return(
            <>
            <Button 
            type="primary" 
            onClick={this.showModal}
            >
                我要提问
            </Button>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.QAitems}
                renderItem={(item) => (
                <List.Item
                    key={item.title}
                >
                    <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={
                        <a onClick={(e) => { this.checkAnswer(e,item.id,item.title,item.content); } }>
                            {item.title}
                        </a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />
            <Drawer title="问答详情" placement="bottom" onClose={this.onClose} visible={this.state.visible}>
                    <Answers QuestionID={this.state.questionToShow} title={this.state.answerToShowTitle} content={this.state.answerToShowTitleContent}/>
            </Drawer>

            <Modal
                visible={this.state.isModal}
                title="我要提问"
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    onFinish={this.onFinish}
                >
                    <Form.Item label="问题简述" name="title" rules={[{ required: true }]}>
                    <Input />
                    </Form.Item>

                    <Form.Item label="问题详情" name="content" rules={[{ required: true }]}>
                    <Input />
                    </Form.Item>

                    <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading}>
                        问题提交
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
            </>
            
        );
    }
}
    
//输出组件
export default QAlist;