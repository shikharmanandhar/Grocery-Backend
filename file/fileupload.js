const multer= require('multer');


const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./images")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

//filter - only accepting valid file -png, jpg,gif

const filter=function(req,file,cb){
    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg' ||file.mimetype=='image/gif'){
        cb(null,true)
    }
    else{
        //invalid
        cb(null,false)
    }
}



const upload= multer({
    storage:storage,
    fileFilter:filter
})

module.exports=upload