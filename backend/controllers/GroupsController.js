import mysqlCon from "../config/DatabaseMysqli.js";

export const createGroup = async (req, res) => {
    const { name } = req.body;
    if (name === '') return res.status(422).json({ msg: "All Fields Are Required." });
    const checkGroupName = "SELECT `name` FROM `groups` WHERE `name`=?";
    mysqlCon.query(checkGroupName, [name], function (err, result) {
        if (err) throw err;
        if (result.length) {
            return res.json({ msg: "Group name already exist", data: result })
        } else {
            mysqlCon.query('SELECT * FROM `groups`', function (err, result) {
                if (err) throw err;
                try {
                    const groupInsert = "INSERT INTO `groups`(name,createdAt,updatedAt) VALUES(?,?,?)";
                    mysqlCon.query(groupInsert, [name, new Date(), new Date()], function (err, result) {
                        if (err) throw err;
                        return res.json({ msg: `${name} group is successfully created.` })
                    })
                }
                catch (error) {
                    return res.json({ msg: "Error Throw", errorMsg: error })
                }
            });

        }
    })
}

export const getAllGroups = (req,res) => {
    try {
        mysqlCon.query("SELECT * FROM `groups`", function (err, result) {
            if (err) throw err;
            if (result.length) {
                return res.json({ msg: `${result.length} Groups Found.`, groups: result })
            }
            return res.json({ msg: "No Groups Found." })
        })
    }
    catch (error) {
        return res.json({ msg: "Error Throw", errorMsg: error })
    }
}