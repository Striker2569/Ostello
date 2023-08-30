const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
// require('dotenv').config({ path: '.env' });// To load environment variables

// console.log(process.env.DATABASE_URL)
// Initialize Sequelize to connect to your RDS database
const data = "mysql://harsh:9903018224@user-management.c1eduvcizaw1.ap-south-1.rds.amazonaws.com:3306/user";
const sequelize = new Sequelize(data, {
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
  console.log("Received event:", JSON.stringify(event, null, 2));
  let parsedBody;
  
  if (typeof event.body === "string") {
    try {
      parsedBody = JSON.parse(event.body);
    } catch (e) {
      console.error("Error parsing event.body:", e);
    }
  } else if (typeof event.body === "object") {
    parsedBody = event.body;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Bad Request: event.body is not in expected format." })
    };
  }

  // Your existing logic here
  try {
    // Parse and validate request body
    const { username, email, password } = JSON.parse(event.body);
    if (!username || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Username, email, and password are required.' })
      };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email format is invalid.' })
      };
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      })
    };

  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email already exists.' })
      };
    }
    // Handle other errors
    return error;
  }
};
