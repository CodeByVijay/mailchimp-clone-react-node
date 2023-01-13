import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Chip, Container, FormControl, InputLabel, ListItem, MenuItem, Select, TextField } from '@mui/material'
import Sidebar from '../../components/Sidebar';
import { styled } from '@mui/material/styles';
import DataTable from 'react-data-table-component';
import { Modal, Button as ButtonBoot } from 'react-bootstrap'
import Loader from '../Loader';
import axios from "axios";
import { FaEnvelopeSquare, FaPenAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
const baseUrl = 'http://localhost:5000/';


const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Groups',
        selector: row => row.groups,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => row.actions,
        sortable: false,
    },
];


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Subscribers = () => {

    const [msg, setMsg] = useState('')
    const [msgColor, setMsgColor] = useState('')
    const [isSelected, setSelected] = useState(false);
    const [isSelectedIds, setSelectedIds] = useState([]);
    const [isSelectedEmails, setIsSelectedEmails] = useState([]);

    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);
    const [groups, setGroups] = useState([]);
    const [groupval, setGroupval] = useState('');
    const [isShow, invokeModal] = React.useState(false)
    const [isShowEdit, setisShowEdit] = React.useState(false)
    const [isShowGroup, setisShowGroup] = React.useState(false)

    const [groupValue, setGroupValue] = React.useState([]);


    const [subName, setSubName] = useState('');
    const [subEmail, setSubEmail] = useState('');

    const [subscriberName, setSubscriberName] = useState(null)
    const [editId, setEditid] = useState(null)

    const handleSubName = (e) => {
        setSubName(e.target.value)
    }
    const handleSubEmail = (e) => {
        setSubEmail(e.target.value)
    }
    const handleCloseModel = () => {
        invokeModal(false)
        setisShowEdit(false)
        setisShowGroup(false)
        setGroupValue([])
        setGroupval('')
        setSubEmail('')
        setSubName('')
        setMsg('')
        setMsgColor('')
        setSubscriberName(null)
        subscriberData()
        setEditid(null)
    }


    const handleSelectedRows = ({ selectedRows }) => {
        if (selectedRows.length > 0) {
            const ids = []
            const emails = []
            setSelected(true)
            console.log('Selected Rows: ', selectedRows);
            selectedRows.map((index) => {
                ids.push(index.id)
                emails.push(index.email)
            })
            setSelectedIds(ids);
            setIsSelectedEmails(emails)

        } else {
            setSelected(false)
        }
    };

    const handleMultipleDelete = async (e) => {
        e.preventDefault();
        setPending(true)
        const del = await axios.post(`${baseUrl}api/delete-selected-subscriber`, { ids: isSelectedIds })
        setPending(false)
        if (del.data.data > 0) {
            subscriberData();
        } else {
            console.log("Multiple delete error throw");
        }
    }

    const handleDelete = async (e) => {
        setPending(true)
        const del = await axios.post(`${baseUrl}api/delete-subscriber`, { id: e })
        setPending(false)
        if (del.data.data > 0) {
            subscriberData();
        } else {
            console.log("Subscriber delete error throw");
        }
    }

    const handleSendMail = async (e) => {
        setPending(true)
        const { data } = await axios.post(`${baseUrl}api/send-email`, { id: e })
        setPending(false)
        alert('Email Successfully Send.')
    }

    const handleMultipleSendEmail = async (e) => {
        e.preventDefault();
        setPending(true)
        const data = await axios.post(`${baseUrl}api/send-seleted-subscriber-email`, { emails: isSelectedEmails })
        setPending(false)
        alert('Email Successfully Send.')

    }

    const subscriberData = async () => {
        setPending(true)
        const { data } = await axios.get(`${baseUrl}api/get-all-subscribers`);
        setPending(false)
        if (data.data > 0) {
            setRows(data.subs.map((x) => {
                return {
                    id: x.id,
                    name: x.name,
                    email: x.email,
                    groups: JSON.parse(x.groups).map((index) => {
                        return (
                            <><Chip label={index} color='success' onClick={() => openGroupModel(x.id)}></Chip>&nbsp;</>
                        )
                    }),
                    actions: <><ButtonBoot className='btn btn-sm btn-success' title="Send Email" onClick={() => handleSendMail(x.id)}><FaEnvelopeSquare /></ButtonBoot> <ButtonBoot className='btn btn-sm btn-primary' onClick={() => openEditSubscriberModel(x.id)}><FaPenAlt /></ButtonBoot> <ButtonBoot className='btn btn-sm btn-danger' onClick={() => handleDelete(x.id)}><FaTrashAlt /></ButtonBoot></>
                }
            }))
        } else {
            setRows([]);
            setSelected(false)
        };
        // console.log(data)
    };

    const openGroupModel = async (e) => {
        setPending(true)
        const { data } = await axios.post(`${baseUrl}api/get-subscriber`, { id: e });
        setGroupValue(
            JSON.parse(data.data[0].groups).map((index) =>
            (
                <><Chip avatar={<Avatar>{index.charAt(0).toUpperCase()}</Avatar>} label={index} color='success' className='mt-2 mb-2'></Chip>&nbsp;</>
                // index.charAt(0).toUpperCase()
                // index.match(/[A-Z]/g).join('')
            )
            )
        );
        setSubscriberName(data.data[0].name)
        setisShowGroup(true)
        setPending(false)
    }

    const handleOpen = async () => {
        setPending(true)
        await getGroups()
        invokeModal(true)
        setPending(false)
    }
    const openEditSubscriberModel = async (e) => {
        setPending(true)
        const { data } = await axios.post(`${baseUrl}api/get-subscriber`, { id: e });
        setSubName(data.data[0].name)
        setSubEmail(data.data[0].email)
        // await getGroups()
        const groupData = await axios.get(`${baseUrl}api/get-all-groups`);
        const arr = []
        groupData.data.groups.map((val) => {
            arr.push(val.name)
        });

        const newarr = arr.filter((value) => {
            return !data.data[0].groups.includes(value)
        });
        setGroups(newarr.map((x) => {
            return {
                id: x,
                title: x
            }
        }
        ))

        setGroupValue(
            JSON.parse(data.data[0].groups).map((index) => {
                return (
                    <><Chip avatar={<Avatar>{index.charAt(0).toUpperCase()}</Avatar>} label={index} color='success' className='mt-2 mb-2' onDelete={() => handleRemoveGroup(index, e)}></Chip>&nbsp;</>
                )
            })
        );
        setEditid(e)
        setisShowEdit(true)
        setPending(false)

    }
    const handleEditSubscriber = async (e) => {
        try {
            const mainData = {
                subId: editId,
                subName: subName,
                subEmail: subEmail,
                group: groupval
            }
            const result = await axios.post(`${baseUrl}api/edit-subscriber`, mainData);

            if (result.status === 200) {
                setMsgColor('text-success')
                setMsg(result.data.msg);

                setSubEmail('')
                setSubName('')
                setGroupval('')

                setTimeout(() => {
                    setMsg('')
                    setMsgColor('')
                    setisShowEdit(false)
                    subscriberData()
                }, 2000);
            } else {
                setMsgColor('text-danger')
                setMsg(result.data.msg);
            }
        } catch (err) {
            setMsgColor('text-danger')
            setMsg(err.response.data.msg);
        }

    }
    const handleRemoveGroup = async (data, id) => {
        const mainData = {
            subId: id,
            group: data
        }
        const result = await axios.post(`${baseUrl}api/delete-subscriber-group`, mainData);
        setGroupValue(
            result.data.newGroups.map((index) => {
                return (
                    <><Chip avatar={<Avatar>{index.charAt(0).toUpperCase()}</Avatar>} label={index} color='success' className='mt-2 mb-2' onDelete={() => handleRemoveGroup(index, id)}></Chip>&nbsp;</>
                )
            })
        );
        // setGroupValue(result.data.newGroups);
    }

    const handleChangeGroup = (e) => {
        setGroupval(e.target.value)
    }
    const getGroups = async () => {
        const { data } = await axios.get(`${baseUrl}api/get-all-groups`);
        setGroups(data.groups.map((x) => {
            return {
                id: x.id,
                title: x.name
            }
        }
        ))
    }

    useEffect(() => {
        subscriberData()
    }, []);

    const handleCreateSubscriber = async (e) => {
        if (groupval !== 0 && subEmail !== '' && subName !== '') {
            try {

                let data = {
                    name: subName,
                    email: subEmail,
                    groups: [groupval]
                }
                const saveSub = await axios.post(`${baseUrl}api/create-new-subscriber`, data);
                if (saveSub.status === 200) {
                    setMsgColor('text-success')
                    setMsg(saveSub.data.msg);

                    setSubEmail('')
                    setSubName('')
                    setGroupval('')

                    setTimeout(() => {
                        setMsg('')
                        setMsgColor('')
                        invokeModal(false)
                        subscriberData()
                    }, 2000);
                } else {
                    setMsgColor('text-danger')
                    setMsg(saveSub.data.msg);
                }
            } catch (error) {
                setMsgColor('text-danger')
                setMsg(error.response.data.msg);
            }
        } else {
            setMsgColor('text-danger')
            setMsg('*** All Fields Required.');
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    <Container maxWidth='lg'>
                        <Box>
                            <Button variant='contained' onClick={() => handleOpen()}><FaPlus /> &nbsp;Add Subscriber</Button>
                        </Box>
                        {isSelected && (
                            <Box className='dataTableFunctions'>
                                <ButtonBoot className='btn btn-success' onClick={handleMultipleSendEmail}>Send Email</ButtonBoot>&nbsp;&nbsp;&nbsp;
                                <ButtonBoot className='btn btn-danger' onClick={handleMultipleDelete}>Delete</ButtonBoot>
                            </Box>
                        )}
                        <DataTable
                            title="Subscribers List"
                            columns={columns}
                            data={rows}
                            selectableRows
                            progressPending={pending}
                            progressComponent={<Loader />}
                            onSelectedRowsChange={handleSelectedRows}
                            pagination
                        />
                    </Container>
                </Box>
            </Box>


            {/* Subscriber Add Model */}
            <Modal show={isShow} style={{ marginTop: "50px" }}>
                <Modal.Header closeButton onClick={handleCloseModel}>
                    <Modal.Title>Add New Subscriber</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className={`mt-2 mb-2 ${msgColor}`}>{msg}</span>
                    <TextField fullWidth label='Subscriber Name' className='mt-2 mb-2' value={subName} onChange={(e) => handleSubName(e)}></TextField>
                    <TextField fullWidth label='Subscriber Email' className='mt-2 mb-2' value={subEmail} onChange={(e) => handleSubEmail(e)} helperText="Not able to change email address" ></TextField>

                    <FormControl fullWidth className='mt-2 mb-2'>
                        <InputLabel id="group_select">Groups</InputLabel>
                        <Select
                            labelId="group_select"
                            id="groups_data"
                            value={groupval}
                            label="Groups"
                            onChange={handleChangeGroup}
                        >
                            <MenuItem value={0}>Select Group</MenuItem>
                            {groups.map((valData) => (
                                <MenuItem value={valData.id}>
                                    {valData.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Modal.Body>
                <Modal.Footer>
                    <ButtonBoot variant="danger" onClick={handleCloseModel}>
                        Close
                    </ButtonBoot>
                    <ButtonBoot variant="success" onClick={handleCreateSubscriber}>
                        Create Subscriber
                    </ButtonBoot>
                </Modal.Footer>
            </Modal>
            {/* Subscriber Add Model */}

            {/* Subscriber Edit Model */}
            <Modal show={isShowEdit} style={{ marginTop: "50px" }}>
                <Modal.Header closeButton onClick={handleCloseModel}>
                    <Modal.Title>Edit Subscriber</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className={`mt-2 mb-2 ${msgColor}`}>{msg}</span>
                    <TextField fullWidth label='Subscriber Name' className='mt-2 mb-2' value={subName} onChange={(e) => handleSubName(e)} ></TextField>
                    <TextField fullWidth label='Subscriber Email' className='mt-2 mb-2' value={subEmail} onChange={(e) => handleSubEmail(e)} disabled helperText="Not able to change email address"></TextField>

                    <FormControl fullWidth className='mt-2 mb-2'>
                        <InputLabel id="group_select">Groups</InputLabel>
                        <Select
                            labelId="group_select"
                            id="groups_data"
                            value={groupval}
                            label="Groups"
                            onChange={handleChangeGroup}
                        >
                            <MenuItem value={0}>Select Group</MenuItem>
                            {groups.map((valData) => (
                                <MenuItem value={valData.id}>
                                    {valData.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box>{groupValue}</Box>

                </Modal.Body>
                <Modal.Footer>
                    <ButtonBoot variant="danger" onClick={handleCloseModel}>
                        Close
                    </ButtonBoot>
                    <ButtonBoot variant="success" onClick={handleEditSubscriber}>
                        Edit Subscriber
                    </ButtonBoot>
                </Modal.Footer>
            </Modal>
            {/* Subscriber Edit Model */}

            {/* Subscriber Group Model */}
            <Modal show={isShowGroup} style={{ marginTop: "50px" }}>
                <Modal.Header closeButton onClick={handleCloseModel}>
                    <Modal.Title><span className='text-primary'>{subscriberName}</span> All Groups List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box>{groupValue}</Box>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonBoot variant="danger" onClick={handleCloseModel}>
                        Close
                    </ButtonBoot>
                </Modal.Footer>
            </Modal>
            {/* Subscriber Group Model */}

        </>
    )
}

export default Subscribers
