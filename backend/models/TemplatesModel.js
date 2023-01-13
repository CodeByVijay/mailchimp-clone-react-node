import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Templates = db.define('templates', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    template: {
        type: DataTypes.TEXT('long'),
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

export default Templates;

