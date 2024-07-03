import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelect }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
    }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps({
          className:
            'py-[5vh] sm:py-[10vh] md:py-[15vh] lg:py-[20vh] p-6 w-full border-2 border-dashed border-slate-500 rounded-md text-center'
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the files here...</p>
        ) : (
          <p className="text-gray-600">Drag and drop a PDF, image (jpg, jpeg, png), or DOCX file here, or click to select a file</p>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;
