import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {}

const FileDropzone: React.FC<FileDropzoneProps> = () => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps({
          className:
            'py-20 md:py-40   p-6  w-full border-2 border-dashed border-gray-400 rounded-md text-center',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-600">Drop the files here...</p>
        ) : (
          <p className="text-gray-600">Drag and drop a PDF file here, or click to select a file</p>
        )}
      </div>
      {file && (
        <div className="mt-4">
          <p className="text-gray-700">File: {file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
