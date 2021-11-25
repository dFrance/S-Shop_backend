const User = require('../Models/User')
const bcrypt = require('bcrypt');
const yup = require('yup')

class UserController {

    async addUser(req, res){
        let schema = yup.object().shape({
            name: yup.string().min(3, "Digite seu nome completo").required('Nome obrigatório.'),
            email: yup.string().email('Endereço de email inválido').required('Email obrigatório.'),
            password: yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('Senha obrigatória')
        })

        if(!(await schema.isValid(req.body))){
            let errorMessage = []
            await schema.validate(req.body).catch((e) => errorMessage = e.errors[0])
            return res.status(400).json({
                error: true,
                message: errorMessage
            })
        }
        

        const {name, email, password} = req.body; 

        const userData = {
            name,
            email,
            password,
        }

        userData.password = await bcrypt.hash(userData.password, 8)

        await User.create(userData, (err) => {
            if(err){
                // console.log(err)
                return res.status(400).json({
                    error: true,
                    message: "Erro ao cadastrar um novo usuário!"
                })
            }
            return res.status(200).json({
                error: false,
                message: "Um novo usuário cadastrado!"
            })
        })
    }
}

module.exports = new UserController();