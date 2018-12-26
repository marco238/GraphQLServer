const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();

app.use('/graphql', cors(corsOptions), graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests in port 4000');
})