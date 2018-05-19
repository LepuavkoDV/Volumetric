/* eslint-disable */
export default function (elemId) {
    var data = document.getElementById(elemId).innerHTML;
    var myWindow = window.open('', '', 'height=400,width=600');
    myWindow.document.write('<html><head><title></title>');
    myWindow.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">');
    myWindow.document.write('<style>@page{margin: 20mm 10mm;}</style>');
    myWindow.document.write('</head><body >');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close(); // necessary for IE >= 10
    myWindow.onload = function () {
        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };
}