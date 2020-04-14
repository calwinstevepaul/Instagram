var model=require('../models')


class updateController{
   
  async uplodePic(url,id){
    return await model.user.update(
      {
        profilePic:url
      },
      {
        where: { id:id }
      }
    )
  }

  async addpost(url,id,description){
    // console.log("calwin")
    return await model.post.create({
      userId:id,
      postPhoto:url,
      postDescription:description,

    })
  }

  async addlike(userId,postId){
    // console.log(userId,postId)
    return await model.like.create({
      userId:userId,
      postId:postId
    })
  }

  
  async removelike(userId,postId){
    // console.log(userId,postId)
    await model.like.destroy({
      where:{
        userId:userId,
        postId:postId
      }
    })
    return "Deleted"
  }

  async addcomment(userId,postId,comment){
    // console.log(userId,postId,comment)
    return await model.comment.create({
      userId:userId,
      postId:postId,
      comment:comment
    })
  }  
   

  async replycomment(userId,commentId,replycomment){
    console.log(userId,commentId,replycomment)
    return await model.replycomment.create({
      userId:userId,
      commentId:commentId,
      replycomments:replycomment
    })
  }
  
  async addfollowers(userId,followerId,status){
    // console.log(userId,followerId)
    return await model.followers.create({
      userId:userId,
      followerId:followerId,
      status:status 
    })
  }
  

  async removefollowers(userId,followerId){
    // console.log(userId,followerId)
    await model.followers.destroy({
      where:{
        userId:userId,
        followerId:followerId
      }
      
    })
    return "Deleted"

  }


  async addreportpost(postId,userId){
    var user= await model.report.findAll({
      where:{
        postId:postId,
        userId:userId
      }
    })
    
      if(user.length==0){
        return await model.report.create(
          {
            postId:postId,
            userId:userId
          },
         )
      }
 
  }

  async deletepost(postId,userId){
    console.log(postId,userId,"testttttt")
    await  model.post.destroy({
      where:{
        id:postId,
        userId:userId
      }
      
    })
    return "Deleted"

  }


  async acceptfriendrequest(userId,followerId ){
    return await model.followers.update(
      {
        status:true
      },
      { 
        where:{
          userId:userId,
          followerId:followerId
        }
      }
     )
  }

  async deletefriendrequest(userId,followerId ){
    await model.followers.destroy(
      
      { 
        where:{
          userId:userId,
          followerId:followerId
        }
      }
     )
     return "Deleted"

  }


  
}


module.exports = () => {
    return new updateController();
  };
  