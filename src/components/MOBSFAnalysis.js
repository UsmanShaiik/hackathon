import React, { useState } from 'react';
import axios from 'axios';
import './MOBSFAnalysis.css'; // Import the CSS file

function MOBSFAnalysis() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [scanId, setScanId] = useState('');
    const [status, setStatus] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            alert('Please select an APK file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const uploadResponse = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setScanId(uploadResponse.data.scan_id);
            setStatus('Scanning...');
            checkScanStatus(uploadResponse.data.scan_id);
        } catch (error) {
            console.error('Error uploading APK:', error);
            setStatus('Error uploading APK.');
        }
    };

    const checkScanStatus = async (scanId) => {
        const intervalId = setInterval(async () => {
            try {
                const statusResponse = await axios.get(`http://localhost:5000/scan_logs/${scanId}`);
                if (statusResponse.data.status === 'completed') {
                    clearInterval(intervalId);
                    setStatus('Scan completed. Downloading report...');
                    downloadPdfReport(scanId);
                }
            } catch (error) {
                console.error('Error checking scan status:', error);
            }
        }, 5000);
    };

    const downloadPdfReport = async (scanId) => {
        try {
            const pdfResponse = await axios.get(`http://localhost:5000/download_pdf/${scanId}`, {
                responseType: 'blob'
            });
            
            const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfUrl);

            setStatus('Report ready.');
        } catch (error) {
            console.error('Error downloading PDF report:', error);
            setStatus('Error downloading report.');
        }
    };

    return (
        <div className="container">
            <h1>MobSF APK Analysis</h1>

            <input
                type="file"
                onChange={handleFileChange}
                accept=".apk"
                className="input-file"
            />

            <button onClick={handleAnalyze} className="button">Analyze</button>

            <p className="status">{status}</p>

            {pdfUrl && (
                <iframe
                    src={pdfUrl}
                    className="iframe-container"
                    title="PDF Report"
                ></iframe>
            )}
        </div>
    );
}

export default MOBSFAnalysis;
