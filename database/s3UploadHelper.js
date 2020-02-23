require("dotenv").config();
const aws = require('aws-sdk');
const s3 = new aws.S3({accessKeyId: process.env.ACCESSKEY, secretAccessKey: process.env.SECRETKEY, region: process.env.REGION});
const db = require('./index.js')

const getCountThenUrl = async (req, callback) => {
    console.log(`you're in s3UploadHelper.getCountThenUrl`)
    await db.query(`SELECT count(*) as total FROM Panos`)
    .then(results => getPreSignedUrl(req.params.bucket, Number(results.rows[0].total), callback))
    .catch(err => callback(err));
};

const getCountThenUrlForObject = async (req, callback) => {
    console.log(`you're in s3UploadHelper.getCountThenUrlForObject`)
    await db.query(`SELECT count(*) as total FROM Objects`)
    .then(results => getPreSignedUrlForObject(req.params.bucket, Number(results.rows[0].total), callback))
    .catch(err => callback(err));
};

const getCountThenUrlForSkybox = async (req, callback) => {
    console.log(`you're in s3uploadHelper.getCountThenUrlForSkybox`)
    await db.query(`SELECT count(*) as total from Sbindexes`)
    .then(results => getPreSignedUrlForSkybox(req.body.index, Number(results.rows[0].total), callback))
    .catch(err => callback(err));
};

const getPreSignedUrl = (bucket, id, cb) => {
    const params = {Bucket: bucket, Key: `images/myimage${id + 1}.jpg`, ContentType: 'image/jpeg'};
    s3.getSignedUrl('putObject', params, function(err, url) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            console.log('Your generated pre-signed URL is', url);
            let publicUrl = `https://${bucket}.s3-us-west-1.amazonaws.com/images/myimage${id + 1}.jpg`;
            db.query(`INSERT INTO Panos (img_url) VALUES ($$${publicUrl}$$)`, (err, results) => {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    cb(null, {presignedUrl: url, id: id + 1, publicUrl});
                }
            });
        }
    });
};

const getPreSignedUrlForSkybox = (index, id, cb) => {
    const params = {Bucket: 'panoimages', Key: `skybox/myimage${id+1}-${index}.jpg`, ContentType: 'image/jpeg'};
    s3.getSignedUrl('putObject', params, function(err, url) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            console.log('Your generated pre-signed URL is', url);
            let publicUrl = `https://panoimages.s3-us-west-1.amazonaws.com/skybox/myimage${id+1}-${index}.jpg`;
            cb(null, {url, publicUrl, id: id + 1});
        }
    });
};

const getPreSignedUrlForObject = (bucket, id, cb) => {
    const params = {Bucket: bucket, Key: `objects/myimage${id + 1}.jpg`, ContentType: 'image/jpeg'};
    s3.getSignedUrl('putObject', params, function(err, url) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            console.log('Your generated pre-signed URL is', url);
            let publicUrl = `https://${bucket}.s3-us-west-1.amazonaws.com/objects/myimage${id+1}.jpg`;
            // db.query(`INSERT INTO Objects (x, y, z, object_type, object_value, scale, id_pano) VALUES (0, 0, 0, 'image', 'https://${bucket}.s3-us-west-1.amazonaws.com/objects/myimage${id + 1}.jpg', '{1, 1, 1}', ${id})`, (err, results) => {
                // if (err) {
                //     cb(err);
                // } else {
                    cb(null, {presignedUrl: url, id: id + 1, publicUrl});
                // }
            // });
        }
    });
};

module.exports = {
                    getCountThenUrl,
                    getCountThenUrlForObject,
                    getCountThenUrlForSkybox
                };
// module.exports = getPreSignedUrl;