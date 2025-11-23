import { DataTypes } from "sequelize";

export default (db) => {
  const Organisation = db.define(
    "Organisation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "organisations",
      timestamps: true,
     
    }
  );

  Organisation.associate = (models) => {
    Organisation.hasMany(models.User, {
      foreignKey: "organisation_id",
      onDelete: "CASCADE",
    });

    Organisation.hasMany(models.Employee, {
      foreignKey: "organisation_id",
      onDelete: "CASCADE",
    });

    Organisation.hasMany(models.Team, {
      foreignKey: "organisation_id",
      onDelete: "CASCADE",
    });
  };

  return Organisation;
};
