var report = require('./weatherApp.js');

var locations = process.argv.slice(2);

locations.forEach(report.get);