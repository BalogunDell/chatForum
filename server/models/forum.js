
module.exports = (sequelize, DataTypes) => {
  const forum = sequelize.define('forum', {
    senderId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    timeSent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'enter a message'
      }
    }
  });
  forum.associate = (model) => {
    forum.belongsTo(model.user, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
  };

  return forum;
};
