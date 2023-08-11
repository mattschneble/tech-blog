// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create BlogPost model
class BlogPost extends Model {}

// create table columns and configuration for BlogPost model
BlogPost.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text:{
            type: DataTypes.TEXT,
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
        }
    },
    
    // configure metadata
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blogpost'
    }
);

// export BlogPost model
module.exports = BlogPost;