import mysqlCon from "../config/DatabaseMysqli.js";

export const createNewSubscriber = async (req, res) => {
    const { name, email, groups } = req.body;

    const checkSubscriber = "SELECT * FROM `subscribers` WHERE `email`=?";
    mysqlCon.query(checkSubscriber, [email], async function (err, result) {
        if (err) throw err;
        if (result.length) {
            const subscriber = result;
            const arrToObj = Object.assign({}, groups);
            const checkGroupExist = "SELECT * FROM `groups` WHERE `id`=?";
            mysqlCon.query(checkGroupExist, [arrToObj[0]], function (err, result) {
                if (err) throw err;
                if (result.length) {
                    const subscribers = JSON.parse(result[0]['subscribers']);
                    try {
                        const oldGroups = JSON.parse(subscriber[0]['groups']);
                        if (oldGroups.includes(arrToObj[0])) {
                            return res.json({ msg: "Already Subscribed" })
                        }
                        oldGroups.push(arrToObj[0])
                        const updateSubs = "UPDATE `subscribers` SET `groups`=? WHERE `email`=?";
                        mysqlCon.query(updateSubs, [JSON.stringify(oldGroups), email], function (err, result) {
                            if (err) throw err;
                            const updateGroup = "UPDATE `groups` SET `subscribers`=? WHERE `id`=?";

                            if (subscribers === null) {
                                mysqlCon.query(updateGroup, [JSON.stringify([subscriber[0]['id']]), arrToObj[0]])
                            } else {
                                subscribers.push(subscriber[0]['id'])
                                mysqlCon.query(updateGroup, [JSON.stringify(subscribers), arrToObj[0]])
                            }

                            return res.json({ msg: "Subcriber Created & groups updated", data: subscribers })
                        })
                    }
                    catch (error) {
                        return res.json({ msg: "Update Group Subscriber Error Throw" })
                    }
                } else {
                    return res.json({ msg: "Groups Not Found." })
                }
            })

        } else {
            try {
                const arrToObj = Object.assign({}, groups);
                const checkGroupExist = "SELECT * FROM `groups` WHERE `id`=?";
                mysqlCon.query(checkGroupExist, [arrToObj[0]], function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                        const oldGroupsSub = JSON.parse(result[0]['subscribers']);

                        const createSubs = "INSERT INTO `subscribers`(`name`,`email`,`groups`,`createdAt`,`updatedAt`) VALUES(?,?,?,?,?)";
                        mysqlCon.query(createSubs, [name, email, JSON.stringify(groups), new Date(), new Date()], function (err, result) {
                            if (err) throw err;
                            const subId = JSON.stringify([result.insertId]);
                            const updateGroup = "UPDATE `groups` SET `subscribers`=? WHERE `id`=?";
                            if (oldGroupsSub === null) {
                                mysqlCon.query(updateGroup, [subId, arrToObj[0]])
                            } else {
                                oldGroupsSub.push(result.insertId)
                                mysqlCon.query(updateGroup, [JSON.stringify(oldGroupsSub), arrToObj[0]])
                            }

                            return res.json({ msg: `${name} subscriber is successfully created.` })
                        })
                    } else {
                        return res.json({ msg: "Groups Not Found." })
                    }
                })
            }
            catch (error) {
                return res.json({ msg: "New Subscriber Error Throw" })
            }
        }
    })

}

export const getAllsubscribers = (req, res) => {
    mysqlCon.query("SELECT * FROM `subscribers`", function (err, result) {
        if (err) throw err;
        if (result.length) {
            const subscribers = result;
            // const groupName = [];
            // subscribers.forEach(user => {
            //     const groupsIds = JSON.parse(user.groups)
            //     const getGroupname = "SELECT `name` FROM `groups` WHERE `id` IN(?)";
            //     mysqlCon.query(getGroupname, [groupsIds], function (err, result) {
            //         if (err) throw err;
            //        groupName.push(result[0]['name'])
            //     // return res.json({ msg: `${result.length} subscriber found.`, subs: subscribers ,grp:groupName})
            //     })
            // });

            return res.json({ msg: `${result.length} subscribers found.`, subs: subscribers })

        } else {
            return res.json({ msg: `No subscriber found.` })
        }
    })
}