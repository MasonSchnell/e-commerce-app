const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Category extends Model {
    static associate(models) {
        Category.hasMany(models.Product, { foreignKey: "category_id" });
    }
}

Category.init(
    {
        // define columns
        title: {
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
