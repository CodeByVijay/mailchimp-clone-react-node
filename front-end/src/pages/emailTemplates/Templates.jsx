import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Chip, Container, FormControl, InputLabel, ListItem, MenuItem, Select, TextField } from '@mui/material'
import Sidebar from '../../components/Sidebar';
import { styled } from '@mui/material/styles';
import DataTable from 'react-data-table-component';
import { Modal, Button as ButtonBoot } from 'react-bootstrap'
import Loader from '../Loader';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaEnvelopeSquare, FaPenAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import DOMPurify from 'isomorphic-dompurify';
const baseUrl = 'http://localhost:5000/';

const dirty = '<p>hello</p>'
const clean = DOMPurify.sanitize(dirty);

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    // {
    //     name: 'Preview',
    //     selector: row => row.preview,
    //     sortable: true,
    // },
    {
        name: 'Status',
        selector: row => row.status,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row => row.actions,
        sortable: false,
    },
];

const Templates = () => {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search)
    const status = queryParameters.get("status")

    const [msg, setMsg] = useState('')
    const [msgColor, setMsgColor] = useState('')
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);
    const [isSelectedIds, setSelectedIds] = useState([]);
    const [isSelected, setSelected] = useState(false);



    if (status === 'success') {
        setMsg('Success')
    }

    const handleAddTemplate = () => {
        navigate('/admin/campaigns/create-email-templetes');
    }

    const handleSelectedRows = ({ selectedRows }) => {
        if (selectedRows.length > 0) {
            const ids = []
            setSelected(true)
            // console.log('Selected Rows: ', selectedRows);
            selectedRows.map((index) => {
                ids.push(index.id)
            })
            setSelectedIds(ids);
        } else {
            setSelected(false)
        }
    };

    const templateData = async () => {
        setPending(true)
        const { data } = await axios.get(`${baseUrl}api/all-templates`);
        setPending(false)
        if (data.data.length > 0) {
            setRows(data.data.map((x) => {
                return {
                    id: x.id,
                    name: x.name,
                    // preview: DOMPurify.sanitize(JSON.parse(''+x.template+'')),
                    status: x.status === 1 ? <><Chip label='Active' color='success'></Chip></> : <><Chip label='Draft' color='warning'></Chip></>,
                    actions: <><ButtonBoot className='btn btn-sm btn-primary' onClick={() => handleEdit(x.id)}><FaPenAlt /></ButtonBoot> <ButtonBoot className='btn btn-sm btn-danger' onClick={() => handleSingleDelete(x.id)}><FaTrashAlt /></ButtonBoot></>
                }
            }))
        } else {
            setRows([]);
        };
        // console.log(data)
    };

    const handleMultipleDelete = async (e) => {
        e.preventDefault();
        setPending(true)
        const del = await axios.post(`${baseUrl}api/multiple-delete-template`, { ids: isSelectedIds })
        setPending(false)
        if (del.data.data > 0) {
            templateData();
        } else {
            console.log("Multiple delete error throw");
        }
    }

    const handleSingleDelete = async (tid) => {
        const del = await axios.post(`${baseUrl}api/delete-template`, { id: tid })
        if (del.data.data > 0) {
            templateData();
        } else {
            console.log("delete error throw");
        }
    }

    useEffect(() => {
        templateData()
    }, []);

    const handleEdit = (id) => {
        navigate('/admin/campaigns/edit-email-templetes?id=' + id);
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Box>
                        <Button variant='contained' onClick={() => handleAddTemplate()}><FaPlus /> &nbsp;Create Template</Button>
                    </Box>
                    <p>{msg}</p>
                    <Container>
                        {isSelected && (
                            <Box className='dataTableFunctions'>
                                <ButtonBoot className='btn btn-danger my-2' onClick={(e) => handleMultipleDelete(e)}><FaTrashAlt />  Delete</ButtonBoot>
                            </Box>
                        )}

                        <DataTable
                            title="Template List"
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


        </>
    )
}

export default Templates
