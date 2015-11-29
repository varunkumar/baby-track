var https = require('https');

var GOOGLE_DOCS_URL = '/forms/d/1J30U8qD2fgtUXA7s9MQZ-k-jzpNZpeBdxf86pZbXcGk/formResponse',
  PUSH_URL = 'https://adhiyan.in/push-notifications';

exports.handler = function(event, context) {
  if (event.ping) {
    ping(context);
  } else {
    pushDataToGoogleDocs(event, context);
  }
};

function ping(context) {
  https.get(PUSH_URL, function(res) {
    console.log("Got response: " + res.statusCode);
    context.succeed();
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    context.done(null, 'FAILURE');
  });
}

function pushDataToGoogleDocs(event, context) {
  var postData = 'entry.1162053568=' + event.button1 + '&entry.478861520=' + event.button2 + '&entry.580094936=' + event.button3 + '&entry.1434506025=' + event.button4 + '&entry.1890241290=' + event.date;

  var options = {
    hostname: 'docs.google.com',
    path: GOOGLE_DOCS_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {});
    res.on('end', function() {
      context.succeed();
    });
  });

  req.on('error', function(e) {
    context.done(null, 'FAILURE');
  });

  // write data to request body
  req.write(postData);
  req.end();
}