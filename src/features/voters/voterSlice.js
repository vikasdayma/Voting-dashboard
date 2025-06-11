


import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [
    {
      voterId: 'ZUL4098745',
      fullName: 'Deepak ',
      firstName: 'Deepak',
      lastName: 'Brahminkar',
      relativeName: 'Laxman Brahminkar',
      houseNo: 'A-12',
      addressLine1: 'Gavane Gali',
      addressLine2: '',
      gender: 'Male',
      age: 27,
      mobileNumber: '9876543210',
      caste: 'Brahmin',
      sectionDetails: '',
      yadiNumber: '',
      assemblyConstituencyNumber: 1,
      assemblyConstituencyName: '',
      assemblyReservationStatus: '',
      lokSabhaConstituencyNumber: 1,
      lokSabhaConstituencyName: '',
      lokSabhaReservationStatus: '',
      hometown: '',
      policeStation: '',
      taluka: '',
      district: 'Indore',
      pinCode: '452001',
    },
    ...Array.from({ length: 30 }, (_, i) => {
      const id = i + 1;
      return {
        voterId: `VOTERID${1000 + id}`,
        fullName: `User ${id} `,
        firstName: `User${id}`,
        lastName: `xyz${id}`,
        relativeName: `Father ${id} `,
        houseNo: `H-${id}`,
        addressLine1: `Street ${id}`,
        addressLine2: '',
        gender: id % 2 === 0 ? 'Male' : 'Female',
        age: 20 + (id % 15),
        mobileNumber: `98765432${String(id).padStart(2, '0')}`,
        caste: id % 2 === 0 ? 'General' : 'OBC',
        sectionDetails: '',
        yadiNumber: '',
        assemblyConstituencyNumber: (id % 3) + 1,
        assemblyConstituencyName: '',
        assemblyReservationStatus: '',
        lokSabhaConstituencyNumber: (id % 2) + 1,
        lokSabhaConstituencyName: '',
        lokSabhaReservationStatus: '',
        hometown: `Town ${id}`,
        policeStation: `PS ${id}`,
        taluka: `Taluka ${id}`,
        district: 'Indore',
        pinCode: '452001',
      };
    })
  ],
};


const voterSlice = createSlice({
  name: 'voters',
  initialState,
  reducers: {
    addVoter: (state, action) => {
      state.value.push(action.payload)
    },
    editVoter: (state, action) => {
      const index = state.value.findIndex(v => v.voterId === action.payload.voterId)
      if (index !== -1) {
        state.value[index] = action.payload
      }
    },
    deleteVoter: (state, action) => {
      state.value = state.value.filter((v,index) => index !== action.payload)
    },
    addMultipleVoters: (state, action) => {
      
      state.value = [...state.value, ...action.payload]
    },
  },
})

export const { addVoter, editVoter, deleteVoter, addMultipleVoters } = voterSlice.actions
export default voterSlice.reducer
