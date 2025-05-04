
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface FileUploadProps {
  label: string;
  onFileChange: (file: File | null) => void;
  accept?: string;
  source?: string;
}

const FileUpload = ({ label, onFileChange, accept = ".xlsx,.xls,.csv", source }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const inputId = `file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onFileChange(droppedFile);
      setIsDraggingOver(false);
    }
  };

  return (
    <div
      className={`border border-dashed rounded-md transition-all h-[112px] ${
        isDraggingOver ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-white/20'
      } ${file ? 'border-[#10B981] bg-[#10B981]/10' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="font-medium truncate max-w-[180px]">{file.name}</div>
            <div className="text-xs text-gray-400 mt-1">Click to change</div>
          </div>
        </div>
      ) : (
        <>
          <input
            type="file"
            id={inputId}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <label htmlFor={inputId} className="cursor-pointer block h-full">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-white/5 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                <Plus className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-sm font-medium">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-500 mt-1">Excel or CSV file</p>
              {source && <p className="text-xs font-medium mt-1 text-blue-400">{source}</p>}
            </div>
          </label>
        </>
      )}
    </div>
  );
};

export default FileUpload;
