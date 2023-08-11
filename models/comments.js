// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comments model
class Comments extends Model {}

// create table columns and configuration for Comments model
Comments.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text:{
            type: DataTypes.STRING,
            allowNull: false
        },
        post_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        blogpost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogpost',
                key: 'id'
            }
        },
    },

    // configure metadata
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments'
    }
);

// export Comments model
module.exports = Comments;