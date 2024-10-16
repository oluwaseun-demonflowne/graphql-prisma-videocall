import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from 'express';
// const app: Express = express();
const prisma = new PrismaClient();
const router = express.Router()

router.patch("/users/:id", async (req:Request, res:Response) => {
    const {
        fullName,
        job,
        location,
        phone,
        profilePicture,
    } = req.body
    try {
        
        const user = await prisma.user.findUnique({
            where: {
              email: req.params.id,
            },
        });
        
        if(user) {
          await prisma.user.update({
              where: {
                  email: req.params.id
              },
              data: {
                fullName:fullName === '' ? user.fullName : fullName,
                job:job === '' ? user.job : job,
                location:location === '' ? user.location : location,
                phone:phone === 0 ? user.phone : phone,
                profilePicture:profilePicture === '' ? user.profilePicture : profilePicture,
              }
          })
          return res.status(200).json({message: "User updated successfully"})
        }
        else {
            return res.status(404).json({message: "User not found"})
        }
      
    } catch (error: any) {
        return res.status(404).json({message: "Error finding user"})
    }
  })

router.get('/chats/:sender/:receiver', async (req:Request, res:Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.params.sender,
        },
      });

      if(user){
      const messagesBetweenUsers = await prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: user.id,
              receiverId: req.params.receiver,
            },
            {
              senderId: req.params.receiver,
              receiverId:  user.id,
            },
          ],
        },
        orderBy: {
          timestamp: 'asc', // Order by timestamp in ascending order (older first)
        },
        include: {
          User_Message_receiverIdToUser : true,
          User_Message_senderIdToUser: true
      }
      });
      res.json(messagesBetweenUsers)
    }
    
      
    } catch (error) {
      console.log(error)
    }
})



module.exports = router

