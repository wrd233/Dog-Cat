import React,{Component} from 'react';
import { Card, List, Button, Modal, Form, Input } from 'antd';
import axios from "axios";

class Answers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            QuestionID:props.QuestionID,
            title:props.title,
            content:props.content,
            answers:[],
            isModal:false,
            isLoading:false,
        }
    }

    showModal = () => {
        this.setState({
            isModal:true
        });
    };

    // [ToDo]:根据QuestionID获得回答的列表
    async componentDidMount () {
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        // console.log(this.state.QuestionID)
        let answerlist = []
        console.log("尝试获取的qid为:"+this.props.QuestionID)
        await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showAnswer?id='+this.props.QuestionID, 
        }).then(function(response){
            console.log(response)
            for (let ans of response.data){
                answerlist.push({
                    content:ans.content,
                })
            }
        })
        console.log(answerlist)
        this.setState({
            answers:answerlist
        })
    }

    async renew () {
        let answerlist = []
        console.log("尝试获取的qid为:"+this.props.QuestionID)
        await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showAnswer?id='+this.props.QuestionID, 
        }).then(function(response){
            console.log(response)
            for (let ans of response.data){
                answerlist.push({
                    content:ans.content,
                })
            }
        })
        console.log(answerlist)
        this.setState({
            answers:answerlist
        })
    }

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
            url:'http://192.168.43.40:8080/Answer_submit?id='+this.props.QuestionID+'&content='+values.content, 
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

    render(){
        return(
            <>
            <div className='question'>
                <p>{this.props.title}</p>
                <p>问题简述：{this.props.content}</p>
            </div>
            <Button
                type="primary"
                onClick={this.showModal}
            >
                我要回答
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={this.state.answers}
                renderItem={item => (
            <List.Item>
                <Card
                    title="匿名用户"
                    hoverable={true}
                >
                    {item.content}
                </Card>
            </List.Item>
            )} />
            <Modal
                visible={this.state.isModal}
                title="我要回答"
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
                    <Form.Item label="回答内容" name="content" rules={[{ required: true }]}>
                    <Input />
                    </Form.Item>

                    <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" loading={this.state.isLoading}>
                        回答提交
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
            </>
            
        );
    }
};
    
//输出组件
export default Answers;