// components/ExportCSV.jsx
'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Download } from 'lucide-react';

const ExportCSV = () => {
  const voters = useSelector((state) => state.voters.value);

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((voter) => Object.values(voter).join(','));
    return [headers, ...rows].join('\n');
  };

  const handleExport = () => {
    if (!voters.length) {
      toast.error('❌ No voter data to export');
      return;
    }

    const csvString = convertToCSV(voters);
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voters.csv';
    a.click();
    toast.success(`✅ Exported ${voters.length} voters to CSV!`);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Export Voters</h2>
      <button
        onClick={handleExport}
        className="bg-green-400 text-white px-4 py-2 rounded  flex items-center"
      >
        <Download className="w-5 h-5 mr-2" />
        Export Voters (CSV)
      </button>
    </div>
  );
};

export default ExportCSV;
