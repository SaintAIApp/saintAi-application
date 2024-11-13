import React, { useEffect, useRef } from "react";
import pdfjsLib from "../lib/worker";

interface FileRendererProps {
  fileUrl: string;
  fileType: string;
}

const FileRenderer: React.FC<FileRendererProps> = ({ fileUrl, fileType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      if (canvasRef.current) {
        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          page.render(renderContext);
        }
      }
    };

    if (fileType === "application/pdf") {
      loadPdf();
    }
  }, [fileUrl, fileType]);

  if (fileType.startsWith("image/")) {
    return <img src={fileUrl} alt="file" className="w-full h-auto" />;
  }

  if (fileType === "application/pdf") {
    return <canvas ref={canvasRef} />;
  }

  return (
    <iframe
      src={fileUrl}
      title="file"
      className="w-full h-full"
      style={{ border: "none" }}
    ></iframe>
  );
};

export default FileRenderer;
