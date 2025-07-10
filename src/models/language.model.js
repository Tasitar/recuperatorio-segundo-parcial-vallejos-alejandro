import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Language = sequelize.define(
    "Language",
    {
    id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },

    paradigm: {
    type: DataTypes.STRING,
    allowNull: false,
    },

    release_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
    },
},
);