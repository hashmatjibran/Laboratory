module.exports.index = function (request , response) {
        return response.status(200).json({
            message:'list of Posts',
            posts:[]
        });
}