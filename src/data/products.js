const Products = [
    {
        id: 1,
        title: 'Product 1',
        price: 120,
        priceLabel: '$120',
        brand: {
            id: 1,
            name: 'Brand 1',
        },
        colors: [
            { name: 'blue', hex: '#E3E3E3', id: 1 },
        ],
        sizes: [
            { name: 'XS', id: 1 }
        ],
        favoriteCount: 0,
        retailerId: 123456,
        images: [
            {
                small: '',
                medium: '',
                large: '',
                retina: '',
            }
        ],
        condition: 'new'
    },
];

export default Products;