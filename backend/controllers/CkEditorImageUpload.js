export const ckEditorImageUpload = (req, res) => {
    let sampleFile
    let uploadPath
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send(JSON.stringify('No files were uploaded.'))
    }

    sampleFile = req.files.uploadImg
    uploadPath = 'uploads/' + sampleFile.name
    // console.log("dataEnd", req.files.uploadImg);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            console.log('error')
            return res.status(500).json({ err: err })
        }
        res.send({
            url: uploadPath,
        })
    })
}
