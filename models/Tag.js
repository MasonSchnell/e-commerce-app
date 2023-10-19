const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

const Product = require("./Product");

class Tag extends Model {
    static associate(models) {
        Tag.belongsToMany(models.Product, {
            through: "ProductTag",
            foreignKey: "tag_id",
        });
    }
}

Tag.init(
    {
        // define columns
        tag_name: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "tag",
    }
);

Tag.belongsToMany(Product, { through: "ProductTag" });

module.exports = Tag;
