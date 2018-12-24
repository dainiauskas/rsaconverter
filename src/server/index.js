const express = require('express');
const os = require('os');
const exec = require("child_process").exec
const tmp = require('tmp');
const fs = require('fs');

const app = express();

app.use(require("body-parser").json());
app.use(express.static('dist'));

app.post('/api/convertRSA', (req, res) => {
  var rsa = '-----BEGIN RSA PRIVATE KEY-----\n' + req.body.idRSA + '\n-----END RSA PRIVATE KEY-----\n'
  var passfile = tmp.fileSync()

  fs.writeFileSync(passfile.name, rsa)

  exec(`openssl rsa -in ${passfile.name}`, (error, stdout, stderr) => {
    fs.unlinkSync(passfile.name);

    console.log('KEY generated');
    return res.send({ key: stdout, error: stderr })
  })

});

app.listen(8080, () => console.log('Listening on port 8080!'));
