module.exports.getPosts = async (req, res) => {
    res.send("Hello " + req.params.postId)
}