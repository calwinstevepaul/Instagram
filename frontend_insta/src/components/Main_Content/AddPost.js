import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {authApi} from '../../apicall'

export class AddPost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            description:'',
            postPic:[]
        }
    }
    sendPost=()=>{
        this.props.changeAddpostState(false)

        const formdata=new FormData();
        formdata.append("myimage",this.state.postPic);
        formdata.append("description",this.state.description);
        let config={
            headers: {
                'content-type': 'multipart/form-data',
        
            }
        }
        authApi.post("/update/addpost",formdata,config)
        .then(res=>{
            console.log("image",res.data);
            this.props.history.push('/home/')

        })
        
    }
    render() {
        return (
            <div className="addPost">
                <div className="addPost_inner">
                    <textarea onChange={(e)=>this.setState({description:e.target.value})} placeholder="description"/>
                    <input type="file" multiple onChange={(e)=>{this.setState({postPic:e.target.files[0]})}}/>
                    <button onClick={this.sendPost}>Add Post</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AddPost)
