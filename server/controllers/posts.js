import Post from "../models/posts.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // VERİTABANINDAKİ POSTLARI BUL GETİR
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost); // post eklendiğinde hemen sayfada görünmesi için, aksi halde sayfayı refresh yapmak gerekeiyor
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
