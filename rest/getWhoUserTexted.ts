import { PrismaClient } from ".prisma/client";
import express, { Request, Response } from 'express';
// const app: Express = express();
const prisma = new PrismaClient();
const router = express.Router()

router.get('/user/:email', async (req:Request, res:Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: req.params.email,
            },
            select: {
              Message_Message_receiverIdToUser: {
                select: {
                  User_Message_senderIdToUser: {
                    select: {
                      email: true,
                      profilePicture: true,
                    },
                  },
                },
              },
              Message_Message_senderIdToUser: {
                select: {
                  User_Message_receiverIdToUser: {
                    select: {
                      email: true,
                      profilePicture: true,
                    },
                  },
                },
              },
            },
          });
          res.json(user);
          
    
      
    } catch (error) {
      console.log(error)
    }
})



module.exports = router

