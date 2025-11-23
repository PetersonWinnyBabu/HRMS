import { DataTypes } from "sequelize";

export default (db) => {
  const Log = db.define(
    "Log",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      organisation_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      action: {
        type: DataTypes.STRING,
      },
      meta: {
        type: DataTypes.JSONB,
      },
    },
    {
      tableName: "logs",
      timestamps: true,
     
    }
  );

  return Log;
};
