const { ApolloServer} = require ('apollo-server');
const typeDefs = require ('./db/schema')
const resolvers = require ('./db/resolvers')
const conectarDB = require('./config/db')
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
//Connect DB

conectarDB();

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: ({req}) => {
        // console.log(req.headers['authorization'])

        //console.log(req.headers);

        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET );
                // console.log(usuario);
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error');
                console.log(error);
            }
        }
    }

})



//Inicia el seridor
server.listen({port: process.env.PORT || 4000}).then(({url}) =>{
    console.log(`Servidor listo en la URL ${url}`);
} )

// const port = Number.parseInt(process.env.PORT) || 4000;

// const { url } = await startStandaloneServer(server, { listen: { port } });

// console.log(`🚀 Server listening at: ${url}`);