module.exports = (sequelize, DataTypes) => {
  const privatemessage = sequelize.define('privatemessage', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
        as: 'senderId'
      }
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
        as: 'receiverId'
      }
    },
    users: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverSessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    timeSent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  privatemessage.associate = (models) => {
    privatemessage.belongsTo(models.user, {
      foreignKey: 'senderId',
      as: 'sender',
      onDelete: 'CASCADE'
    });
    privatemessage.belongsTo(models.user, {
      foreignKey: 'receiverId',
      as: 'receiver',
      onDelete: 'CASCADE'
    });
  };
  return privatemessage;
};
