const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
// require('dotenv').config({ path: '.env' });// To load environment variables

// console.log(process.env.DATABASE_URL)
// Initialize Sequelize to connect to your RDS database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql'
});

// Define the User model according to your assignment's specifications
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

exports.handler = async (event) => {
  try {
    const { id, newEmail, newUsername } = JSON.parse(event.body);
    const user = await User.findByPk(id);

    if (user) {
      user.email = newEmail;
      user.username = newUsername;
      await user.save();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User updated successfully' })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
