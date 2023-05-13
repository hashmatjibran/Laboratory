module.exports.index = function (request , response) {
    
    return response.status(200).json({
        message:"version 2 Api",
        posts:[]
    })

}