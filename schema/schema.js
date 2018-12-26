const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLList, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

//dummy data
let books = [
    {name: 'Name of the Wind', genre: 'Fantasy', authorId: '1', id: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', authorId: '2', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', authorId: '3', id: '3'}
]
let authors = [
    {name: 'Patrick Rothfuss', age: 44, booksIds: ['1'], id: '1'},
    {name: 'Brandon Sanderson', age: 42, booksIds: ['2'], id: '2'},
    {name: 'Terry Pratchett', age: 66, booksIds: ['3'], id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id:parent.authorId });
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { type: GraphQLList(BookType) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                // code to get data from db/other source
                return _.find(books, { id:args.id });
            }
        },
        getBooks: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // code to get data from db/other source
                return books;
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                // code to get data from db/other source
                return _.find(authors, { id:args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});