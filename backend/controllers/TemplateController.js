import mysqlCon from "../config/DatabaseMysqli.js";
const table = 'templates';

export const createTemplate = async (req, res) => {
    const { templateName, templateHtml, status } = req.body;
    if (templateName === '' || templateHtml === '' || status === '') return res.status(422).json({ msg: "*** All Fields Are Required." });
    const insertTamplate = "INSERT INTO " + table + "(`name`,`template`,`status`,`createdAt`,`updatedAt`) VALUES(?,?,?,?,?)";
    mysqlCon.query(insertTamplate, [templateName, JSON.stringify(templateHtml), status, new Date(), new Date()], function (err, result) {
        if (err) throw err;
        res.status(201).json({ msg: "success", data: result })
    })
}

export const allTemplate = async (req, res) => {
    mysqlCon.query("SELECT * FROM " + table, function (err, result) {
        if (err) throw err;
        return res.status(200).json({ msg: "success", data: result });
    })
}

export const getSingleTemplate = async (req, res) => {
    const { tempId } = req.body;

    mysqlCon.query("SELECT * FROM " + table + " WHERE `id`=?", [tempId], function (err, result) {
        if (err) throw err;
        return res.status(200).json({ msg: "success", data: result });
    })
}

export const multipleDeleteTemplate = (req, res) => {
    const { ids } = req.body;
    mysqlCon.query("DELETE FROM `templates` WHERE `id` IN (" + ids + ")", function (err, result) {
        if (err) throw err;
        return res.status(200).json({ msg: "success", data: result.affectedRows });
    })

}

export const deleteTemplate = (req, res) => {
    const { id } = req.body;
    mysqlCon.query("DELETE FROM `templates` WHERE `id`=?", [id], function (err, result) {
        if (err) throw err;
        return res.status(200).json({ msg: "success", data: result.affectedRows });
    })
}

export const editTemplate = (req, res) => {
    const { id, templateName, templateHtml, status } = req.body;
    mysqlCon.query("SELECt * FROM `templates` WHERE `id`=?", [id], function (err, result) {
        if (err) throw err;
        const sql = "UPDATE `templates` SET `name`=?,`template`=?,`status`=?,`updatedAt`=? WHERE `id`=?";
        mysqlCon.query(sql, [templateName, JSON.stringify(templateHtml), status, new Date(),id], function (err, result) {
            if (err) throw err;
            return res.status(200).json({ msg: "success", data: result });
        })
    })
}