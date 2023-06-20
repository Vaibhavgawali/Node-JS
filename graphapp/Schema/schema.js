const graphql=require("graphql")
let axios = require("axios")

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString
} = graphql;

const ProductType=new GraphQLObjectType({
    name:'Products',
    fields:{
        "id": {type:GraphQLInt},
        "product_name": {type:GraphQLString},
        "category": {type:GraphQLString},
        "category_id": {type:GraphQLInt},
        "Price": {type:GraphQLInt},
        "Size": {type:GraphQLString},
        "Image": {type:GraphQLString},
        "Color": {type:GraphQLString},
        "company": {type:GraphQLString}
    }
})

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Products:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve:(parentvalue,args)=>{
                return axios.get(`http://localhost:2900/products/${args.id}`)
                .then((res)=> res.data)
            }
        }
    }
})

module.exports =new GraphQLSchema({
    query:RootQuery
})


/*
{
    Products(id: 6) {
      product_name,
      category,
      Color
    }
}
*/