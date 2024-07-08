import { useEffect } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

const qrcodeRegionId = "html5qr-code-full-region";

const Scanner = ({ classname, width, onScan }) => {
    let html5QrCode;

    useEffect(() => {
        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.333334,
            disableFlip: false,
            rememberLastUsedCamera: true,
            formatsToSupport: [
                Html5QrcodeSupportedFormats.QR_CODE,
                Html5QrcodeSupportedFormats.AZTEC,
                Html5QrcodeSupportedFormats.CODABAR,
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.CODE_93,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.DATA_MATRIX,
                Html5QrcodeSupportedFormats.ITF,
                Html5QrcodeSupportedFormats.MAXICODE,
                Html5QrcodeSupportedFormats.PDF_417,
                Html5QrcodeSupportedFormats.RSS_14,
                Html5QrcodeSupportedFormats.RSS_EXPANDED,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
                Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.EAN_8
            ],
            useBarCodeDetectorIfSupported: true,
            willReadFrequently: true,
            showZoomSliderIfSupported: true,
            defaultZoomValueIfSupported: 2,
        };

        const verbose = false;
        html5QrCode = new Html5Qrcode(qrcodeRegionId, verbose);
        const audio = new Audio('/Scanner/barcode.wav'); // success audio

        const onScanSuccess = (decodedText, decodedResult) => {
            console.log(`Code matched = ${decodedText}`, decodedResult);
            if (onScan) {
                onScan(decodedText);
            }
            audio.play();
            html5QrCode.pause();

            setTimeout(() => {
             html5QrCode.resume();
            }, 1000)
        };

        const startScanner = (cameraId) => {
            html5QrCode.start(
                cameraId,
                config,
                onScanSuccess,
            ).catch(err => {
                console.error("Error starting Html5Qrcode: ", err);
            });

            // clear scanner after unmounting
            return () => {
                html5QrCode.stop().catch(error => {
                    console.error("Failed to stop Html5Qrcode: ", error);
                });
            };
        };

        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                // try to select back cameras
                const backCamera = devices.find(device => device.label.toLowerCase().includes('back'));
                if (backCamera) {
                    startScanner({ deviceId: { exact: backCamera.id } });
                } else {
                    startScanner({ facingMode: "environment" });
                }
            } else {
                console.error("No cameras found.");
            }
        }).catch(err => {
            console.error("Error getting cameras: ", err);
        });
    }, [onScan]);

    return (
        <div className={`${classname}`} id={qrcodeRegionId} style={{ width: width }} />
    );
};

export default Scanner;