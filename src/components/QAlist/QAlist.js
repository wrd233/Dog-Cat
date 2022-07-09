import React,{Component } from 'react';
import { Avatar, List, Drawer, Descriptions,Skeleton,Space, Card,Modal, Button, Form,Input} from 'antd';
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
            QAitems:props.QAitems,      // 所有的QA项目
            petID:props.petID,
            // isModalVisible:false,
            visible:false,
            answersToShow:[],            // 选中的待展示的一个问题的多条评论
            isModal:false,
            isLoading:false,
        }
    }
    componentWillMount () {
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        // axios({
        // method:'get',
        // url:'http://192.168.43.40:8080/showpage?id='+this.state.petID, 
        // }).then(function(response){
        //     console.log(response)
        // })
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

    onFinish = (values) => {
        this.setState({
            isLoading:true
        });
        // [ToDo] 完成表单的提交和QAlist的刷新
        setTimeout(() => {
            this.setState({
                isModal:false,
                isLoading:false
            });
        }, 3000);
        console.log(values);
      };

    checkAnswer = (e,answers) => {
        this.setState({
            visible:true,
            answersToShow:answers
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