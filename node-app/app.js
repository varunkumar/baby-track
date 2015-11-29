var awsIot = require('aws-iot-device-sdk'),
  beacon = require('eddystone-beacon'),
  express = require('express'),
  router = require('./router'),
  app = express();

app.get('/publish-message', function(req, res) {
  router.publishMessage(req, res, device);
});
app.get('/data', router.babyTrackData);

var server = app.listen(3700);

var device = awsIot.device({
  keyPath: '../cert/baby-track-pad-private-key.pem',
  certPath: '../cert/baby-track-pad-cert.pem',
  caPath: '../cert/root-cert.pem',
  clientId: 'baby-track-client',
  region: 'us-east-1'
});

device.on('connect', function() {
  console.log('connect');
  device.subscribe('topic/baby-track');
});

device.on('message', function(topic, payload) {
  console.log('message', topic, payload.toString());
});

beacon.advertiseUrl('http://' + router.getLocalIP()[0] + '/data');

if (process.send) {
  process.send('online');
}

process.on('message', function() {
  if (message === 'shutdown') {
    process.exit(0);
  }
});