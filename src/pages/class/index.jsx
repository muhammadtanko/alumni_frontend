// src/pages/Class.js
import Layout from "../../layouts/layout";
import React, { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';

export default function Class() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]); // Ensure the initial state is an array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://alumni-server-ymq4.onrender.com/api/v1/user');
        const { ok, payLoad } = await response.json();
        console.log("data", payLoad);
        setUsers(payLoad); // Ensure the fetched data is set to the users state
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Ensure paginatedUsers is calculated only when users is an array
  const paginatedUsers = Array.isArray(users) ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleActivate = (userId) => {
    // Handle activation logic
    console.log(`Activating user with ID: ${userId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusColors = {
    'Active': 'bg-green-200 text-green-800',
    'Inactive': 'bg-red-200 text-red-800',
    'Pending': 'bg-yellow-200 text-yellow-800'
  };

  const buttonStyles = 'bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-800';

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!isLoading && !error && (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chapter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map(user => (
                  <tr key={user.id} onClick={() => handleRowClick(user)} className="hover:bg-gray-100 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{`${user.firstName} ${user.lastName}`
                    }</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.class.yearOfGraduation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.chapter.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleActivate(user.id); }}
                        className={buttonStyles}
                      >
                        Activate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${currentPage === page ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedUser && (
          <Modal
            show={showModal}
            size="md"
            popup={true}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-32 h-32 rounded-full mx-auto" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">{selectedUser.name}</h3>
                <p className="text-sm text-gray-500">{selectedUser.class} - {selectedUser.chapter}</p>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
