mosquitto_pub --cafile cert/root-cert.pem --cert cert/baby-track-pad-cert.pem --key cert/baby-track-pad-private-key.pem -h data.iot.us-east-1.amazonaws.com -p 8883 -q 1 -d -t topic/baby-track -i clientid2 -m "{\"testdata\":1}"