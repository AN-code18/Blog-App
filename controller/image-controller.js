import grid from 'gridfs-stream'; // to convert image file
import mongoose from "mongoose";

const url = "http://localhost:8000";


let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadImage = (request, response) => {
  try {
    if (!request.file) return response.status(404).json("File not found");

    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);
  } catch {
    error;
  }
  {
   return ("error while uploading image", error);
  }
};

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        // changing into image 
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json('Failed to fetch image', error);
    }
}
