import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Code already in products!'
            },
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Category already in products!'
            },
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z._-]+$/
            }
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 50],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        supplierCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._-]+$/
            }
        }
    }, {
        tableName: "products",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    return Product;
}