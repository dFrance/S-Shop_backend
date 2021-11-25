const Product = require('../Models/Product')

class ProductController{
    getProducts(req, res){
        Product.find({}).then((product) => {
            return res.json(product)
        })
        .catch((err) => {
            return res.status(400).json({
                error: true,
                message: "Não foi possível acessar o banco de dados."
            })
        })
    }


    async store(req, res){
        const {name, description, price} = req.body; 

        const productData = {
            name,
            description,
            price,
            quantity: 1
        }

        await Product.create(productData, (err) => {
            if(err){
                return res.status(400).json({
                    error: true,
                    message: "Erro ao cadastrar um novo produto!"
                })
            }
            return res.status(200).json({
                error: false,
                message: "Um novo produto cadastrado!"
            })

        })
    }
}

module.exports = new ProductController();