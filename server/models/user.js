
export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username has been taken'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty'
        }
      },
      len: {
        args: [3, 10],
        msg: 'Username should be 3 to 10 characters long'
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [3, 100],
          msg: 'Password cannot be less than three characters'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'abbey.jpg'
    },
  }, {
    classMethods: {
      associate: () => {
        // associations can be defined here
      }
    }
  });
  return user;
};
