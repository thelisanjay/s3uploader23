import React, { useState } from 'react';
import AWS from 'aws-sdk';

// Initialize the AWS SDK with the appropriate credentials and region
const s3 = new AWS.S3({
  accessKeyId: '',  // Replace with your actual AWS access key
  secretAccessKey: '',  // Replace with your actual AWS secret key
  region: 'ap-south-1',  // Your S3 bucket's region
});

const S3Uploader = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);  // To manage loading state

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload to S3
  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file to upload!');
      return;
    }

    setUploading(true);  // Start uploading
    const params = {
      Bucket: '',  // Replace with your S3 bucket name
      Key: file.name,  // Use file name as the key in S3
      Body: file,  // The actual file to upload
      ContentType: file.type,  // Content type for the file
    };

    try {
      const upload = s3.upload(params);

      // Monitor upload progress
      upload.on('httpUploadProgress', (progress) => {
        console.log(`Progress: ${Math.round((progress.loaded / progress.total) * 100)}%`);
      });

      const result = await upload.promise();
      console.log('File uploaded successfully:', result.Location);
      alert(`File uploaded successfully! URL: ${result.Location}`);

      // Set the uploaded file URL to display the image
      setImageUrl(result.Location);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed!');
    } finally {
      setUploading(false);  // Reset uploading state
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload to S3'}
      </button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default S3Uploader;
