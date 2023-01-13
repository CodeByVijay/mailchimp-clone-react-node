import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, Box, Button, Chip, Container, FormControl, InputLabel, ListItem, MenuItem, Select, TextField } from '@mui/material'
import Sidebar from '../../components/Sidebar';
import { styled } from '@mui/material/styles';
import DataTable from 'react-data-table-component';
import { Modal, Button as ButtonBoot } from 'react-bootstrap'
import Loader from '../Loader';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaArrowLeft, FaEnvelopeSquare, FaPenAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
const baseUrl = 'http://localhost:5000/';


const EditTemplate = () => {
  
    const navigate = useNavigate();
    const [msg, setMsg] = useState('')
    const [msgColor, setMsgColor] = useState('')
    const [pending, setPending] = useState(true);

    const queryParameters = new URLSearchParams(window.location.search)
    const tempId = queryParameters.get("id")


    const API_URl = baseUrl
    const UPLOAD_ENDPOINT = 'api/ckeditor-image-upload'

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    loader.file.then(async (file) => {
                        const body = new FormData()
                        body.append('uploadImg', file)
                        // console.log(...body, 'img')
                        await fetch(`${baseUrl}${UPLOAD_ENDPOINT}`, {
                            method: 'post',
                            body: body,
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({ default: `${API_URl}${res.url}` })
                            })
                            .catch((err) => {
                                console.log(err)
                                reject(err)
                            })
                    })
                })
            },
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader)
        }
    }

  
    // setTempId(status);
    // console.log(tempId);
    const [statusVal, setStatusVal] = React.useState('')
    const [templateName, setTemplateName] = React.useState('')
    const [templateData, setTemplateData] = React.useState('')

    const handleBack = () => {
        navigate('/admin/campaigns/email-templetes');
    }

    const handleTempName = (e) => {
        setTemplateName(e.target.value)
    }

    const handleChangeGroup = (e) => {
        setStatusVal(e.target.value)
    }
    const handleTempData = (event, editor) => {
        setTemplateData(editor.getData());
    }
    const handleReset = () => {
        setTemplateName('');
        setStatusVal('');
        setTemplateData('');
    }
    const handleEditTemplate = async () => {
        try {
            const formData = {
                id: tempId,
                templateName: templateName,
                templateHtml: templateData,
                status: statusVal
            }
            const data = await axios.post(`${baseUrl}api/edit-template`, formData)
            // console.log(data)
            if (data.status === 200) {
                navigate('/admin/campaigns/email-templetes');
            }
        } catch (err) {
            setMsgColor('text-danger')
            setMsg(err.response.data.msg);
        }
    }

    const getTempData = async (tempId) => {
        try {
            setPending(true)
            const { data } = await axios.post(`${baseUrl}api/get-template`, { tempId: tempId })
            setTemplateName(data.data[0].name);
            setTemplateData(JSON.parse(data.data[0].template));
            setStatusVal(data.data[0].status);
            // console.log(data.data[0].id);
            setPending(false)
        } catch (err) {
            setMsgColor('text-danger')
            setMsg(err.response.data.msg);
        }
    }

    useEffect(() => {
        getTempData(tempId)
    }, []);

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
                <Box component="main" container sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                    <Container>
                        <Box sx={{ my: 2 }}>
                            <Button variant='contained' onClick={() => handleBack()}><FaArrowLeft /> &nbsp;Back</Button>
                        </Box>
                        <span className={`mt-2 mb-2 ${msgColor}`}>{msg}</span>
                        <TextField fullWidth label='Template Name' className='mt-2 mb-2' value={templateName} onChange={(e) => handleTempName(e)}></TextField>

                        <CKEditor
                            editor={ClassicEditor}
                            data={templateData}
                            config={{
                                extraPlugins: [uploadPlugin],
                                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList','imageUpload', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo'],
                                shouldNotGroupWhenFull: true
                            }}
                            // 'imageUpload'
                            onChange={(event, editor) => handleTempData(event, editor)}
                        />

                        <FormControl fullWidth className='mt-2 mb-2'>
                            <InputLabel id="status_select">Status</InputLabel>
                            <Select
                                labelId="status_select"
                                id="status_data"
                                value={statusVal}
                                label="Status"
                                onChange={handleChangeGroup}
                            >
                                <MenuItem value="">Select Status</MenuItem>
                                <MenuItem value="1"> Active </MenuItem>
                                <MenuItem value="0"> Draft </MenuItem>
                            </Select>
                        </FormControl>

                        <ButtonBoot variant="danger" onClick={() => handleReset()}>
                            Reset
                        </ButtonBoot>&nbsp;&nbsp;&nbsp;&nbsp;
                        <ButtonBoot variant="success" onClick={handleEditTemplate}>
                            Edit Template
                        </ButtonBoot>

                    </Container>
                </Box>
            </Box>


        </>
    )
}

export default EditTemplate
