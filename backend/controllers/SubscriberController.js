import mysqlCon from "../config/DatabaseMysqli.js";
import emailSMTP from "../config/email.js";

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
                    const groupName = result[0]['name'];
                    try {
                        const oldGroups = JSON.parse(subscriber[0]['groups']);
                        if (oldGroups.includes(groupName)) {
                            return res.status(201).json({ msg: "Already Subscribed" })
                        }
                        // oldGroups.push(arrToObj[0])
                        oldGroups.push(groupName)
                        const updateSubs = "UPDATE `subscribers` SET `groups`=? WHERE `email`=?";
                        mysqlCon.query(updateSubs, [JSON.stringify(oldGroups), email], function (err, result) {
                            if (err) throw err;
                            const updateGroup = "UPDATE `groups` SET `subscribers`=? WHERE `id`=?";

                            if (subscribers === null) {
                                mysqlCon.query(updateGroup, [JSON.stringify([subscriber[0]['email']]), arrToObj[0]])
                            } else {
                                subscribers.push(subscriber[0]['email'])
                                mysqlCon.query(updateGroup, [JSON.stringify(subscribers), arrToObj[0]])
                            }

                            return res.status(200).json({ msg: "Subcriber Created & groups updated" })
                        })
                    }
                    catch (error) {
                        return res.status(403).json({ msg: "Update Group Subscriber Error Throw" })
                    }
                } else {
                    return res.status(404).json({ msg: "Groups Not Found." })
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
                        const groupName = result[0]['name'];

                        const createSubs = "INSERT INTO `subscribers`(`name`,`email`,`groups`,`createdAt`,`updatedAt`) VALUES(?,?,?,?,?)";
                        mysqlCon.query(createSubs, [name, email, JSON.stringify([groupName]), new Date(), new Date()], function (err, result) {
                            if (err) throw err;
                            // const subId = JSON.stringify([result.insertId]);
                            const subEmail = JSON.stringify([email]);
                            const updateGroup = "UPDATE `groups` SET `subscribers`=? WHERE `id`=?";
                            if (oldGroupsSub === null) {
                                // mysqlCon.query(updateGroup, [subId, arrToObj[0]])
                                mysqlCon.query(updateGroup, [subEmail, arrToObj[0]])
                            } else {
                                oldGroupsSub.push(email)
                                mysqlCon.query(updateGroup, [JSON.stringify(oldGroupsSub), arrToObj[0]])
                            }

                            return res.status(200).json({ msg: `${name} subscriber is successfully created.` })
                        })
                    } else {
                        return res.status(404).json({ msg: "Groups Not Found." })
                    }
                })
            }
            catch (error) {
                return res.status(403).json({ msg: "New Subscriber Error Throw" })
            }
        }
    })
}

export const getAllsubscribers = (req, res) => {
    mysqlCon.query("SELECT * FROM `subscribers`", function (err, result) {
        if (err) throw err;
        if (result.length) {
            const subscribers = result;
            return res.json({ msg: `${result.length} subscribers found.`, subs: subscribers, data: result.length })

        } else {
            return res.json({ msg: `No subscriber found.`, data: 0 })
        }
    })
}
export const getSubscriber = (req, res) => {
    mysqlCon.query("SELECT * FROM `subscribers` WHERE `id`=?", req.body.id, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(200).json({ msg: "success", data: result });
        } else {
            return res.status(404).json({ msg: "No Subscriber Found." });
        }
    })
}

export const deleteSubscribeGroup = (req, res) => {
    const { subId, group } = req.body;
    mysqlCon.query("SELECT * FROM `subscribers` WHERE `id`=?", subId, function (err, result) {
        if (err) throw err;
        const subscriber = result[0]['email'];
        const oldGroups = JSON.parse(result[0]['groups']);
        const newGroups = oldGroups.filter(item => item !== group)
        mysqlCon.query("UPDATE `subscribers` SET `groups`=? WHERE `id`=?", [JSON.stringify(newGroups), subId]);
        mysqlCon.query("SELECT * FROM `groups` WHERE `name`=?", group, function (err, result) {
            if (err) throw err;
            const oldSubs = JSON.parse(result[0]['subscribers'])
            const newSubs = oldSubs.filter(item => item !== subscriber)
            mysqlCon.query("UPDATE `groups` SET `subscribers`=? WHERE `id`=?", [JSON.stringify(newSubs), result[0]['id']]);
            return res.status(200).json({ msg: "success", newGroups: newGroups });
        })
    })
}

