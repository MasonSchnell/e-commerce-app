const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {
    static associate(models) {
        ProductTag.belongsToMany(models.Product, { foreignKey: "product_id" });
        ProductTag.belongsToMany(models.Tag, { foreignKey: "tag_id" });
    }
}

ProductTag.init(
    {
        // define columns
        product_id: {
            type: DataTypes.INTEGER,
        },
        tag_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "product_tag",
    }
);

module.exports = ProductTag;
