import Layout from "../../layouts/layout"
import { Drawer } from "flowbite-react";
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { Modal } from "flowbite-react";
import ChapterForm from "./chapter-modal";

const chaptersData = [
  {
    chapterName: 'Abuja Chapter ',
    country: 'Nigeria',
    city: 'Fct',
    members: '150',
    positions: {
      President: 'Musa Isa',
      'Vice President': 'Ibrahim Abba',
      'Sec. General': 'Aisha Abdulrahim',
      'Ass. Sec. General': 'Mary John',
      'Financial Sec': 'Isabella Johnathan',
      'Treasurer': 'Sophia Harris',
      'Public Relation Officer': 'Benjamin isa',
      'Welfare Officer': 'Muazu Muhammad',
      Provost: 'Feyishola Oluguenbi',
      'Ex-Officio': 'Mason Lee',
    },
  },
  {
    chapterName: 'UK Chapter',
    country: 'United Kingdom',
    city: 'London',
    members: '200',
    positions: {
      President: 'John Isa',
      'Vice President': 'Ibrahim Abba',
      'Sec. General': 'Aisha Abdulrahim',
      'Ass. Sec. General': 'Mary John',
      'Financial Sec': 'Isabella Johnathan',
      'Treasurer': 'Sophia Harris',
      'Public Relation Officer': 'Benjamin isa',
      'Welfare Officer': 'Muazu Muhammad',
      Provost: 'Feyishola Oluguenbi',
      'Ex-Officio': 'Mason Lee',
    },
  },
  {
    chapterName: 'US/Canada Chapter ',
    country: 'USA',
    city: 'Washington',
    members: '120',
    positions: {
      President: 'Janet Moses',
      'Vice President': 'Ibrahim Abba',
      'Sec. General': 'Aisha Abdulrahim',
      'Ass. Sec. General': 'Mary John',
      'Financial Sec': 'Isabella Johnathan',
      'Treasurer': 'Sophia Harris',
      'Public Relation Officer': 'Benjamin isa',
      'Welfare Officer': 'Muazu Muhammad',
      Provost: 'Feyishola Oluguenbi',
      'Ex-Officio': 'Mason Lee',
    },
  },
  {
    chapterName: 'Niger Chapter ',
    country: 'Nigeria',
    city: 'Minna',
    members: '120',
    positions: {
      President: 'John Isa',
      'Vice President': 'Ibrahim Abba',
      'Sec. General': 'Aisha Abdulrahim',
      'Ass. Sec. General': 'Mary John',
      'Financial Sec': 'Isabella Johnathan',
      'Treasurer': 'Sophia Harris',
      'Public Relation Officer': 'Benjamin isa',
      'Welfare Officer': 'Muazu Muhammad',
      Provost: 'Feyishola Oluguenbi',
      'Ex-Officio': 'Mason Lee',
    },
  },
  {
    chapterName: 'Porthacourt Chapter ',
    country: 'Nigeria',
    city: 'Porthacourt',
    members: '120',
    positions: {
      President: 'John Isa',
      'Vice President': 'Ibrahim Abba',
      'Sec. General': 'Aisha Abdulrahim',
      'Ass. Sec. General': 'Mary John',
      'Financial Sec': 'Isabella Johnathan',
      'Treasurer': 'Sophia Harris',
      'Public Relation Officer': 'Benjamin isa',
      'Welfare Officer': 'Muazu Muhammad',
      Provost: 'Feyishola Oluguenbi',
      'Ex-Officio': 'Mason Lee',
    },
  },
  {
    chapterName: 'lagos Chapter ',
    country: 'Nigeria',
    city: 'Ikeja',
    members: '120',
    positions: {
      President: 'John Isa',
      'Vice President': 'Ibrahim Abba',
      'Sec. General': 'Aisha Abdulrahim',
      'Ass. Sec. General': 'Mary John',
      'Financial Sec': 'Isabella Johnathan',
      'Treasurer': 'Sophia Harris',
      'Public Relation Officer': 'Benjamin isa',
      'Welfare Officer': 'Muazu Muhammad',
      Provost: 'Feyishola Oluguenbi',
      'Ex-Officio': 'Mason Lee',
    },
  }
];

export default function Chapter() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState({})
  const [showModal, setShowModal] = useState(false);


  const handleClose = () => setIsDrawerOpen(false);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter)
    setIsDrawerOpen(true)
  }
  return (

    <Layout>
      <div className="bg-gray-100 p-6 min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {chaptersData.map((chapter, index) => (
              <div
                key={index}
                onClick={() => { handleChapterClick(chapter) }}
                className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              >
                <h5 className="mb-2 text-xl font-semibold text-gray-800">
                  Chapter Name: {chapter.chapterName}
                </h5>
                <p className="mb-1 text-gray-600">Country: {chapter.country}</p>
                <p className="mb-1 text-gray-600">City: {chapter.city}</p>
                <p className="text-gray-600">Number of Members: {chapter.members}</p>
              </div>
            ))}
          </div>
        </div>
        {isDrawerOpen && 
          <Drawer open={isDrawerOpen} onClose={handleClose} position="right">
            <Drawer.Header className=" text-white">
              <h5 className="text-lg font-semibold">{selectedChapter.chapterName}</h5>
            </Drawer.Header>
            <Drawer.Items>
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                  <h6 className="text-md font-semibold text-blue-700">General Information</h6>
                  <p className="text-sm text-gray-600">Country: <span className="font-medium">{selectedChapter.country}</span></p>
                  <p className="text-sm text-gray-600">City: <span className="font-medium">{selectedChapter.city}</span></p>
                  <p className="text-sm text-gray-600">Number of Members: <span className="font-medium">{selectedChapter.members}</span></p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h6 className="text-md font-semibold text-blue-700 mb-2">Chapter Positions:</h6>
                  <ul className="space-y-2">
                    {selectedChapter.positions &&
                      Object.entries(selectedChapter.positions).map(([position, name]) => (
                        <li key={position} className="flex justify-between bg-blue-100 rounded-lg p-2">
                          <span className="font-semibold text-blue-800">{position}:</span>
                          <span className="text-gray-700">{name}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Drawer.Items>
          </Drawer>}
        <button className="fixed bottom-12 right-12 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-transform duration-300"
          onClick={() => { setShowModal(true) }}>
          <IoMdAdd size={24} />
        </button>
        {showModal && <Modal
          show={showModal}
          size="md"
          popup={true}
          onClose={() => setShowModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">Register a Chapter</h2>
            </div>
            {/* Chapter Form */}
            <ChapterForm />
          </Modal.Body>

        </Modal>}
      </div>
    </Layout>
  )
}




