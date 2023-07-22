const http = require('http')
const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')
const modules = require('./modules')
const cors = require('cors')
const router = require('./controllers')
const { PORT } = require('./config')

app.use(cors())
app.use(express.json());
app.use(router)

const server = new ApolloServer({
    modules,
    introspection: true,
    playground: true
})

const httpServer = http.createServer(app)
server.applyMiddleware({ app })

httpServer.listen({ port: PORT }, () => {
    console.log(PORT + server.graphqlPath)
})