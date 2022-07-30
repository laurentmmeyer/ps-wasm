import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {_GSPS2PDF} from "./lib/background.js";

// const showFile = (blobData, reportName) => {
//     // Adapted from: https://blog.jayway.com/2017/07/13/open-pdf-downloaded-api-javascript/
//     const fileName = reportName && `${reportName}.pdf` || 'myreport.pdf';
//
//     const newBlob = new Blob([blobData], {type: "application/pdf"});
//
//     const newWindow = window.open('', reportName, "width=800,height=1200");
//     if (!!newWindow) {
//         setTimeout(() => {
//             const dataUrl = window.URL.createObjectURL(newBlob);
//             const title = newWindow.document.createElement('title');
//             const iframe = newWindow.document.createElement('iframe');
//
//             title.appendChild(document.createTextNode(reportName));
//             newWindow.document.head.appendChild(title);
//
//             iframe.setAttribute('src', dataUrl);
//             iframe.setAttribute('width', "100%");
//             iframe.setAttribute('height', "100%");
//
//             newWindow.document.body.appendChild(iframe);
//
//             setTimeout(() => {
//                 // For Firefox it is necessary to delay revoking the ObjectURL
//                 window.URL.revokeObjectURL(dataUrl);
//             }, 100);
//         }, 100);
//     } else {
//         alert("To display reports, please disable any pop-blockers for this page and try again.");
//     }
//
// };

function loadPDFData(response) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", response.pdfDataURL);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        window.URL.revokeObjectURL(response.pdfDataURL);
        var blob = new Blob([xhr.response], {type: "application/pdf"});
        var pdfURL = window.URL.createObjectURL(blob);
        var filename = "didier.pdf"
        // var displayURL = "chrome-extension://" + chrome.runtime.id + '/' + response.url; // this is the best we can do
        document.getElementById('wrapper').remove();
        var frame = document.getElementById('the_frame');
        frame.width = '100%';
        frame.style.height = '100vh';
        frame.style.border = '0px';
        frame.src = pdfURL;
        window.history.replaceState(null, filename);
        document.title = filename;
    };
    xhr.send();
}

function App() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const pdf = "https://jobninja.com/agb.pdf"
        const dataObject = {psDataURL: pdf}
        _GSPS2PDF(dataObject,
            (element) => {
                console.log(element);

                loadPDFData(element);
            },
            (element) => console.log(JSON.stringify(element)),
            (element) => console.log(JSON.stringify(element)))
    }, [])

    return (
        <body>
        <iframe id='the_frame'></iframe>
        <div id='wrapper'>
            <pre id='downloader'></pre>
            <pre id='dl_progress'></pre>
            <pre id='conv_status'></pre>
        </div>
        </body>

    )
}

export default App
