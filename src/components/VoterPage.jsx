'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoter,editVoter,deleteVoter } from '@/features/voters/voterSlice'
import Modal from '@/components/Modal'
import { toast } from 'react-toastify';
import '../app/globals.css'
import { useRouter } from 'next/navigation'
const ITEMS_PER_PAGE = 25

export default function VoterPage() {
  const voters = useSelector(state => state.voters.value)
  const dispatch = useDispatch()

  
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [ageFilter, setAgeFilter] = useState('')

 
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') 
  const [selectedVoter, setSelectedVoter] = useState(null)

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState(null)

  
  const filteredVoters = useMemo(() => {
    return voters.filter(v => {
  
      const matchesSearch =
        v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.voterId.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGender = genderFilter ? v.gender === genderFilter : true

 
      const matchesAge = ageFilter
        ? ageFilter === '18-30'
          ? v.age >= 18 && v.age <= 30
          : ageFilter === '31-50'
          ? v.age >= 31 && v.age <= 50
          : ageFilter === '50+'
          ? v.age > 50
          : true
        : true

      return matchesSearch && matchesGender && matchesAge
    })
  }, [voters, searchTerm, genderFilter, ageFilter])

  
  const totalPages = Math.ceil(filteredVoters.length / ITEMS_PER_PAGE)
  const paginatedVoters = filteredVoters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )


  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1)
  }, [totalPages, currentPage])

  
  const [formData, setFormData] = useState({
    voterId: '',
    fullName: '',
    firstName: '',
    lastName: '',
    relativeName: '',
    houseNo: '',
    addressLine1: '',
    addressLine2: '',
    gender: '',
    age: '',
    mobileNumber: '',
    caste: '',
    sectionDetails: '',
    yadiNumber: '',
    assemblyConstituencyNumber: '',
    assemblyConstituencyName: '',
    assemblyReservationStatus: '',
    lokSabhaConstituencyNumber: '',
    lokSabhaConstituencyName: '',
    lokSabhaReservationStatus: '',
    hometown: '',
    policeStation: '',
    taluka: '',
    district: '',
    pinCode: '',
  })

 
  function openAddModal() {
    setFormData({
      voterId: '',
      fullName: '',
      firstName: '',
      lastName: '',
      relativeName: '',
      houseNo: '',
      addressLine1: '',
      addressLine2: '',
      gender: '',
      age: '',
      mobileNumber: '',
      caste: '',
      sectionDetails: '',
      yadiNumber: '',
      assemblyConstituencyNumber: '',
      assemblyConstituencyName: '',
      assemblyReservationStatus: '',
      lokSabhaConstituencyNumber: '',
      lokSabhaConstituencyName: '',
      lokSabhaReservationStatus: '',
      hometown: '',
      policeStation: '',
      taluka: '',
      district: '',
      pinCode: '',
    })
    setModalMode('add')
    setModalOpen(true)
  }


  function openEditModal(voter) {
    setFormData(voter)
    setModalMode('edit')
    setModalOpen(true)
  }

  
  function openViewModal(voter) {
    setSelectedVoter(voter)
    setModalMode('view')
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false)
    setSelectedVoter(null)
  }


  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  


  function handleSubmit(e) {
    e.preventDefault();
  
    const {
      voterId,
      fullName,
      firstName,
      lastName,
      age,
      mobileNumber,
      pinCode,
      gender,
      relativeName,
      district
    } = formData;
  


    const trimmedVoterId = voterId.trim().toUpperCase();
    const trimmedFullName = fullName.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
  
   
    if (!trimmedVoterId || !trimmedFullName || !trimmedFirstName || !trimmedLastName || !age) {
      toast.error('Voter ID, Full Name, First Name, Last Name, and Age are required.');
      return;
    }
  
    
    const isDuplicate = modalMode === 'add' && voters.some(voter => voter.voterId === trimmedVoterId);
    if (isDuplicate) {
      toast.error('This Voter ID already exists.');
      return;
    }
  
  
    if (!trimmedFullName.includes(trimmedFirstName) || !trimmedFullName.includes(trimmedLastName)) {
      toast.error('Full name must contain both the first name and last name.');
      return;
    }
  
 
    const parsedAge = parseInt(age);
    if (isNaN(parsedAge) || parsedAge < 18) {
      toast.error('Age must be 18 or above.');
      return;
    }
  
    if (mobileNumber && !/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast.error('Invalid mobile number. It must be 10 digits starting with 6-9.');
      return;
    }
  
  
    if (!/^[A-Z]{3}\d{7}$/.test(trimmedVoterId)) {
      toast.error('Voter ID should be in format like ABC1234567 (3 uppercase letters + 7 digits).');
      return;
    }
  
    
    if (pinCode && !/^\d{6}$/.test(pinCode)) {
      toast.error('PIN Code must be a valid 6-digit number.');
      return;
    }
  
    
    const validGenders = ['Male', 'Female', 'Other'];
    if (gender && !validGenders.includes(gender)) {
      toast.error('Gender must be Male, Female, or Other.');
      return;
    }
  
    
    if (relativeName && /\d/.test(relativeName)) {
      toast.error('Relative name should not contain numbers.');
      return;
    }
  
    // === District Validation ===
    if (district && /[^a-zA-Z\s]/.test(district)) {
      toast.error('District should contain only letters.');
      return;
    }
  
    
    const finalFormData = {
      ...formData,
      voterId: trimmedVoterId,
      fullName: trimmedFullName,
      firstName: trimmedFirstName,
      lastName: trimmedLastName
    };
  
   
    if (modalMode === 'add') {
      dispatch(addVoter(finalFormData));
      toast.success('Voter added successfully!');
    } else if (modalMode === 'edit') {
      dispatch(editVoter(finalFormData));
      toast.success('Voter updated successfully!');
    }
  
    setModalOpen(false);
  }
 
  function confirmDelete(voterId) {
    setDeleteTargetId(voterId)
    setDeleteConfirmOpen(true)
  }


  function handleDelete() {
    dispatch(deleteVoter(deleteTargetId))
    setDeleteConfirmOpen(false)
  }

 
  function cancelDelete() {
    setDeleteTargetId(null)
    setDeleteConfirmOpen(false)
  }

  
  function handlePrint() {
    const printContent = document.getElementById('voter-table').outerHTML
    const newWin = window.open('', '', 'width=900,height=650')
    newWin.document.write('<html><head><title>Print Voters</title>')
    newWin.document.write(
      '<style>table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ccc;padding:8px;text-align:left;} </style>'
    )
    newWin.document.write('</head><body >')
    newWin.document.write(printContent)
    newWin.document.write('</body></html>')
    newWin.document.close()
    newWin.focus()
    newWin.print()
    newWin.close()
  }
  const router =useRouter();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setChecking(false); 
      }
    }, 2500); 
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Checking login status...</p>
      </div>
    );
  }
  return (
    <div className="md:p-6 w-full max-w-full md:w-full overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-6">Voter Management</h1>

     
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-60"
        />
        <select
          value={genderFilter}
          onChange={e => setGenderFilter(e.target.value)}
          className="border px-10 py-3 rounded bg-black"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={ageFilter}
          onChange={e => setAgeFilter(e.target.value)}
          className="border px-10 py-2 rounded bg-black"
        >
          <option value="">All Ages</option>
          <option value="18-30">18-30</option>
          <option value="31-50">31-50</option>
          <option value="50+">50+</option>
        </select>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add Voter
        </button>
        <button
          onClick={handlePrint}
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-700"
        >
          Print
        </button>
      </div>

  
      
      <table id='voter-table' className="min-w-[100px] w-[200px] md:w-fit max-w-full md:max-w-full  md:min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-00">
            <th className="border border-gray-300 p-2">Voter ID</th>
            <th className="border border-gray-300 p-2">Full Name</th>
            <th className="border border-gray-300 p-2 hidden show-after-600">Gender</th>
            <th className="border border-gray-300 p-2 ">Age</th>
            <th className="border border-gray-300 p-2 hidden show-after-600 ">Mobile</th>
            <th className="border border-gray-300 p-2 hidden show-after-600 ">District</th>
            <th className="border border-gray-300 p-2  " >Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedVoters.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center p-4 text-gray-500"
              >
                No voters found.
              </td>
            </tr>
          ) : (
            paginatedVoters.map((voter,index) => (
              <tr key={index} className="">
                <td className="border border-gray-300 p-2">{voter.voterId}</td>
                <td className="border border-gray-300 p-2">{voter.fullName}</td>
                <td className="border border-gray-300  p-2 hidden show-after-600">{voter.gender}</td>
                <td className="border border-gray-300 p-2 ">{voter.age}</td>
                <td className="border border-gray-300 p-2 hidden show-after-600">{voter.mobileNumber}</td>
                <td className="border border-gray-300 p-2 hidden show-after-600 ">{voter.district}</td>
                <td className="border border-gray-300 p-2  space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openViewModal(voter)}
                  >
                    View
                  </button>
                  <button
                    className="text-green-600 hover:underline"
                    onClick={() => openEditModal(voter)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => confirmDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
      
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-yellow-400 text-black' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

   
      <Modal
        isOpen={modalOpen && (modalMode === 'add' || modalMode === 'edit' )}
        onClose={closeModal}
        title={modalMode === 'add' ? 'Add Voter' : 'Edit Voter'}
      >
    
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-auto bg-white p-2 text-black">
          <div>
            <label className="block mb-1 font-semibold">Voter ID*</label>
            <input
              type="text"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              disabled={modalMode === 'edit'} // Prevent changing voterId on edit
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
             
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Relative Name</label>
            <input
              type="text"
              name="relativeName"
              value={formData.relativeName}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">House No.</label>
              <input
                type="text"
                name="houseNo"
                value={formData.houseNo}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                min={0}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
             onClick={closeModal}
            className="px-4 py-2 border rounded "
              >
Cancel
</button>
<button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" >
{modalMode === 'add' ? 'Add' : 'Update'}
</button>
</div>
</form>
</Modal> 
  {/* Delete confirmation modal */}
  <Modal
    isOpen={deleteConfirmOpen}
    onClose={cancelDelete}
    title="Confirm Deletion"
  >
    <p className='text-black'>Are you sure you want to delete this voter?</p>
    <div className="flex justify-end space-x-3 mt-6">
      <button
        onClick={cancelDelete}
        className="px-4 py-2 border rounded text-black hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </Modal>
  <Modal
  isOpen={modalOpen && modalMode === 'view'}
  onClose={closeModal}
  title="View Voter"
>
  <div className="space-y-4 max-h-[70vh] overflow-auto bg-white text-black p-2">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold">Voter ID</p>
        <p>{selectedVoter?.voterId || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Full Name</p>
        <p>{selectedVoter?.fullName || '-'}</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold">First Name</p>
        <p>{selectedVoter?.firstName || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Last Name</p>
        <p>{selectedVoter?.lastName || '-'}</p>
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold">Relative Name</p>
      <p>{selectedVoter?.relativeName || '-'}</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold">House No.</p>
        <p>{selectedVoter?.houseNo || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Address Line 1</p>
        <p>{selectedVoter?.addressLine1 || '-'}</p>
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold">Address Line 2</p>
      <p>{selectedVoter?.addressLine2 || '-'}</p>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm font-semibold">Gender</p>
        <p>{selectedVoter?.gender || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Age</p>
        <p>{selectedVoter?.age || '-'}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Mobile Number</p>
        <p>{selectedVoter?.mobileNumber || '-'}</p>
      </div>
    </div>

    <div>
      <p className="text-sm font-semibold">District</p>
      <p>{selectedVoter?.district || '-'}</p>
    </div>

    <div className="flex justify-end space-x-3 mt-6">
      <button
        onClick={closeModal}
        className="px-4 py-2 border rounded text-black hover:bg-gray-100"
      >
        Close
      </button>
    </div>
  </div>
</Modal>


</div>
)
}



