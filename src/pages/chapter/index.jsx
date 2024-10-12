import Layout from "../../layouts/layout";
import { Drawer } from "flowbite-react";
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";
import { Modal } from "flowbite-react";
import ChapterForm from "./chapter-modal";
import { configs } from "../../config";
const Chapter = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [chapters, setChapters] = useState([]); // State for storing chapters data
  const [loading, setLoading] = useState(false); // State for handling loading state

  // Fetch chapters data from the API
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${configs.baseUrl}/chapter`);
        const res = await response.json();
        setChapters(res.data); // assuming response.data contains an array of chapters
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setLoading(false);
      }
    };

    fetchChapters();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleClose = () => setIsDrawerOpen(false);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="bg-gray-100 p-6 min-h-screen">
          <p>Loading chapters...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 p-6 min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-6">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => handleChapterClick(chapter)}
                className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              >
                <h5 className="mb-2 text-2xl font-semibold text-gray-800 uppercase">
                  Chapter Name: {chapter.name}
                </h5>
                <p className="mb-1 text-gray-600 text-lg capitalize">Country: {chapter.country}</p>
                <p className="mb-1 text-gray-600 text-lg capitalize">City: {chapter.city}</p>
                <p className="text-gray-600 text-lg capitalize">Number of Members: {}</p>
              </div>
            ))}
          </div>
        </div>
        {isDrawerOpen && (
          <Drawer open={isDrawerOpen} onClose={handleClose} position="right">
            <Drawer.Header className="text-white">
              <h5 className="text-lg font-semibold">{selectedChapter.name}</h5>
            </Drawer.Header>
            <Drawer.Items>
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                  <h6 className="text-md font-semibold text-blue-700">General Information</h6>
                  <p className="text-lg text-black font-semibold capitalize">Country: <span className="font-medium ">{selectedChapter.country}</span></p>
                  <p className="text-lg text-black font-semibold capitalize">City: <span className="font-medium">{selectedChapter.city}</span></p>
                  <p className="text-lg text-black font-semibold capitalize">Number of Members: <span className="font-medium">{selectedChapter.members}</span></p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h6 className="text-md font-semibold text-blue-700 mb-2">Chapter Positions:</h6>
                  <ul className="space-y-2">
                    {selectedChapter.positions &&
                      Object.entries(selectedChapter.positions).map(([position, name]) => (
                        <li key={position} className="flex justify-between bg-blue-100 rounded-lg p-2">
                          <span className="font-semibold text- text-blue-800">{position}:</span>
                          <span className="text-gray-700 f">{name}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Drawer.Items>
          </Drawer>
        )}
        {/* <button
          className="fixed bottom-12 right-12 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-transform duration-300"
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd size={24} />
        </button> */}
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
                <h2 className="text-xl font-semibold">Register a Chapter</h2>
              </div>
              {/* Chapter Form */}
              <ChapterForm />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default Chapter;
