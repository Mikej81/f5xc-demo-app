var express = require('express');
var router = express.Router();
var os = require('os');
const si = require('systeminformation');

function getinfo() {
    // Info
    let info = "Type: " + os.type() + '\n';
    info += "Platform: " + os.platform() + '\n';
    info += "Release: " + os.release() + '\n';
    info += "Architecture: " + os.arch() + '\n';
    info += "CPUs: " + JSON.stringify(os.cpus()) + '\n';
    info += "Total Mem: " + os.totalmem() / (1024 * 1024 * 1024) + ' GB \n';
    info += "Free Mem: " + os.freemem() / (1024 * 1024 * 1024) + ' GB \n';
    info += "hostname: " + os.hostname() + '\n';
    info += "load average: " + os.loadavg() + '\n';
    info += "NICs: " + JSON.stringify(os.networkInterfaces()) + '\n';
    info += "Up Time: " + os.uptime() + '\n';

    return info;
}

/* GET headers page. */
router.get('/', function (req, res, next) {
    res.cookie('DemoCookie', 'OopEepOrpAhAh', {
        maxAge: 3600,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.render('nodeinfo', { title: 'Demo Web Application', data: getinfo() });
});

module.exports = router;
