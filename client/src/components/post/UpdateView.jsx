import { useState, useEffect } from "react";
import {
  Box,
  makeStyles,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@material-ui/core";
import { AddCircle as Add, AddCircle, CallEnd } from "@material-ui/icons";
import { getPost, updatePost , uploadFile} from "../../service/api";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles({
  container: {
    margin: "50px 100px",
  },
  image: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  form: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  textfield: {
    flex: 1,
    margin: "0 30px",
    fontSize: 25,
  },
  textarea: {
    width: "100%",
    border: "none",
    marginTop: 50,
    fontSize: 18,
  },
});

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "Anisha singh",
  categories: "",
  createdDate: new Date(),
};

const UpdateView = (match) => {
  const classes = useStyle();
  const history = useHistory();
  const [post, setPost] = useState({ initialPost });
  const [file , setFile] = useState('');
  const [image , setImage] = useState('');

  const url =  post.picture ? post.picture:
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  


    useEffect(() => {
      const getImage = async () => { 
          if(file) {
              const data = new FormData();
              data.append("name", file.name);
              data.append("file", file);
              
             const image = await uploadFile(data);
              post.picture = image.data;
              setImage(image.data);
          }
      }
      getImage();
     
  }, [file])
    useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      setPost(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlogPost = async () => {
    await updatePost(match.params.id, post);
    history.push(`/details/${match.params.id}`);
  };

  return (
    <Box className={classes.container}>
      <img src={url} alt="post" className={classes.image} />

      <FormControl className={classes.form}>

       <label htmlFor="fileInput">
        <AddCircle fontSize="large" color="action" />
        </label>
        <input 
        type="file"
        id="fileInput"
        style={{display:'none'}}
        onChange={(e) => setFile(e.target.file[0])}
        /> 
        <InputBase
          onChange={(e) => handleChange(e)}
          value={post.title}
          name="title"
          placeholder="Title"
          className={classes.textfield}
        />
        <Button
          onClick={() => updateBlogPost()}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </FormControl>

      <TextareaAutosize
        rowsMin={8}
        placeholder="Tell your story..."
        className={classes.textarea}
        name="description"
        onChange={(e) => handleChange(e)}
        value={post.description}
      />
    </Box>
  );
};
export default UpdateView;
