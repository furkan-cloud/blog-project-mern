import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { updatePost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
  //   paper: {
  //     padding: theme.spacing(2),
  //   },
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const EditPostForm = ({ history, post, closeEditMode }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(post?.image);

  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    const updatedPost = {
      _id: post._id,
      ...data,
      image: file,
    };
    dispatch(updatePost(post._id, updatedPost));

    reset();
    setFile(null);
    closeEditMode();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="title"
          label="Title"
          name="title"
          variant="outlined"
          className={classes.textField}
          size="small"
          inputRef={register}
          error={errors.title ? true : false}
          fullWidth
          defaultValue={post?.title}
        />
        <TextField
          id="subtitle"
          label="Subtitle"
          name="subtitle"
          variant="outlined"
          className={classes.textField}
          size="small"
          inputRef={register}
          error={errors.subtitle ? true : false}
          fullWidth
          defaultValue={post?.subtitle}
        />
        <Controller
          as={
            <Select input={<Input />} className={classes.textField} fullWidth>
              {tags.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          }
          name="tag"
          control={control}
          error={errors.tag ? true : false}
          defaultValue={post?.tag}
        />
        <TextField
          id="content"
          label="Content"
          name="content"
          multiline
          rows={4}
          variant="outlined"
          className={classes.textField}
          size="small"
          inputRef={register}
          error={errors.content ? true : false}
          fullWidth
          defaultValue={post?.content}
        />
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <div className={classes.buttons}>
          <Button color="primary" variant="outline" onClick={closeEditMode}>
            Cancel
          </Button>
          <Button color="primary" variant="outline" type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
