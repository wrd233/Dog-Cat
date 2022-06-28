import React,{Component} from 'react';
import { Card } from 'antd';
const { Meta } = Card;

// ToDo：限定summary的渲染行数，超过一定长度的summary将会被舍去
class SearchCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            petMeta:props.petMeta,
        }
    }

    render(){
        return(
            <>
            <Card
                hoverable
                style={{ 
                    width: 204,
                    height: 140 
                }}
                cover={<img alt="example" src={this.state.petMeta.picUrl} />}
            >
            <Meta title={this.state.petMeta.name} description={this.state.petMeta.summary} />
            </Card>
            </>
        );
    }
}
    
//输出组件
export default SearchCard;
