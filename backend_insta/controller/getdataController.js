var model=require('../models')
let Op=require('sequelize').Op


class getdataController{
    async userinfo(id){
        return await model.user.findAll({
            where:{
                id:id
            }
        })    
            
    }

    async posts(id,limit,offset){
        let followings=await model.followers.findAll({ attributes:['followerId'],raw:true,
            where:{
                userId:id
            },
            
        })
        console.log(followings)
        let x=[id]
        
        followings.map(value=>{
            x.push(value.followerId)
        })
        console.log(x) 
        return await model.post.findAll({
            limit,
            offset,
            order:[["createdAt","DESC"]],
            where:{
                userId:x                
            },
            include:[
                {
                model:model.user
            },
            {
                model:model.like,
                include:[{
                    model:model.user,
                    attributes:['name']
                }]
            },
            {
                model:model.comment,
                include:[{
                    model:model.user,
                    attributes:['name']
                },{
                    model:model.replycomment,
                    include:[{
                        model:model.user,
                        attributes:['name']
                    }]
                }]
            },
            {
                model:model.report

            }]
            
        })
    }

    async otheruserposts(id){
        return await model.post.findAll({
            where:{
                userId:id
            }
            // include:[
            //     {
            //     model:model.user
            // },
            // {
            //     model:model.like,
            //     include:[{
            //         model:model.user,
            //         attributes:['name']
            //     }]
            // },{
            //     model:model.comment,
            //     include:[{
            //         model:model.user,
            //         attributes:['name']
            //     },{
            //         model:model.replycomment,
            //         include:[{
            //             model:model.user,
            //             attributes:['name']
            //         }]
            //     }]
            // }]
            
        })
    }

    async otherusers(key){
        return await model.user.findAll({
            where:{
                name:{
                    [Op.iLike]:key+'%'
                }    
            }
        })
    }

    async getfollowing(id){
        return await model.followers.findAll({
            where:{
                userId:id                
            },
            include:[{
                model:model.user
            },{
                model:model.user,
                as:'follower'
            }]
        })    
            
    }

    async getfollower(id){
        return await model.followers.findAll({
            where:{
                followerId:id,
                status:true                
            },
            include:[{
                model:model.user
            },{
                model:model.user,
                as:'follower'
            }]
        })    
            
    }


    async isfollowerstate( userId,followerId){
        return await model.followers.findAll({
            where:{
                userId:userId,
                followerId:followerId
            }
        })    
            
    }

    async followreq(followerId){
        return await model.followers.findAll({
            where:{
                status:false,
                followerId:followerId
            },
            include:[{
                model:model.user
            }]

            
        })    
            
    }



}

module.exports= ()=>{
    return new getdataController();
}