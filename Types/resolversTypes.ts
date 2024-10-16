export type DatabaseError = {
    type: 'DatabaseError';
    message: string;
  };
  
export  type ValidationError = {
    type: 'ValidationError';
    message: string;
  };
  


  
export type Profile = {
  id:             String
  email:          String
  fullName:       String
  job:            String
  phone:          number
  website:        String
  location:       String
  facebook:       String
  twitter:        String
  youtube:        String
  profilePicture: String
}
 
export type New = {
  newProfile : NewProfile
}

export type getMessage = {
  newMessage: Message
}

export type Message = {
  message :      string
  hour :      number
  minute :      number
  day :      number
  month :      string
  senderId :      string
  receiverId :      string
  ampm :      string
  picture   :      string
}


export type NewProfile = {
  email:          string
  fullName:       string
  job:            string
  phone:          number
  website:        string
  location:       string
  facebook:       string
  twitter:        string
  youtube:        string
  profilePicture: string
}
