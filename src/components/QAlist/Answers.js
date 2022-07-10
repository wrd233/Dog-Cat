import React,{Component} from 'react';
import { Card, List, Button, Modal, Form, Input } from 'antd';
import axios from "axios";

class Answers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            QuestionID:props.QuestionID,
            // title:props.title,
            // content:props,content,
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
    async componentWillMount () {
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        // console.log(this.state.QuestionID)
        let answerlist = []
        await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showAnswer?id='+this.state.QuestionID, 
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
        await axios({
        method:'get',
        url:'http://192.168.43.40:8080/showAnswer?id='+this.state.QuestionID, 
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
            url:'http://192.168.43.40:8080/Answer_submit?id='+this.state.QuestionID+'&content='+values.content, 
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
        // const answerElements = []
        // for (let ans of this.state.answers){
        //     answerElements.push(
        //         <p>
        //             {ans.content}
        //         </p>
        //     )
        // }
        return(
            <>
            <Button
                type="primary"
                onClick={this.showModal}
            >
                我要回答
            </Button>
            <div className='question'>
                <p>{this.state.title}</p>
                <p>{this.state.content}</p>
            </div>
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