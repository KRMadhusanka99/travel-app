const router = require("express").Router();
const User = require("../modules/User");
const bcrypt = require('bcrypt');

//register user
router.post("/register", async (req,res)=>{
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // create new user
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // save and send the response
        const user = await newUser.save();
        res.status(200).json(user._id)
    }catch(err){
        res.status(500).json(err)
    }
})

//login user
router.post("/login", async(req,res)=>{
    try{
        //find user
        const user = await User.findOne({username:req.body.username});
        if(user){
            //validate password
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            !validPassword && res.status(400).json({err:"username or password is incorrect"});
            
            //send res
            res.status(200).json({_id:user._id, username:user.username});
        }else{
            res.status(400).json({err:"username or password is incorrect"}); //400-credential error
        }

    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;