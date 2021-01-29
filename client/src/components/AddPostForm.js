import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Button,
  Text,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm, Controller } from "ract-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

export const AddPostForm = ({ open, handleClose }) => {
  const { register, handleSubmit, control, errors, reset } = useForms({
    resolver: yupResolver(postSchema),
  });

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Article</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the form for adding new article
        </DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={}>
            <TextField
              id="title"
              label="Başlık"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id="subtitle"
              label="Alt Başlık"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.subtitle ? true : false}
              fullWidth
            />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
