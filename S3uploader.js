import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3Uploader = () => {
  const [file, setFile] = useState(null);

  // Set up S3 configuration
  // const s3 = new AWS.S3({
  //   accessKeyId: '',
  //   secretAccessKey: '',
  //   region: '',
  // });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file to upload!');
      return;
    }

    // const params = {
    //   Bucket: '', // Replace with your bucket name
    //   Key: file.name, // File name in S3
    //   Body: file, // File content
    //   ContentType: file.type,
    // };

    try {
      const upload = s3.upload(params);

      upload.on('httpUploadProgress', (progress) => {
        console.log(`Progress: ${Math.round((progress.loaded / progress.total) * 100)}%`);
      });

      const result = await upload.promise();
      console.log('File uploaded successfully:', result.Location);
      alert(`File uploaded successfully! URL: ${result.Location}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload to S3</button>
    </div>
  );
};

export default S3Uploader;
