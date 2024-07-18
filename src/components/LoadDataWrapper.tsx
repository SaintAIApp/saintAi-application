import React, { useState, useEffect } from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import LoadData from '../pages/LoadData2';
import SideBar from '../components/SideBar';
import useFileService from '../hooks/useFileService';
import { Upload } from '../types/data';

const LoadDataWrapper: React.FC = () => {
  const { getAllFiles, deleteFile } = useFileService();
  const [files, setFiles] = useState<Upload[] | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileSelectedDelete, setFileSeletedDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await getAllFiles();
      const filteredFiles = res.data.data.filter(
        (file: any) => file.name !== "SAINT_AI" && file.name !== "SAINT_AI_DOC"
      );
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleCancelSubscription = async () => {
    if (!fileSelectedDelete || !files) return;
    try {
      const res = await deleteFile(fileSelectedDelete);
      if (res) {
        const updatedList = files.filter(e => e._id !== fileSelectedDelete);
        setFiles(updatedList);
        setSelectedFileId(null);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <SidebarLayout
      customSidebar={
        <SideBar
          files={files}
          handleCancelSubscription={handleCancelSubscription}
          setFileSeletedDelete={setFileSeletedDelete}
          setSelectedFileId={setSelectedFileId}
          selectedFileId={selectedFileId}
        />
      }
    >
      <LoadData
        files={files}
        setFiles={setFiles}
        selectedFileId={selectedFileId}
        setSelectedFileId={setSelectedFileId}
      />
    </SidebarLayout>
  );
};

export default LoadDataWrapper;