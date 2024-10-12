import Layout from "../../layouts/layout"
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal } from 'flowbite-react';
import { configs } from '../../config';

export default function Home() {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch events from the server
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${configs.baseUrl}/event`);
        const data = await response.json();
        console.log("data", data);
        if (data.ok) {
          const formattedEvents = data.payLoad.map(event => ({
            id: event._id,
            title: event.title,
            start: event.startTime,
            end: event.endTime,
            url: event.url,
            description: event.description,
          }));
          setCurrentEvents(formattedEvents);
        }
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle event click to show the modal with event details
  function handleEventClick(clickInfo) {
    clickInfo.jsEvent.preventDefault();
    setSelectedEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      url: clickInfo.event.url,
      description: clickInfo.event.extendedProps.description,
    });
    setShowModal(true);
  }

  return (
    <Layout>
      <div className="flex h-screen font-sans">
        {selectedEvent && (
          <Modal
            show={showModal}
            size="md"
            popup={true}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">{selectedEvent.title}</h2>
                <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                <p><strong>Description:</strong> {selectedEvent.description}</p>
                {selectedEvent.url && (
                  <p>
                    <strong>More Info:</strong>{' '}
                    <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:no-underline">
                      {selectedEvent.url}
                    </a>
                  </p>
                )}
              </div>
            </Modal.Body>
          </Modal>
        )}

        <div className="flex-grow h-full p-12">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear',
            }}
            height="100%"
            initialView="listYear"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={currentEvents}
            eventClick={handleEventClick}
          />
        </div>
      </div>
    </Layout>
  );
}
