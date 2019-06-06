import PopularBrands from './data/popular-brands';
import TrendingBrands from './data/trending-brands';
import PopularStyles from './data/popular-styles';
import Products from './data/products';
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

const BrandType = new GraphQLObjectType({
    name: 'BrandType',
    description: 'Brand model',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const ColorType = new GraphQLObjectType({
    name: 'ColorType',
    description: 'Color model',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        hex: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const SizeType = new GraphQLObjectType({
    name: 'SizeType',
    description: 'Size model',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const ImageType = new GraphQLObjectType({
    name: 'ImageType',
    description: 'Image model',
    fields: () => ({
        small: { type: GraphQLString },
        medium: { type: GraphQLString },
        large: { type: GraphQLString },
        retina: { type: GraphQLString },
    }),
});

const ProductType = new GraphQLObjectType({
    name: 'ProducType',
    description: 'Product model',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        priceLabel: { type: new GraphQLNonNull(GraphQLString) },
        // brand: { type: new GraphQLNonNull(BrandType) },
        // colors: { type: new GraphQLList(ColorType) },
        // sizes: { type: new GraphQLList(SizeType) },
        favoriteCount: { type: GraphQLInt },
        retailerId: { type: GraphQLInt },
        // images: { type: ImageType },
        condition: { type: GraphQLString },
    }),
});

const PoshQueryRootType = new GraphQLObjectType({
    name: 'PoshAppSchema',
    description: 'Root Posh App Schema',
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
        products: {
            args: {
                // title: { type: GraphQLString },
                // price: { type: GraphQLInt },
                // priceLabel: { type: GraphQLString },
                // brand: { type: BrandType },
                // colors: { type: new GraphQLList(ColorType) },
                // sizes: { type: new GraphQLList(SizeType) },
                // favoriteCount: { type: GraphQLInt },
                // retailerId: { type: GraphQLInt },
                // // images: { type: ImageType },
                // condition: { type: GraphQLString },
            },
            type: new GraphQLList(ProductType),
            description: 'List of Products',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    return filter(Products, args);
                }

                return Products
            },
        },
    }),
});

const schema = new GraphQLSchema({
    query: PoshQueryRootType,
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