mosquitto_sub --cafile cert/root-cert.pem --cert cert/baby-track-pad-cert.pem --key cert/baby-track-pad-private-key.pem -h A2BNTRU79QCITI.iot.us-east-1.amazonaws.com -p 8883 -q 1 -d -t topic/baby-track -i clientid1