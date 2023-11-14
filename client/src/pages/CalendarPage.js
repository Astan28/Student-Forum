import "./CalendarPage.scss";
import Header from "../layout/Header";
import NavBar from "../layout/NavBar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import PropTypes from "prop-types";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment, { now } from "moment";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { eventUrl } from "../config/config";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const DnDCalendar = withDragAndDrop(Calendar);

const localizer = momentLocalizer(moment);


function CalendarPage() {
  const [events, setEvents] = useState([]);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      const newEvent = {
        startDate: start.toISOString(),
        finishDate: end.toISOString(),
      };
      const res = axios.put(`${eventUrl}/events/${event._id}`, newEvent);
      console.log(event);
      setEvents((prev) => {
        const existing = prev.find((ev) => ev._id === event._id) ?? {};
        const filtered = prev.filter((ev) => ev._id !== event._id);
        return [
          ...filtered,
          { ...existing, startDate: start, finishDate: end, allDay },
        ];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      console.log(event);
      const newEvent = {
        startDate: start.toISOString(),
        finishDate: end.toISOString(),
      };
      const res = axios.put(`${eventUrl}/events/${event._id}`, newEvent);
      setEvents((prev) => {
        const existing = prev.find((ev) => ev._id === event._id) ?? {};
        const filtered = prev.filter((ev) => ev._id !== event._id);
        return [
          ...filtered,
          { ...existing, startDate: start, finishDate: end },
        ];
      });
    },
    [setEvents]
  );

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      console.log(start.toISOString());
      console.log(end);

      if (title) {
        const event = {
          name: title,
          description: "google.com",
          startDate: start.toISOString(),
          finishDate: end.toISOString(),
        };
        console.log(event);

        const res = axios.post(`${eventUrl}/events`, event);
        setEvents((prev) => [
          ...prev,
          { startdate: start, finishDate: end, name: title },
        ]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.name),
    []
  );

  const handleDoubleClickEvent = useCallback((event) => {
    axios.delete(`${eventUrl}/events/${event._id}`);
    window.alert("Wydarzenie usunięte");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${eventUrl}/events`);
      res.data.forEach((element) => {
        element.startDate = moment(element.startDate).toDate();
        element.finishDate = moment(element.finishDate).toDate();
      });

      setEvents(res.data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="CalendarPage">
      <NavBar />
      <Header />
      <div className="content">
        <div className="main">
          <DnDCalendar
            localizer={localizer}
            events={events}
            defaultView={Views.WEEK}
            startAccessor="startDate"
            endAccessor="finishDate"
            titleAccessor="name"
            // onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            onDoubleClickEvent={handleDoubleClickEvent}
            selectable
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            style={{ height: 700 }}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
