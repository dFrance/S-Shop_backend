const mongoose = require('mongoose')


class Connection {
    constructor(){
        this.dataBaseConnectionMongoDB();
    }

    
    dataBaseConnectionMongoDB(){
        mongoose.connect('mongodb://localhost:27017/s-shop')
        .then(()=>{console.log('Conectado ao banco de dados com sucesso.')})
        .catch((err) => {console.log('Houve um problema ao conectar ao banco de dados.')})
    }
}

module.exports = new Connection();