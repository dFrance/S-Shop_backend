const bcrypt = require('bcrypt');
const User = require('../Models/User');
const yup = require('yup')
const config = require('../Config/auth')
const jwt = require('jsonwebtoken')

class LoginController {

    index(req, res) {
        const { email, password } = req.body;


    }

    async login(req, res) {
        const { email, password } = req.body;
        // var userExist;

        let schema = yup.object().shape({
            email: yup.string().email('Endereço de email inválido').required('Email obrigatório.'),
            password: yup.string().min(8, 'A senha deve conter no mínimo 8 caracteres').required('Senha obrigatória')
        })

        if (!(await schema.isValid(req.body))) {
            let errorMessage = []
            await schema.validate(req.body).catch((e) => errorMessage = e.errors[0])
            return res.status(400).json({
                error: true,
                message: errorMessage
            })
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({
                error: true,
                message: "Email e/ou senha incorreto."
            })
        }
        if (!(await bcrypt.compare(password, userExist.password))) {
            return res.status(400).json({
                error: true,
                message: "Email e/ou senha incorreto."
            })
        }
        return res.status(200).json({
            user: {
                name: userExist.name,
                email: userExist.email
            },
            token: jwt.sign({
                id: userExist._id
            }, config.secret, {
                expiresIn: config.expireIn
            })
        })
    }
}

module.exports = new LoginController();