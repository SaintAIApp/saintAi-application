import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFileService from '../../hooks/useFileService';
import { Upload } from '../../types/data';
// import FileRenderer from '../../components/FileRenderer';



const Index: React.FC = () => {
  const { uploadId } = useParams<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadData, setUploadData] = useState<Upload | null>(null);
  const { getFile } = useFileService();

  useEffect(() => {
    const fetchFile = async () => {
      setIsLoading(true);
      try {
        const res = await getFile(uploadId || '');
        if (res.status === 200) {
          setUploadData(res.data.data);
    
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='min-h-[80vh] w-full flex justify-center items-center py-4'>
      <div className='left w-1/2  h-full'>
        <div className=' bg-dark h-full min-h-[80vh] w-full p-3 '>
          <h1>File Name:{uploadData?.name}</h1>
        </div>
      </div>

        {uploadData && (
         <iframe
         src={uploadData.fileUrl}
         title="file"
         className="w-1/2 min-h-[80vh]"
         style={{ border: 'none' }}
       ></iframe>
        )}

    </section>
  );
};

export default Index;
