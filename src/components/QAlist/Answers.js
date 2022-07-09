import React,{Component} from 'react';
import { Card } from 'antd';

class Answers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            QuestionID:props.QuestionID,
            answers:[]
        }
    }

    // [ToDo]:根据QuestionID获得回答的列表
    componentWillMount () {
        // [ToDo]：从后端获得当前petID对应的QAlist并将其赋值到这个状态中
        // axios({
        // method:'get',
        // url:'http://192.168.43.40:8080/showpage?id='+this.state.petID, 
        // }).then(function(response){
        //     console.log(response)
        // })
    }

    render(){
        return(
            <></>
        );
    }
};
    
//输出组件
export default Answers;