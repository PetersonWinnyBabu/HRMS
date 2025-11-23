import { DataTypes } from "sequelize";

export default (db) => {
  const Team = db.define(
    "Team",
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
      description: {
        type: DataTypes.TEXT,
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
      tableName: "teams",
      timestamps: true,
    }
  );

  Team.associate = (models) => {
    Team.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Team.belongsToMany(models.Employee, {
      through: "employee_teams",
      foreignKey: "team_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Team;
};