export const deleteSubscriber = (req, res) => {
    mysqlCon.query("DELETE FROM `subscribers` WHERE `id`=?", req.body.id, function (err, result) {
        if (err) throw err;
        return res.status(200).json({ msg: "success", data: result.affectedRows });
    })
}

export const deleteSelectedSubscriber = (req, res) => {
    mysqlCon.query("DELETE FROM `subscribers` WHERE `id` IN (" + req.body.ids + ")", function (err, result) {
        if (err) throw err;
        return res.status(200).json({ msg: "success", data: result.affectedRows });
    })
}

export const sendEmail = (req, res) => {
    mysqlCon.query("SELECT * FROM `subscribers` WHERE `id`=?", req.body.id, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            const message = {
                from: 'Vijay Amule "vijay.amule@techinfini.com"',
                to: `${result[0]['name']} ${result[0]['email']}`,
                subject: "Mailchimp Promotional mail",
                html: `<span style="color:blue;">${result[0]['name']}</span>, please check following details.`
            }
            emailSMTP.sendMail(message, function (err, info) {
                if (err) throw err
                console.log(info);
                return res.status(200).json({ msg: "success", data: info });
            })
        } else {
            return res.status(404).json({ msg: "No Subscriber Found." });
        }
    })
}

export const sendSelectedSubscriberEmail = (req, res) => {
    if (req.body.emails.length > 0) {
        const message = {
            from: 'Vijay Amule "vijay.amule@techinfini.com"',
            to: `${req.body.emails.toString()}`,
            subject: "Mailchimp Promotional mail send multiple",
            html: `multiple email test, please check following details.`
        }
        emailSMTP.sendMail(message, function (err, info) {
            if (err) throw err
            // console.log(info);
            return res.status(200).json({ msg: "success", data: info });
        })
    } else {
        return res.status(404).json({ msg: "No Subscriber Found." });
    }
}

export const editSubscriber = (req, res) => {
    const { subId, subName, subEmail, group } = req.body;

    try {
        mysqlCon.query("SELECT * FROM `subscribers` WHERE `id`=?", subId, function (err, result) {
            if (err) throw err;
            const subscriber = result[0]['email'];
            const oldGroups = JSON.parse(result[0]['groups']);
            if (group !== "") {
                oldGroups.push(group)
            }
            mysqlCon.query("UPDATE `subscribers` SET `name`=?,`email`=?,`groups`=?,`updatedAt`=? WHERE `id`=?", [subName, subEmail, JSON.stringify(oldGroups), new Date(), subId]);
            if (group !== "") {
                mysqlCon.query("SELECT * FROM `groups` WHERE `name`=?", group, function (err, result) {
                    if (err) throw err;
                    const oldSubs = JSON.parse(result[0]['subscribers'])
                    if (oldSubs === null) {
                        mysqlCon.query("UPDATE `groups` SET `subscribers`=?,`updatedAt`=? WHERE `id`=?", [JSON.stringify([subEmail]), new Date(), result[0]['id']]);
                    } else {
                        const newSubs = oldSubs.filter(item => item !== subscriber)
                        newSubs.push(subEmail)
                        mysqlCon.query("UPDATE `groups` SET `subscribers`=?,`updatedAt`=? WHERE `id`=?", [JSON.stringify(newSubs), new Date(), result[0]['id']]);
                    }
                    // console.log(oldSubs);
                    // return res.status(200).json({ msg: "success", result: "Subscriber Group Update.", body: req.body })
                })
            }
            return res.status(200).json({ msg: "success", result: "Subscriber Update.", body: req.body })
        })
    } catch (error) {
        console.log(error);
    }
}