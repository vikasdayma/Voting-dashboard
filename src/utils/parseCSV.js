// utils/parseCSV.js
export const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map((h) => h.trim());
  
    const fieldMap = {
      'Voter ID': 'voterId',
      'Full Name': 'fullName',
      'First Name': 'firstName',
      'Last Name': 'lastName',
      'Husband/Father/Mother Name': 'relativeName',
      'House No.': 'houseNo',
      'Address Line 1': 'addressLine1',
      'Address Line 2': 'addressLine2',
      'Gender': 'gender',
      'Age': 'age',
      'Mobile Number': 'mobileNumber',
      'Caste': 'caste',
      'Section Details': 'sectionDetails',
      'Yadi Number': 'yadiNumber',
      'Assembly Constituency Number': 'assemblyConstituencyNumber',
      'Assembly Constituency Name': 'assemblyConstituencyName',
      'Assembly Reservation Status': 'assemblyReservationStatus',
      'Lok Sabha Constituency Number': 'lokSabhaConstituencyNumber',
      'Lok Sabha Constituency Name': 'lokSabhaConstituencyName',
      'Lok Sabha Reservation Status': 'lokSabhaReservationStatus',
      'Hometown': 'hometown',
      'Police Station': 'policeStation',
      'Taluka': 'taluka',
      'District': 'district',
      'Pin Code': 'pinCode'
    };
  
    const mappedHeaders = headers.map((h) => fieldMap[h] || h);
  
    return lines.slice(1).map((line) => {
      const values = line.split(',').map((v) => v.trim());
      const obj = {};
      mappedHeaders.forEach((key, index) => {
        obj[key] = values[index] || '';
      });
      return obj;
    });
  };
  