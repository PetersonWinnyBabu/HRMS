import { DataTypes } from "sequelize";

export default (db) => {
  const User = db.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "organisations",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
      onDelete: "CASCADE",
    });
  };

  return User;
};
