// import modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Users model
class Users extends Model {}

// create table columns and configuration for Users model
Users.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // define a minimum password length and use only letters and numbers
                len: [8],
                isAlphanumeric: true
            }
        }
    },

    // create hooks to hash the password before creating the object instance and updating it
    {
        hooks: {
            // set up new user to have hashed password
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 5)
                return newUserData;
            },
            // set up updated user to have hashed password
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 5)
                return updatedUserData;
            }
        },
        
    // configure metadata
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'users'
    }
);

// export Users model
module.exports = Users;