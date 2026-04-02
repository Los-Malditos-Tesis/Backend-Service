import { DataTypes } from "sequelize";
import { encryptPassword, comparePassword } from "../libs/encrypt/encrypt.js";

export default (sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email already in user!'
            },
            set(value) {
                this.setDataValue('email', value.trim().toLowerCase());
            },
            validate: {
                isEmail: {
                    msg: 'Must be a valid email address'
                },
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    }, {
        tableName: "users",
        underscored: true,
        timestamps: true,
        paranoid: true,

        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await encryptPassword(user.password)
                }
            },

            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    user.password = await encryptPassword(user.password)
                }
            }
        }
    })

    User.prototype.validatePassword = async function (password) {
        if (!this.password) return false;
        return comparePassword(password, this.password)
    }

    User.associate = (models) => {
        User.belongsToMany(models.Role, {
            through: "user_role",
            foreignKey: "user_id",
            otherKey: "role_id"
        });

        User.hasMany(models.Token, {
            foreignKey: "user_id"
        });

        User.hasMany(models.Audit, { foreignKey: "user_id" })
    };

    return User;
}