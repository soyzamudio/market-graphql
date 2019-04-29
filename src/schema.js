import PopularBrands from './data/popular-brands';
import TrendingBrands from './data/trending-brands';
import PopularStyles from './data/popular-styles';
import filter from 'lodash/filter';

import {
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
} from 'graphql';

const PopularBrandType = new GraphQLObjectType({
    name: 'PopularBrand',
    description: 'Popular brand of the week',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const TrendingBrandType = new GraphQLObjectType({
    name: 'TrendingBrand',
    description: 'Trending brand of the week',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const PopularStyleType = new GraphQLObjectType({
    name: 'PopularStyle',
    description: 'Popular style of the week',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const TodoQueryRootType = new GraphQLObjectType({
    name: 'TodoAppSchema',
    description: 'Root Todo App Schema',
    fields: () => ({
        popularBrands: {
            args: {
                title: { type: GraphQLString },
                image: { type: GraphQLString },
                url: { type: GraphQLString },
            },
            type: new GraphQLList(PopularBrandType),
            description: 'List of Popular Brands',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    return filter(PopularBrands, args);
                }

                return PopularBrands
            },
        },
        popularStyles: {
            args: {
                title: { type: GraphQLString },
                image: { type: GraphQLString },
                url: { type: GraphQLString },
            },
            type: new GraphQLList(PopularStyleType),
            description: 'List of Popular Styles',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    return filter(PopularStyles, args);
                }

                return PopularStyles
            },
        },
        trendingBrands: {
            args: {
                title: { type: GraphQLString },
                url: { type: GraphQLString },
            },
            type: new GraphQLList(TrendingBrandType),
            description: 'List of Trending Brands',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    return filter(TrendingBrands, args);
                }

                return TrendingBrands
            },
        },
    }),
});

const schema = new GraphQLSchema({
    query: TodoQueryRootType,
});

export default schema;


// const UserType = new GraphQLObjectType({
//     name: 'User',
//     description: 'Users in company',
//     fields: () => ({
//         id: { type: new GraphQLNonNull(GraphQLInt) },
//         first_name: { type: new GraphQLNonNull(GraphQLString) },
//         last_name: { type: new GraphQLNonNull(GraphQLString) },
//         email: { type: GraphQLString },
//         gender: { type: GraphQLString },
//         department: { type: GraphQLString },
//         country: { type: GraphQLString },
//         todo_count: {
//             type: GraphQLInt,
//             resolve: (user) => sumBy(Todos, todo => todo.userId === user.id ? 1:0)
//         },
//         todos: {
//             type: new GraphQLList(TodoType),
//             resolve: (user, args) => filter(Todos, todo => todo.userId === user.id)
//         },
//     }),
// });

// const TodoType = new GraphQLObjectType({
//     name: 'Todo',
//     description: 'Task for user',
//     fields: () => ({
//         id: { type: new GraphQLNonNull(GraphQLInt) },
//         title: { type: GraphQLString },
//         completed: { type: new GraphQLNonNull(GraphQLBoolean) },
//         user: {
//             type: UserType,
//             resolve: (todo, args) => find(Users, user => user.id === todo.userId),
//         },
//     }),
// });