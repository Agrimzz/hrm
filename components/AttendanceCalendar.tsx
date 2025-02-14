"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

import moment from "moment"

const localizer = momentLocalizer(moment)

interface AttendanceEvent {
  id: string
  checkIn: string
  checkOut: string
}

interface AttendanceCalendarProps {
  userId: string
}

const AttendanceCalendar = ({ userId }: AttendanceCalendarProps) => {
  const [events, setEvents] = useState<AttendanceEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`/api/attendance?userId=${userId}`)
        setEvents(response.data)
      } catch (error) {
        console.error("Error fetching attendance events", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchAttendance()
    }
  }, [userId])

  const calendarEvents = events.map((event) => ({
    title: `${new Date(event.checkIn).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${new Date(event.checkOut).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    start: new Date(event.checkIn),
    end: new Date(event.checkOut),
  }))

  if (loading) {
    return (
      <div className="text-center max-w-5xl mx-auto mt-8 font-bold">
        Loading calendar...
      </div>
    )
  }

  return (
    <div style={{ height: 500 }} className="mt-8 max-w-5xl mx-auto py-4">
      <p className="text-lg font-bold mb-2">Attendance</p>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH]}
        defaultView={Views.MONTH}
        date={date}
        onNavigate={(date) => {
          setDate(new Date(date))
        }}
        style={{ height: "100%" }}
      />
    </div>
  )
}

export default AttendanceCalendar
