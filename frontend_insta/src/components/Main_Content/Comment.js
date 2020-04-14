import React, { Component } from 'react'
import ReplyComment from './ReplyComment'
import {authApi} from "../../apicall"


export class Comment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            replyCommentState:false,
            checkComment:false,

        }
    }
    changeReplyCommentState=(value)=>{
        this.setState({replyCommentState:value})
    }
    addreplycomment=(comment)=>{
        console.log("comment::",comment,)
        if(comment==""||null){
            this.setState({
                checkComment:true
            })
            setTimeout(()=>{
                this.setState({
                    checkComment:false
                })
            },2000)
        }
        else{
            authApi.post("/update/replycomment",{ commentId: this.props.x.id, replycomment:comment })
            .then(() => {
              this.props.getpost();
              
            })
        }
    }
    
    render() {
        
        return (
           
            <div>
                <div className="comment">
                    <p className="noMargin">
                    <b>{this.props.x.user.name}</b> {this.props.x.comment}
                    </p>  
                    <button
                    className="commentsbtn-2"
                    onClick={()=>this.changeReplyCommentState(true)}
                    >
                    {this.state.replyCommentState?"":"reply"}
                    </button>                    
                </div>
                {this.props.x.replycomments.map(data=>{
                    // {console.log(data.replycomments)}
                    return(    
                        <p className="replycomment"><b>{data.user.name}</b> {data.replycomments}</p>
                    )
                })}
                {this.state.replyCommentState? 
                    <ReplyComment 
                        addreplycomment={this.addreplycomment} 
                        data={this.props.data.comments}
                        changeReplyCommentState={this.changeReplyCommentState}

                    />
                    :
                    ""}
            </div>
            
        )
    }
}

export default Comment
