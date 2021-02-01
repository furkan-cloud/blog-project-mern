import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Paper, Divider, Button, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// import EditPostForm from "./EditPostForm";
import noImage from "../images/noimage.svg";
import moment from "moment";
import { fetchSinglePost, deletePost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    width: "100%",
    borderRadius: 5,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const PostDetails = ({ match, history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = match.params;

  const currentPost = useSelector((state) => state.posts.currentPost);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <div>
        <div className={classes.header}>
          <Typography variant="h5" gutterBottom>
            {currentPost?.title}
          </Typography>
          <div>
            <Button
              style={{ marginRight: 10 }}
              color="primary"
              variant="outlined"
              startIcon={<EditIcon />}
            >
              Düzenle
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Sil
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <Typography variant="overline" gutterBottom>
        {currentPost?.subtitle}
      </Typography>
      <Typography variant="caption" component="p">
        {convertRelativeTime(currentPost?.createdAt)} by Furkan
      </Typography>
      <Chip
        label={` # ${currentPost?.tag}`}
        variant="outlined"
        className={classes.chip}
      />
      <div className={classes.content}>
        <img
          src={currentPost?.image || noImage}
          alt="Post"
          className={classes.image}
        />
        <Typography variant="body1" gutterBottom>
          {currentPost?.content}
        </Typography>
      </div>
    </Paper>
  );
};

export default PostDetails;
