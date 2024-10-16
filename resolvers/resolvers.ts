import { PrismaClient, Prisma } from ".prisma/client";
import { DatabaseError, Profile, ValidationError , getMessage } from "../Types/resolversTypes";


const prisma = new PrismaClient();


const resolvers = {
      Query: {
          getIndividualProfileById: async (_:string ,{email}: {email:string} ) : Promise<Profile | null> => {
            try {
                return await prisma.user.findUnique({
                  where: {
                    email 
                  }
                });
            } catch(error){
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                  const customError: DatabaseError = {
                    type: 'DatabaseError',  
                    message: 'Database error occurred.',
                  };
                  throw customError;
                } else if (error instanceof Prisma.PrismaClientValidationError) {
                  const customError: ValidationError = {
                    type: 'ValidationError',
                    message: 'Validation error occurred.',
                  };
                  throw customError;
                } else {
                  throw error;
                }
            }
          },
      },
      Mutation: {
        async createNewProfile(_:string, {newProfile: {
          fullName,job,phone,website,location,facebook,email,twitter,youtube, profilePicture 
        }}: New ): Promise<Profile>{
            try{
                return await prisma.user.create({
                    data:{
                      fullName,email,job,phone,website,location,facebook,twitter,youtube ,profilePicture
                    }
                });
                
            } catch(error){
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                  const customError: DatabaseError = {
                    type: 'DatabaseError',  
                    message: 'Database error occurred.',
                  };
                  throw customError;
                } else if (error instanceof Prisma.PrismaClientValidationError) {
                  const customError: ValidationError = {
                    type: 'ValidationError',
                    message: 'Validation error occurred.',
                  };
                  throw customError;
                } else {
                  throw error;
                }
            }
        },
        async sendNewMessage(_:string, {newMessage:{
          message,hour,minute,day,month,senderId,receiverId,ampm,picture  
        } }: getMessage) {
          try {
            return await prisma.message.create({
              data:{
                message,hour,minute,day,month,senderId,receiverId,ampm, picture
              }
          });
          } catch (error) {
            console.log(error) 
          }
        }
      }
}

export default resolvers