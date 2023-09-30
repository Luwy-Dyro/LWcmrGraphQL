const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async() => {
    try{

        await mongoose.connect(process.env.DB_MONGO, {
            // useNewUrlParser: true,
            // useUnifiedTipology: true,
            // useFindAndModif: false,
            // useCreateIndex: true
        });
        console.log("DB connect");

    }catch(error){
        console.log("Hubo error");
        console.log(error);
        process.exit(1); // detiene APP


    }
}


module.exports = conectarDB;