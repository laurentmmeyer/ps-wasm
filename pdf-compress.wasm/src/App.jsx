import {useEffect, useState} from 'react'
import './App.css'
import {_GSPS2PDF} from "./lib/background.js";


function loadPDFData(response) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", response.pdfDataURL);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
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
    const [state, setState] = useState("init")

    function compressPDF(pdf) {
        const dataObject = {psDataURL: pdf}
        _GSPS2PDF(dataObject,
            (element) => {
                console.log(element);
                setState("success")
                loadPDFData(element);
            },
            (...args) => console.log("Progress", JSON.stringify(args)),
            (element) => console.log("Error", JSON.stringify(element)))
    }

    const changeHandler = (event) => {
        const file = event.target.files[0]
        const url = window.URL.createObjectURL(file);
        compressPDF(url)
        setState("loading")
    };

    return (
        <>
            <input type="file" name="file" onChange={changeHandler} />
            <iframe id='the_frame'></iframe>
            <div id='wrapper'>
                <pre id='downloader'></pre>
                <pre id='dl_progress'></pre>
                <pre id='conv_status'></pre>
            </div>
        </>
    )
}

export default App
