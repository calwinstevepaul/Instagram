const router = require("express").Router();
var jwt = require("jsonwebtoken");


class getdata {

    constructor(getdatacontroller) {
      this.controller = getdatacontroller
      this.init();
    }

    init(){
        router.post("/userinfo",(req,res) =>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
                else{
                    let decoded=jwt.decode(token);
                    var id =decoded.id
                    this.controller.userinfo(
                        id
                      ).then(result => {
                        res.send(result);
                      });
                }
            })
        })

        router.post("/otheruserinfo",(req,res) =>{
            console.log("calling...")
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
                else{
                    let decoded=jwt.decode(token);
                    var id =req.body.id
                    console.log(id)
                    this.controller.userinfo(
                        id
                      ).then(result => {
                        res.send({profile:result,current_id:decoded.id});
                      });
                }
            })
        })

        router.post("/posts",(req,res)=>{
            var token=(req.headers.token)
            var {pagesize,page}=req.body
            page=page*pagesize
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message:"token invalid"
                      });
                }
                else{
                    let decoded=jwt.decode(token);
                    var id =decoded.id

                    this.controller.posts(
                        id,
                        pagesize,
                        page
                      ).then(result => {
                        res.send(result);
                      });
                }
            })
        })

        router.post("/otheruserposts",(req,res)=>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message:"token invalid"
                      });
                }
                else{
                    let decoded=jwt.decode(token);
                    var id =req.body.id 
                    this.controller.otheruserposts(
                        id
                      ).then(result => {
                        res.send(result);
                      });
                }
            })
        })

        router.post("/otherusers",(req,res) =>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
                else{
                    var key=req.body.key
                    // console.log(key)
                    this.controller.otherusers(
                        key
                      ).then(result => {
                        res.send(result);
                      });
                }
            })
        })


        router.post("/getfollowing",(req,res)=>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message:"token invalid"
                      });
                }
                else{
                    let decoded=jwt.decode(token);
                    var id =req.body.id
                    this.controller.getfollowing(
                        id
                      ).then(result => {
                        res.send(result);                        
                      });
                }
            })
        })

        router.post("/getfollower",(req,res)=>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message:"token invalid"
                      });
                }
                else{
                    let decoded=jwt.decode(token);
                    var id =req.body.id
                    this.controller.getfollower(
                        id
                      ).then(result => {
                        res.send(result);                        
                      });
                }
            })
        })

        router.post("/isfollowerstate",(req,res) =>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
                else{
                    let decoded=jwt.decode(token);
                    var userId =decoded.id
                    var followerId=req.body.followerId
                    this.controller.isfollowerstate(
                        userId,
                        followerId
                      ).then(result => {
                        // console.log(result);
                        if(result.length==0||result==[]){

                            res.send({
                                "follow":false,
                                "status":"not followed"                                
                            })
                        }
                        else{  
                            if(result[0].dataValues.status){

                                res.send({
                                    "follow":true,        
                                    "status":"following"
                                })
                            }
                            else{

                                res.send({
                                    "follow":true,        
                                    "status":"Requested"
                                })
                            }                          
                            
                        }
                        
                      });
                }
            })
        })
        
        router.post("/followreq",(req,res) =>{
            var token=(req.headers.token)
            jwt.verify(token, "calwin123",(err,decode)=>{
                if(err){
                    res.status(401).send({
                        message: "Invalid token"
                    });
                }
                else{
                    let decoded=jwt.decode(token);
                    var followerId=decoded.id
                    this.controller.followreq(                        
                        followerId
                      ).then(result => {                        
                        res.send(result);                      

                      });
                }
            })
        })



    }


    getRouter() {
        return router;
    }
}    

module.exports = controller => {
    return new getdata(controller);
  };
  