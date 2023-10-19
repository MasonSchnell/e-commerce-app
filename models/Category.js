const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Category extends Model {
    static associate(models) {
        Category.hasMany(models.Product, {
            foreignKey: "category_id",
            onDelete: "SET NULL",
        });
    }
}

Category.init(
    {
        // define columns
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "category",
    }
);

module.exports = Category;
