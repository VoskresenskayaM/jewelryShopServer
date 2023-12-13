const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const { regPassword } =  '../utils.js'

const User = sequelize.define('user', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, validate: {
        isEmail: true,  
    }},
    password: {type: DataTypes.STRING, is: regPassword 
    },
    role: {type: DataTypes.STRING, defaultValue: "User"}
})

const Basket = sequelize.define('basket', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketProduct = sequelize.define('basketproduct', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER,  autoNull: false}
})

const Product = sequelize.define('product', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, autoNull: false, validate : {
        max: 100,                 
        min: 5,
    }},
    price: {type: DataTypes.INTEGER,  autoNull: false},
    rating: {type: DataTypes.INTEGER,  defaultValue: 0, validate : {
        max: 5,                 
        min: 0,
    }},
    img: {type: DataTypes.STRING, autoNull: false},
    description: {type: DataTypes.STRING, autoNull: false }
   
})

const Type = sequelize.define('type', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, autoNull: false}
})

const Material = sequelize.define('material', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, autoNull: false}
})

const Brand = sequelize.define('brand', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, autoNull: false}
})

const Rating = sequelize.define('rating', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,  autoNull: false},
    rate: {type: DataTypes.INTEGER,  autoNull: false},
    description: {type: DataTypes.STRING, autoNull: false}
})

const TypeBrand = sequelize.define('typebrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const UserLikes = sequelize.define('likes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(Rating)
Rating.belongsTo(Product)

User.hasMany(Rating)
Rating.belongsTo(User)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Type)

Material.hasMany(Product)
Product.belongsTo(Material)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

User.belongsToMany(Product,{through: UserLikes})
Product.belongsToMany(User, {through: UserLikes})

/*Rating.belongsToMany(Product,{through: Rating})
Rating.belongsToMany(User, {through: Rating})*/

module.exports = {
    User,
    Basket,
    Rating,
    BasketProduct,
    Product,
    Brand,
    Type,
    Material,
    TypeBrand,
    UserLikes
}








