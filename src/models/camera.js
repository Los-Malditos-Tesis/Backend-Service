import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Camera = sequelize.define("Camera", {
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
                msg: 'Code already in cameras!'
            },
            validate: {
                notEmpty: true,
                len: [3, 30],
                is: /^[a-zA-Z0-9._-]+$/
            }
        },
        api_key: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        tableName: "cameras",
        underscored: true,
        timestamp: true,
        paranoid: true
    })

    Camera.associate = (models) => {
        Camera.belongsTo(models.Location, { foreignKey: "location_id", as: "location" });
        Camera.hasMany(models.ScanEvent, { foreignKey: "camera_id" });
    }

    return Camera;
}