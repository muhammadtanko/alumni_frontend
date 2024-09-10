import Layout from "../../layouts/layout"
import React, { useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal } from 'flowbite-react';
import { Button, TextInput, Label } from "flowbite-react";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";


let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Monthly meeting',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

function createEventId() {
  return String(eventGuid++)
}


export default function Home() {
  const [currentEvents, setCurrentEvents] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null);

  function handleDateSelect(selectInfo) {
    setSelectedDateInfo(selectInfo); // store selected date info
    setShowModal(true);
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }
  function handleEventSubmit(values) {
    console.log("vals>>", values);
    const { title, startTime, url, description } = values;
    const calendarApi = selectedDateInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: createEventId(),
      title,
      url,
      start: `${selectedDateInfo.startStr}T${startTime}`, // combining date with time
      end: selectedDateInfo.endStr,
      allDay: selectedDateInfo.allDay,
      description, // can be used later to display in event popover
    });
  }
  function handleEvents(events) {
    setCurrentEvents(events)
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    startTime: Yup.string()
      .required('Start time is required')
      .nullable(),
    url: Yup.string()
      .nullable(),
    description: Yup.string().required('Description is required')
      .max(500, 'Description cannot be longer than 100 characters')
  });
  return (
    <Layout>
      <div className='flex h-screen font-sans'>
        {showModal && (
          <Modal
            show={true}
            size="md"
            popup={true}
            onClose={() => setShowModal(false)}
          >
            <Modal.Header />
            <Modal.Body>
              <Formik
                initialValues={{
                  title: '',
                  startTime: null,
                  url: null,
                  description: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleEventSubmit}
              >
                {({ setFieldValue, isValid, dirty }) => (
                  <Form className="flex flex-col gap-4">
                    <div>
                      <Field
                        as={TextInput}
                        name="title"
                        className="focus:border-blue-500 w-full mt-4"
                        type="text"
                        placeholder="Title"
                        shadow
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime" value="Start Time" />
                      <Field name="startTime">
                        {({ field }) => (
                          <input
                            type="time"
                            id="startTime"
                            {...field}
                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                            onChange={(e) =>
                              setFieldValue('startTime', e.target.value)
                            }
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <Field
                        as={TextInput}
                        name="url"
                        className="focus:border-blue-500 w-full"
                        type="text"
                        placeholder="URL"
                        shadow
                      />
                      <ErrorMessage
                        name="url"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <Field
                        as={TextInput}
                        name="description"
                        className="focus:border-blue-500 w-full"
                        type="text"
                        placeholder="Description"
                        shadow
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="w-full flex justify-end mt-3">
                      <Button
                        disabled={!(isValid && dirty)}
                        className="  bg-bgDArk w-full md:w-1/3 flex"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        )}

        <Sidebar
          currentEvents={currentEvents}
        />
        <div className='flex-grow h-full p-12'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
            }}
            height="100%"

            initialView='listYear'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </div>
      </div>
    </Layout>

  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({ currentEvents }) {
  return (
    <div className='w-1/3 h-[95vh] leading-6 bg-[#eaf9ff] border-r border-r-[#d3e2e8]'>
      <div className='p-2'>
        <h2 className="text-center text-blue-700">Instructions</h2>
        <ul>
          <li>Select a date and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          {/* <li>Click an event to delete it</li> */}
        </ul>
      </div>
      <div className='p-2'>
        <h2 className="text-center  text-blue-700">All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric',hour:'2-digit' })}</b>
      <i>{event.title}</i>
    </li>
  )
}