
import mongoose from 'mongoose';


const Connection = async (url) =>{
  
  try {
    await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log('Database connected successfully');
} catch (error) {
    console.log('Error while connecting to the database ', error);
}
};


export default Connection; 

