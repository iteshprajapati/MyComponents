import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './EventCalendar.scss';

export const EventCalendar = ({
  events = [], // [{ id, date: 'YYYY-MM-DD', title, type: 'primary'|'success'|'warning'|'danger' }]
  onDateClick,
  className = '',
  ...props
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper arrays for calendar generation
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Generate date entries
  const daysArray = [];
  // Empty blocks for padding before first day
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(new Date(year, month, d));
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const formatDateString = (dateObj) => {
    if (!dateObj) return '';
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getDayEvents = (dateObj) => {
    if (!dateObj) return [];
    const dateStr = formatDateString(dateObj);
    return events.filter(e => e.date === dateStr);
  };

  const handleDaySelect = (dayObj) => {
    if (!dayObj) return;
    setSelectedDate(dayObj);
    if (onDateClick) onDateClick(dayObj, getDayEvents(dayObj));
  };

  const isToday = (dayObj) => {
    if (!dayObj) return false;
    const today = new Date();
    return dayObj.getDate() === today.getDate() &&
      dayObj.getMonth() === today.getMonth() &&
      dayObj.getFullYear() === today.getFullYear();
  };

  const isSelected = (dayObj) => {
    if (!dayObj) return false;
    return dayObj.getDate() === selectedDate.getDate() &&
      dayObj.getMonth() === selectedDate.getMonth() &&
      dayObj.getFullYear() === selectedDate.getFullYear();
  };

  const selectedDayEvents = getDayEvents(selectedDate);

  return (
    <div className={`event-calendar-container ${className}`} {...props}>
      <div className="calendar-header">
        <h4 className="calendar-current-month">
          {monthNames[month]} {year}
        </h4>
        <div className="calendar-nav-buttons">
          <button type="button" className="calendar-nav-btn" onClick={handlePrevMonth}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="calendar-nav-btn" onClick={handleNextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-week-days">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="week-day-header">{d}</div>
          ))}
        </div>

        <div className="calendar-days-cells">
          {daysArray.map((day, idx) => {
            const dayEvents = getDayEvents(day);
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={idx}
                onClick={() => handleDaySelect(day)}
                className={`calendar-cell ${!day ? 'cell-empty' : ''} ${
                  day && isToday(day) ? 'cell-today' : ''
                } ${day && isSelected(day) ? 'cell-selected' : ''} ${
                  hasEvents ? 'cell-has-events' : ''
                }`}
              >
                {day && (
                  <>
                    <span className="cell-day-num">{day.getDate()}</span>
                    {hasEvents && (
                      <div className="cell-event-indicator-dots">
                        {dayEvents.slice(0, 3).map((e, eIdx) => (
                          <div key={eIdx} className={`indicator-dot dot-${e.type || 'primary'}`} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendar-selected-details">
        <div className="details-header">
          <CalendarIcon size={16} />
          <span>
            Events for {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
          </span>
        </div>
        <div className="details-list">
          {selectedDayEvents.length > 0 ? (
            selectedDayEvents.map((e) => (
              <div key={e.id} className="calendar-event-item">
                <div className={`event-marker marker-${e.type || 'primary'}`} />
                <span className="event-item-title">{e.title}</span>
              </div>
            ))
          ) : (
            <div className="empty-events-msg">No scheduled events for this day.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventCalendar;
