var moment = require('moment');

exports.babyTrackData = function(req, res) {
  var GoogleSpreadsheet = require("google-spreadsheet");

  var my_sheet = new GoogleSpreadsheet('1lZfJWfOgL2eXqibV4xJBncEZASMXnyVYYHzTaNVrtIQ');
  my_sheet.getRows(3, {
    'query': '_cn6ca = "' + moment().format('DD-MMM-YYYY') + '"'
  }, function(err, rows) {
    if (err || rows.length < 0) {
      console.log(err);
      res.json({});
      return;
    }
    res.json(rows[0].content);
  });
};

exports.publishMessage = function(req, res, device) {
  var queryString = req.query;
  var e = {
    button1: queryString.button1,
    button2: queryString.button2,
    button3: queryString.button3,
    button4: queryString.button4,
    ping: queryString.ping
  };
  device.publish('topic/baby-track', JSON.stringify(e));
  res.send('Done');
};

exports.getLocalIP = function() {
  var os = require('os');
  var ifaces = os.networkInterfaces();
  var addresses = [];

  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function(iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        addresses.push(iface.address);
      } else {
        addresses.push(iface.address);
      }
      ++alias;
    });
  });

  return addresses[0];
};