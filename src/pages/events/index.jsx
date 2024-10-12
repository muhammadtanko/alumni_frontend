import Layout from "../../layouts/layout";
import React, { useState, useEffect } from 'react';
import { Drawer } from "flowbite-react";
import { configs } from "../../config";
import { IoMdAdd } from "react-icons/io";
import { Modal } from "flowbite-react";
import EventForm from "./registerForm";
export default function Events() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${configs.baseUrl}/event`);
        const data = await response.json()
        const { payLoad } = data
        console.log("payLoad", payLoad);
        setEvents(payLoad);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle row click to open drawer with event details
  const handleRowClick = (event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  // Handle drawer close
  const handleClose = () => setIsDrawerOpen(false);

  const statusColors = {
    'Scheduled': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Ongoing': 'bg-yellow-100 text-yellow-800',
    'Postponed': 'bg-red-100 text-red-800'
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {/* Handle loading and error states */}
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        {!isLoading && !error && (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((event, index) => (
                  <tr key={event._id} onClick={() => handleRowClick(event)} className="hover:bg-gray-100 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{event.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(event.startTime).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(event.endTime).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full ${statusColors[event.status]}`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Handle pagination (if needed) */}
            {/* Add pagination component here if events exceed itemsPerPage */}
          </>
        )}

        {/* Drawer to show event details */}
        {selectedEvent && (
          <Drawer open={isDrawerOpen} onClose={handleClose} position="right">
            <Drawer.Header title={selectedEvent.title} />
            <Drawer.Items>
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                  <h6 className="text-md font-semibold text-blue-700">General Information</h6>
                  <p className="text-sm text-gray-600">Category: <span className="font-medium">{selectedEvent.category}</span></p>
                  <p className="text-sm text-gray-600">Start Time: <span className="font-medium">{new Date(selectedEvent.startTime).toLocaleString()}</span></p>
                  <p className="text-sm text-gray-600">End Time: <span className="font-medium">{new Date(selectedEvent.endTime).toLocaleString()}</span></p>
                  <p className="text-sm text-gray-600">Status: <span className={`font-medium ${statusColors[selectedEvent.status]}`}>{selectedEvent.status}</span></p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h6 className="text-md font-semibold text-blue-700 mb-2">Other Information</h6>
                  <p className="text-sm text-gray-600">Description: <span className="font-medium">{selectedEvent.description}</span></p>
                  {selectedEvent.url && (
                    <p className="text-sm text-gray-600">URL: <a href={selectedEvent.url} className="text-cyan-600 underline hover:no-underline" target="_blank" rel="noopener noreferrer">{selectedEvent.url}</a></p>
                  )}
                </div>
              </div>
            </Drawer.Items>
          </Drawer>
        )}
        {showModal && (
          <Modal
            show={showModal}
            size="md"
            popup={true}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">Register an Event</h2>
              </div>
              {/* Event Form */}
              <EventForm />
            </Modal.Body>
          </Modal>
        )}
        <button
          className="fixed bottom-12 right-12 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-transform duration-300"
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd size={24} />
        </button>
      </div>
    </Layout>
  );
}
