const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const yaml = require('js-yaml');
const multer = require('multer')
var async = require('async')
var fs = require('fs')
var Docker = require('dockerode')
var cron = require('node-cron')
var crypto = require('crypto')
const schedule = require('node-schedule')
const Container = mongoose.model("Container")
const cpuModel = mongoose.model("cpuModel")
const Cluster = mongoose.model("Cluster")
const Alert = mongoose.model("Alert")
const Nodes = mongoose.model("Nodes")
const AlertNotification = mongoose.model("AlertNotification")
const GeneralData = mongoose.model("GeneralData")
const AlertHistory = mongoose.model("AlertHistory")
const requireLogin = require('../middleware/requireLogin')
const { SECRET } = require('../keys')
const { IV } = require('../keys')
const e = require('express')
const bcrypt = require('bcryptjs')
const path = require('path');
const { alertClasses } = require('@mui/material');
const { application } = require('express');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = SECRET,
    iv = IV;

function encrypt(text) {
    var cipher = crypto.createCipheriv(algorithm, password, iv)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}



router.post('/containersinfo', requireLogin, (req, res) => {
    const { domainName, nickname } = req.body
    var mydocker = new Docker({
        host: domainName,
        port: 2376,
        ca: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'ca.pem'),
        cert: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'cert.pem'),
        key: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'key.pem')
    })
    mydocker.listContainers({ all: true }, function (err, containers) {
        res.json({ containers })
    })
})


router.post('/containersfullinfo', requireLogin, (req, res) => {
    const { domainName, nickname, idContainer } = req.body
    var mydocker = new Docker({
        host: domainName,
        port: 2376,
        ca: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'ca.pem'),
        cert: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'cert.pem'),
        key: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'key.pem')
    })
    var container = mydocker.getContainer(idContainer)
    container.inspect(function (err, data) {
        res.json({ data })
    })
})


router.post('/containersstats', requireLogin, (req, res) => {
    const { domainName, nickname, idContainer } = req.body
    var mydocker = new Docker({
        host: domainName,
        port: 2376,
        ca: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'ca.pem'),
        cert: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'cert.pem'),
        key: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'key.pem')
    })
    var container = mydocker.getContainer(idContainer)
    container.stats({ stream: false }, function (err, data) {
        res.json({ data })
    });
})


router.get('/mycontainers', requireLogin, (req, res) => {
    Container.find({ ownedBy: req.user._id })
        .populate("ownedBy", "host user")
        .then(mycontainer => {
            res.json({ mycontainer })
        })
        .catch(err => {
            console.log(err)
        })

})


router.post('/GetInfo', requireLogin, (req, res) => {
    const { domainName, nickname } = req.body
    var mydocker = new Docker({
        host: domainName,
        port: 2376,
        ca: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'ca.pem'),
        cert: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'cert.pem'),
        key: fs.readFileSync('./configFiles/' + req.user._id.toString() + '/' + nickname + '/' + 'key.pem')
    })

    mydocker.info(function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            res.json({ info })
        }
    })
})

module.exports = router

