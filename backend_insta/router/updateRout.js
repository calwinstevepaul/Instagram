
const router = require('express').Router();
const multer=require('multer');
const path = require("path")
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
  
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});


class update {

  constructor(updatecontroller) {
    this.controller = updatecontroller
    this.init();
  }
   
  init() 
    {
      router.post("/profile_pic", upload.single("myimage"), (req, res) =>{
          var token=(req.headers.token)
          jwt.verify(token, "calwin123", (err, decode) => {
            if (err) {
              res.send("token invalid");
            } else {
              let str=req.file.path
              // REMOVING PUBLIC FROM THE PATH AS IT IS STATIC
              let newstr=str.slice(6)
              let decoded=jwt.decode(token);
              console.log(decoded.id)
            
            var url ="http://localhost:9000/"+newstr
            var id =decoded.id
              this.controller.uplodePic(
                url,
                id
              ).then(result => {
                res.send(result);
              });

            }
          })
      })


      router.post("/addpost", upload.single("myimage"), (req, res) =>{
        var token=(req.headers.token)
        var description =req.body.description
        jwt.verify(token, "calwin123", (err, decode) => {
          if (err) {
            res.send("token invalid");
          } else {
            let str=req.file.path
            // REMOVING PUBLIC FROM THE PATH AS IT IS STATIC
            let newstr=str.slice(6)
            let decoded=jwt.decode(token);
            console.log(decoded.id)
          
            var url ="http://localhost:9000/"+newstr
            var id =decoded.id
            this.controller.addpost(
              url,
              id,
              description
            ).then(result => {
              res.send(result);
            });

          }
        })
    })

    router.post("/addlike",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var postId = req.body.postId 
          this.controller.addlike(
            userId,
            postId
          ).then(result => {
            // console.log("resultAdd", result)
            res.send(result);
          });

        }
      })
    })


    router.post("/removelike",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var postId = req.body.postId 
          this.controller.removelike(
            userId,
            postId
          ).then(result => {
            // console.log("result",result)
            res.send(result);
          });

        }
      })
    })

    router.post("/addcomment",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var postId = req.body.postId 
          var comment = req.body.comment
          this.controller.addcomment(
            userId,
            postId,
            comment
          ).then(result => {
            // console.log("result",result)
            res.send(result);
          });

        }
      })
    })


    router.post("/replycomment",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var commentId = req.body.commentId 
          var replycomment = req.body.replycomment  
          this.controller.replycomment(
            userId,
            commentId,
            replycomment
          ).then(result => {
            // console.log("result",result)
            res.send(result);
          });

        }
      })
    })


    router.post("/addfollowers",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var followerId = req.body.followerId 
          var status= req.body.status
          this.controller.addfollowers(
            userId,
            followerId,
            status
          ).then(result => {
            // console.log("addfollowers", result)
            res.send(result);
          });

        }
      })
    })


    router.post("/removefollowers",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var followerId = req.body.followerId 
          this.controller.removefollowers(
            userId,
            followerId
          ).then(result => {
            console.log("removefollowers", result)
            res.send(result);
          });

        }
      })
    })


    router.post("/addreportpost",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var postId = req.body.postId 
          this.controller.addreportpost(
            postId,
            userId            
          ).then(result => {
            console.log("addreportpost", result)
            res.send(result);
          });

        }
      })
    })



    router.post("/deletepost",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var userId = decoded.id
          var postId = req.body.postId 
          this.controller.deletepost(
            postId,
            userId            
          ).then(result => {
            console.log("deletepost", result)
            res.send(result);
          });

        }
      })
    })




    router.post("/acceptfriendrequest",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var followerId = decoded.id
          var userId = req.body.userId 
          this.controller.acceptfriendrequest(
            userId,
            followerId                       
          ).then(result => {
            console.log("addreportpost", result)
            res.send(result);
          });

        }
      })
    })


    router.post("/deletefriendrequest",(req,res)=>{
      var token=(req.headers.token)
      jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
          res.status(401).send({
            message:"token invalid"
          });
        } else {         
          let decoded=jwt.decode(token);
          var followerId = decoded.id
          var userId = req.body.userId 
          this.controller.deletefriendrequest(
            userId,
            followerId                       
          ).then(result => {
            console.log("addreportpost", result)
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
  return new update(controller);
};
