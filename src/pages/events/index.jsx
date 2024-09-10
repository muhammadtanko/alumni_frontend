import Layout from "../../layouts/layout";
import React, { useState, useEffect } from 'react';
import { Button, Drawer, Modal } from "flowbite-react";
import { configs } from "../../config";
export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const data = [
    {
      no: 1, name: "Annual General Meeting", type: "Virtual Meeting", startTime: "2024-09-01 09:00", endTime: "2024-09-01 11:00", status: "Scheduled",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    {
      no: 2, name: "Board Meeting", type: "Virtual Meeting", startTime: "2024-09-02 14:00", endTime: "2024-09-02 15:30", status: "Completed",
      description: "Board meeting for all board members.", url: "https://example.com/event1"
    },
    {
      no: 3, name: "Workshop on Strategy", type: "Workshop", startTime: "2024-09-03 10:00", endTime: "2024-09-03 13:00", status: "Ongoing",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    {
      no: 4, name: "Monthly Review", type: "Physical Meeting", startTime: "2024-09-04 11:00", endTime: "2024-09-04 12:00", status: "Completed",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    {
      no: 5, name: "Team Building Activity", type: "Graduation", startTime: "2024-09-05 09:30", endTime: "2024-09-05 16:00", status: "Scheduled",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    { no: 6, name: "Product Launch", type: "Election", startTime: "2024-09-06 10:00", endTime: "2024-09-06 12:00", status: "Postponed" },
    {
      no: 7, name: "Financial Report Meeting", type: "Meeting", startTime: "2024-09-07 14:30", endTime: "2024-09-07 16:00", status: "Scheduled",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    {
      no: 8, name: "Marketing Strategy Session", type: "Workshop", startTime: "2024-09-08 09:00", endTime: "2024-09-08 11:00", status: "Ongoing",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    {
      no: 9, name: "Quarterly Planning", type: "Meeting", startTime: "2024-09-09 13:00", endTime: "2024-09-09 15:00", status: "Completed",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
    {
      no: 10, name: "CSR Initiative Kickoff", type: "Election", startTime: "2024-09-10 10:30", endTime: "2024-09-10 12:00", status: "Scheduled",
      description: "Annual meeting for all members.", url: "https://example.com/event1"
    },
  ]
  const handleClose = () => setIsDrawerOpen(false);
  const itemsPerPage = 5;
  useEffect(() => {
    // const fetchUsers = async () => {
    //   try {
    //     console.log("fetching!!");
    //     const response = await fetch(`${configs.baseUrl}/events`);
    //     const { payLoad } = await response.json();
    //     console.log("data", payLoad);
    //     setUsers(payLoad); // Ensure the fetched data is set to the users state
    //     setIsLoading(false);
    //   } catch (error) {
    //     setError(error);
    //     setIsLoading(false);
    //   }
    // };

    // fetchUsers();
  }, []);
  // Ensure paginatedUsers is calculated only when users is an array


  const handleRowClick = (event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusColors = {
    'Scheduled': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Ongoing': 'bg-yellow-100 text-yellow-800',
    'Postponed': 'bg-red-100 text-red-800'
  };

  return (

    <Layout>
      <div className="container mx-auto p-4">
        {/* {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!isLoading && !error && ( */}
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map(event => (
                <tr key={event.no} onClick={() => handleRowClick(event)} className="hover:bg-gray-100 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">{`${event.no}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{`${event.name}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>


        </>

        {selectedEvent && (

          <Drawer open={isDrawerOpen} onClose={handleClose} position="right" >
            <Drawer.Header title={selectedEvent.name} />
            <Drawer.Items >
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                  <h6 className="text-md font-semibold text-blue-700">General Information</h6>
                  <p className="text-sm text-gray-600">Type: <span className="font-medium">{selectedEvent.type}</span></p>
                  <p className="text-sm text-gray-600">Start Time: <span className="font-medium">{selectedEvent.startTime}</span></p>
                  <p className="text-sm text-gray-600">End Time: <span className="font-medium">{selectedEvent.endTime}</span></p>
                  <p className="text-sm text-gray-600">Status: <span className={`font-medium ${statusColors[selectedEvent.status]}`}>{selectedEvent.status}</span></p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h6 className="text-md font-semibold text-blue-700 mb-2">Other Information</h6>
                  <p className="text-sm text-gray-600">Description: <span className="font-medium">{selectedEvent.description}</span></p>
                  <p className="text-sm text-gray-600">URL: <a href={selectedEvent.url} className="text-cyan-600 underline hover:no-underline" target="_blank" rel="noopener noreferrer">{selectedEvent.url}</a></p>
                </div>
              </div>
            </Drawer.Items>
          </Drawer>
        )}
      </div>
    </Layout>
  )
}

