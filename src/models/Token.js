import { DataTypes } from "sequelize";

export default (sequelize)=>{
    const Token = sequelize.define("Token", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        isValid:{
            type: DataTypes.BOOLEAN,
            defaultValue:true
        }
    },{
        tableName: "tokens",
        underscored: true,
        timestamps: true,
        paranoid: true,
    })

    Token.associate = (models)=>{
        Token.belongsTo(models.User, {
            foreignKey: "user_id"
        })
    }

    return Token
}