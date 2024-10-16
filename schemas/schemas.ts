import { gql } from'apollo-server-express'

const typeDefs = gql`
  type Profile {
    id:             ID!
    email:          String
    fullName:       String
    job:            String    
    phone:          Int
    website:        String
    location:       String
    facebook:       String
    twitter:        String
    youtube:        String
    profilePicture: String
  }

  type Message {
    id:         ID!
    message:    String
    hour:       Int
    minute:     Int
    day:        Int
    month:      String
    senderId:   String
    receiverId: String
    ampm:       String
    picture:    String
  }


  input NewMessage {
    message:    String
    hour:       Int
    minute:     Int
    day:        Int
    month:      String
    senderId:   String
    receiverId: String
    ampm:       String
    picture:    String
  }

  input NewProfile { 
    email:          String
    fullName:       String
    job:            String
    phone:          Int
    website:        String
    location:       String
    facebook:       String
    twitter:        String
    youtube:        String
    profilePicture: String    
  }

  type Query {
    getIndividualProfileById(email:String!): Profile!
  }


  type Mutation {
    createNewProfile(newProfile: NewProfile): Profile!
    sendNewMessage(newMessage: NewMessage):Message! 
    updateUserProfile(email: String!): Profile!
  }

`

export default typeDefs