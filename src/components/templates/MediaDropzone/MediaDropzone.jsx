import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, Check, Eye } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { LinearProgress } from '../../atoms/Progress/Progress';
import './MediaDropzone.scss';

export const MediaDropzone = ({
  onFilesAdded,
  maxSizeMB = 5,
  acceptedTypes = ['image/png', 'image/jpeg', 'application/pdf'],
  className = '',
  ...props
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({}); // fileIndex: progress percent
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFiles = (files) => {
    const validFiles = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validation checks
      if (!acceptedTypes.includes(file.type) && acceptedTypes.length > 0) {
        alert(`File "${file.name}" type not accepted.`);
        continue;
      }
      if (file.size > maxSizeBytes) {
        alert(`File "${file.name}" exceeds max limit of ${maxSizeMB}MB.`);
        continue;
      }
      
      validFiles.push({
        id: Date.now() + i,
        file,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        status: 'pending'
      });
    }

    if (validFiles.length > 0) {
      const updatedList = [...filesList, ...validFiles];
      setFilesList(updatedList);
      if (onFilesAdded) onFilesAdded(validFiles.map(x => x.file));

      // Trigger mock upload progress for new files
      validFiles.forEach(fileObj => {
        simulateUpload(fileObj.id);
      });
    }
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFilesList(prev =>
          prev.map(f => (f.id === fileId ? { ...f, status: 'complete' } : f))
        );
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
    }, 300);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = (fileId) => {
    setFilesList(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const copy = { ...prev };
      delete copy[fileId];
      return copy;
    });
  };

  return (
    <div className={`media-dropzone-wrapper ${className}`} {...props}>
      <div
        className={`dropzone-area-box ${dragActive ? 'is-active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
          accept={acceptedTypes.join(',')}
          className="dropzone-native-input"
        />
        <UploadCloud size={40} className="dropzone-upload-icon" />
        <p className="dropzone-instruction-text">
          Drag and drop files here, or{' '}
          <span className="upload-trigger-span" onClick={handleButtonClick}>
            browse files
          </span>
        </p>
        <span className="dropzone-limits-label">
          Supported: {acceptedTypes.map(t=>t.split('/')[1].toUpperCase()).join(', ')} (Max {maxSizeMB}MB)
        </span>
      </div>

      {filesList.length > 0 && (
        <div className="uploaded-files-list-section">
          <h5 className="uploaded-list-title">Selected Files</h5>
          <div className="uploaded-files-stack">
            {filesList.map((fileObj) => {
              const progress = uploadProgress[fileObj.id] || 0;

              return (
                <div key={fileObj.id} className="file-item-card">
                  <div className="file-card-details-row">
                    <File size={22} className="file-item-type-icon" />
                    <div className="file-card-info">
                      <span className="file-item-name">{fileObj.name}</span>
                      <span className="file-item-size">{fileObj.size}</span>
                    </div>
                    {fileObj.status === 'complete' ? (
                      <div className="file-status-checkmark"><Check size={16} /></div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(fileObj.id)}
                        className="file-remove-btn"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  {fileObj.status !== 'complete' && (
                    <div className="file-upload-progress-bar">
                      <LinearProgress value={progress} height="4px" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default MediaDropzone;
