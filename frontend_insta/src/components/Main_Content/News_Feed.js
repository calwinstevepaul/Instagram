import React, { Component } from "react";
import {authApi} from "../../apicall"
import Posts from "./Posts";
import ChangeProfilePic from "./ChangeProfilePic";
export class News_Feed extends Component {
  constructor(props) {
    super(props);
    this.interval = 0;
    this.state = {
      
      userinfo: [],
      postdata: [],
      comment: {},
      following:[],
      page:0
    };
    this.comment= React.createRef();
  }
  componentDidMount() {
    this.getdata();
    this.getpost();
    

  }

  getfollowing =(id)=>{
    
        authApi.post("/getdata/getfollowing",{id:id})
        .then(res=>{
            // console.log("getfollowers::",res)   
            this.setState({following:res.data})
        })
  }

  getpost = () => {
    authApi.post("/getdata/posts", {
      pagesize :5*(this.state.page+1),
      page :0
    })
      .then(res => {        
        res.data.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        this.setState({
          postdata: res.data
        });
        // console.log(res.data);
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  getdata = () => {
    authApi.post("/getdata/userinfo", {})
      .then(res => {
        this.setState({
          userinfo: res.data[0]
        });
        this.getfollowing(this.state.userinfo.id);
      });
  };

  

  addlike = id => {
    authApi.post("/update/addlike", { postId: id })
      .then(() => {
        this.getpost();
      });
  };
  removelike = id => {
    authApi.post("/update/removelike", { postId: id })
      .then(() => {
        this.getpost();
      });
  };
  
  handleScroll=()=>{

    
    var scroll= document.getElementById('displaytasktable-completed')
    window.addEventListener('scroll',()=>{
        var isBottom = (scroll.getBoundingClientRect().bottom-window.innerHeight)<=5
        console.log(isBottom)
          if(isBottom){
            this.infinitescroll();
        }
        
    

    })
}

infinitescroll=()=>{
        var page = this.state.page+1;
        authApi.post("/getdata/posts", {
          pagesize :5,
          page
        })
        .then((res)=>{
            // console.log(res.data)
            var postdata =res.data;
            this.setState({
              postdata :[...this.state.postdata,...postdata]
            })
            this.setState({
                page
            })
            // clearInterval(this.interval);
            console.log(this.state.data);
        })
}

  

  render() {
    return (
      <div  className="news_feed" >
        <ChangeProfilePic 
          getdata={this.getdata}
          userinfo={this.state.userinfo}  
        />
        <div id="displaytasktable-completed" ref={this.handleScroll}>
          {this.state.postdata.map((data, index) => {
            return(data.reports.length > 3 ?
              <></>
              : <Posts 

              userinfo={this.state.userinfo} 
              data={data}
              addlike={this.addlike}
              removelike={this.removelike}
              getpost={this.getpost}
              />
              )

          })}
        </div>
        
      </div>
    );
  }
}

export default News_Feed;
