require('dotenv').config();
const express = require('express');
const Minio = require('minio');

const app = express();
const port = process.env.PORT || 3000;

const minioClient = new Minio.Client({
    //endPoint: 'minio.minio-ns.svc.cluster.local',
    //endPoint: 'localhost',
    endPoint: '172.18.0.3',
    port: 30090,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

app.get('/:objectName', async (req, res) => {
    const objectName = req.params.objectName;

    minioClient.getObject('postersv2', objectName, function(err, dataStream) {
        if (err) {
            console.log('Error fetching object:', err)
            return res.status(500).send('Error fetching object: ' + err.message);
        }
        console.log('Successfully fetched object:', objectName);
        dataStream.pipe(res);
    });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
