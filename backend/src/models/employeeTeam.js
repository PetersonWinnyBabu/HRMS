import { DataTypes, Sequelize } from "sequelize";

export default (db) => {
  const EmployeeTeam = db.define(
    "EmployeeTeam",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "employees",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      assigned_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      tableName: "employee_teams",
      timestamps: true,
    }
  );

  EmployeeTeam.associate = (models) => {
    EmployeeTeam.hasMany(models.Employee, {
      foreignKey: "employee_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    EmployeeTeam.hasMany(models.Team, {
      foreignKey: "team_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return EmployeeTeam;
};
