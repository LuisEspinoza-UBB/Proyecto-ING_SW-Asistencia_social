"use strict";

const getFile = (req, res) => {
    res.sendFile(__dirname + '/index.html');
}

const uploadFile = (req, res) => {
    if (!req.files) res.status(404).json({ message: 'No hay archivos.' });

    const { files } = req.files;

    if (Array.isArray(files)) {
        files.forEach(file => saveFile(file));
    } else {
        saveFile(files);
    }

    res.json({ mesagge: 'Archivo guardado.' });
}

const saveFile = (file) => {
    const fileName = file.name;
        
    file.mv('./uploads/' + fileName, (err) => {
        if (err) return res.status(500).json({ message: 'Error al guardar archivo.', err });
    });
}

module.exports = {
    getFile,
    uploadFile
};

// app.post('/', (req, res) => {
//     if(req.files){
//         console.log(req.files)
//         var file = req.files.file
//         var filename = file.name
//         console.log(filename)

//         file.mv('./uploads/'+ filename,function(err){
//             if (err)
//             {
//                 res.send(err)
//             } else {
//                 res.send("File Uploaded")
//             }

//         })
//     }
// })
