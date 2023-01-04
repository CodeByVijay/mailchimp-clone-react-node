import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Subscribers = db.define('subscribers', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    groups: {
        type: DataTypes.TEXT('long'),
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Subscribers;