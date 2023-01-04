import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Groups = db.define('groups', {
    name: {
        type: DataTypes.STRING,
    },
    subscribers: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Groups;