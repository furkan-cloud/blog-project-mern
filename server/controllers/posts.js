import Post from "../models/posts.js";

export const getPosts =  async (req, res) => {
    try {
        const posts = await Post.find(); // VERİTABANINDAKİ POSTLARI BUL GETİR
        res.status(200).json(posts)
    } catch(error) {
        res.status(404).json({
            message: error.message,
        })
    }

}