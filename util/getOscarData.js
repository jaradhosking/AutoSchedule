const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('', (req, res) => {
  request(
    { url: 'https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse?term_in=$202002&subj_in=$CS&crse_in=$2316&schd_in=%' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      console.log(res);
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

function getRawHTML (sem, dept, cNum) {
    URL = `https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse?term_in=${sem}&subj_in=${dept}&crse_in=${+cNum}&schd_in=%`
    url1 = "https://cors-anywhere.herokuapp.com/" + URL
    $.get(url1, function (html) {
        $(html).find("table").each(function () {
            console.log(this);
        })
    })
}
