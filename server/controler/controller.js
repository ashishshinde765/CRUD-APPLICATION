var Userdb = require('../model/model');

//Create and Save User
exports.create = (req, res) => {
    //route.post('/api/users', controller.create);
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in database
    user
        .save(user)
        .then(data => {
           // res.send(data)
           res.redirect('/add_user');
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrive and return all user   //retrive and return a single user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:'Now found user with id' + id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error retrieving user with id" + id})
        })
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Ocurred while retrieving user information"
            })
        })
    }
}

//Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to Update cannot be empty" })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update user with ${id}. Maybe user not found!'
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error Update User Information'
            })
        })
}

//Delet a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Delete with id ${id}. Maybe id is wrong'
                })
            } else {
                res.send({
                    message: "User was deleted succesfully!!"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"cvnnot delete user data with id=" + id
            });
        });
}