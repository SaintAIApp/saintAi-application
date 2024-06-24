import * as pdfjsLib from 'pdfjs-dist';

// Assuming you have the worker bundled and available at a specific URL
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default pdfjsLib;
