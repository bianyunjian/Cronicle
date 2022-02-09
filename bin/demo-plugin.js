#!/usr/bin/env node

const axios = require('axios').default;
var rl = require('readline').createInterface({ input: process.stdin });

rl.on('line', function (line) {
    // got line from stdin, parse JSON
    var job = JSON.parse(line);
    console.log("Running job: " + job.id + ": " + JSON.stringify(job));

    let url = job.params.url;
    console.log("url: ", url);
    let params = JSON.parse(job.params.params);
    console.log("params: ", params);

    console.log("start request from url");
    process.stdout.write(JSON.stringify({ progress: 0.1 }) + "\n");

    axios.post(url, params)
        .then(function (response) {
            if (response && response.data) {
                console.log('reponse ', response.status, ':', response.data);
            }
            console.log("Job complete, exiting.");

            process.stdout.write(JSON.stringify({
                complete: 1,
                code: 0
            }) + "\n");
        })
        .catch(function (error) {
            console.log(error);
        });

    // close readline interface
    rl.close();
});