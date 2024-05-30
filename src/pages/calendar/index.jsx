import Layout from "../../layouts/layout"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
    const events = [
        { title: 'Meeting', start: new Date() }
      ]
    return (
        
        <Layout>
            <div className="bg-bgDArk flex justify-between ">
                <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={events}
                eventContent={renderEventContent}
                />
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