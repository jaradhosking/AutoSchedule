
function getRawHTML (sem, dept, cNum) {
    URL = `https://oscar.gatech.edu/pls/bprod/bwckctlg.p_disp_listcrse?term_in=${sem}&subj_in=${dept}&crse_in=${+xcNum}&schd_in=%`
    $.get(URL, function (html) {
        $(html).find("table").each(function () {
            console.log(this);
        })
    })
}
