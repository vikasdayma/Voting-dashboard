// components/ImportCSV.jsx
'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addMultipleVoters } from '@/features/voters/voterSlice';
import { parseCSV } from '@/utils/parseCSV';
import { Upload } from 'lucide-react';

const ImportCSV = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('❌ Only CSV files are supported!');
      return;
    }

    setFileName(file.name);
    try {
      const text = await file.text();
      const jsonData = parseCSV(text);
      dispatch(addMultipleVoters(jsonData));
      toast.success(`✅ Imported ${jsonData.length} voters successfully!`);
    } catch (err) {
      toast.error('❌ Failed to parse CSV file.');
      console.error(err);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Import Voters</h2>
      <label
        htmlFor="csv-upload"
        className="flex items-center justify-center w-full border-2 border-dashed border-gray-400 p-4 cursor-pointer hover:bg-gray-900 rounded-md"
      >
        <Upload className="w-5 h-5 mr-2" />
        <span>Select CSV File</span>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {fileName && <p className="text-sm mt-2 text-gray-500">Selected: {fileName}</p>}
    </div>
  );
};

export default ImportCSV;
