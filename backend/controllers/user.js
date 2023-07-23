const User = require('../models/details');

exports.getUserDetails = (req,res,next) => {
    User.findAll()
    .then(users => {
        res.status(200).json({users: users}) // 200 -> ok - getting response
        // WONT THIS METHOD WORK, BELOW ONE???
        // res.status(200).render('/user/get-users', {
        //     users: users,
        //     pageTitle: 'All Users',
        // //     path: '/user/get-users'
        // })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
}

exports.postUserDetails = (req,res,next) => {
    // try {
    console.log(req.body);
    const name = req.body.userName; 
    const number = req.body.phoneNumber;
    const mail = req.body.email;
    const usernew = User.create({
        userName: name,
        phoneNumber: number,
        email: mail
    })
    // console.log(usernew);
    // res.status(201).json({users: usernew});
    // }
    .then(result => {
        console.log(result);
        // res.status(201).redirect('/user/get-users');
        res.status(201).json({users: result}); // user is created successfully
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
}

exports.deleteUserDetails = (req,res,next) => {
    const uId = req.params.id;
    User.findByPk(uId)
    .then(user => {
        return user.destroy();
    })
    .then(result => {
        res.status(200);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
}