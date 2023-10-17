// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
// const Category = require("./Category.js");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
    static associate(models) {
        Product.belongsTo(models.Category, { foreignKey: "category_id" });
    }
}

// set up fields and rules for Product model
Product.init(
    {
        // define columns
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            // CHECK IF FLOAT IS VALID
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                isNumeric: true,
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "product",
    }
);

module.exports = Product;
