import { DataTypes } from "sequelize";

export default (db) => {
  const Employee = db.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
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
        onUpdate: "CASCADE",
        allowNull: false,
      },
    },
    {
      tableName: "employees",
      timestamps: true,
    }
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.Organisation, {
      foreignKey: "organisation_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Employee.belongsToMany(models.Team, {
      through: "employee_teams",
      foreignKey: "employee_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Employee;
};
