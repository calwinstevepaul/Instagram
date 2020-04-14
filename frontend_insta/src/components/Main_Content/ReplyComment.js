import React, { Component } from 'react'

export class ReplyComment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            replycomment:"",
            replyCommentState:false
        }
    }
    
    render() {
        return (
            
            <div>
                <input 
                      className="replycommentsinput"
                      value={this.state.replycomment}
                      onChange={e => {                          
                          this.setState({
                              replycomment:e.target.value
                          })
                      }}
                      placeholder="Add a comment..."
                  />
                  <button
                      className="replycommentsbtn"
                      onClick={() => {this.props.addreplycomment(this.state.replycomment);this.props.changeReplyCommentState(false);this.setState({replycomment:''})}}
                  >Reply</button>
            </div>
        )
    }
}

export default ReplyComment
