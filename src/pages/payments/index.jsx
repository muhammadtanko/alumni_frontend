import Layout from "../../layouts/layout"
import React, { useState } from 'react';
import { Drawer } from "flowbite-react";

export default function Payment() {
  const [selectedPayment, setSelectedPaymant] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Updated data for the new table structure
  const data = [
    {
      no: 1, name: "Donation Campaign", amount: "10000", type: "Spontaneous", frequency: "Monthly", description: "A monthly donation campaign for underprivileged students."
    },
    {
      no: 2, name: "Anual Fee", amount: "20000", type: "Recurrent", frequency: "Annual", description: "Annual subscription fee for Alumni membership program."
    },
    {
      no: 3, name: "Fundraising Event", amount: "5000", type: "Recurrent", frequency: "Quarterly", description: "Quarterly fundraising event for alumni organization."
    },
    {
      no: 4, name: "Donation", amount: "3500", type: "Recurrent", frequency: "Quarterly", description: "Quarterly recurring gift to support School."
    },
    {
      no: 5, name: "Sponsorship Payment", amount: "7500", type: "Recurrent", frequency: "Bi-Annual", description: "Bi-annual sponsorship payment for  underprivileged students."
    },
  ];

  const handleClose = () => setIsDrawerOpen(false);

  const handleRowClick = (event) => {
    setSelectedPaymant(event);
    setIsDrawerOpen(true);
  };
  const handleMakePayment = (event) => {
    console.log("Making payment for:", event);
    // Add payment logic here
  };
  return (

    <Layout>
      <div className="container mx-auto p-4">
        {/* Table with new headers */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Action </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(event => (
              <tr key={event.no} onClick={() => handleRowClick(event)} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{event.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.frequency}</td>
                <td className="px-6 py-4 whitespace-nowrap">{event.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleMakePayment(event)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Pay Again
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPayment && (
          <Drawer open={isDrawerOpen} onClose={handleClose} position="right">
            <Drawer.Header title={selectedPayment.name} />
            <Drawer.Items>
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                  <h6 className="text-md font-semibold text-blue-700">General Information</h6>
                  <p className="text-sm text-gray-600">Amount Type: <span className="font-medium">{selectedPayment.amountType}</span></p>
                  <p className="text-sm text-gray-600">Frequency: <span className="font-medium">{selectedPayment.frequency}</span></p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h6 className="text-md font-semibold text-blue-700 mb-2">Other Information</h6>
                  <p className="text-sm text-gray-600">Description: <span className="font-medium">{selectedPayment.description}</span></p>
                </div>
              </div>
            </Drawer.Items>
          </Drawer>
        )}
      </div>
    </Layout>
  )
}


