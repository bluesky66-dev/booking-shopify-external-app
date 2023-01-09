import { CalendarOptions } from "@fullcalendar/core";
import da from "@fullcalendar/core/locales/da";
import en from "@fullcalendar/core/locales/en-gb";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useUserSetting } from "@services/user";

export default (props: CalendarOptions) => {
  const { data } = useUserSetting();

  return (
    <FullCalendar
      height="auto"
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "today prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      firstDay={1}
      dayMaxEvents={true}
      slotDuration="00:15:00"
      slotLabelFormat={[
        {
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        },
      ]}
      eventDisplay="block"
      slotMinTime="07:00"
      slotMaxTime="20:00"
      locales={[da, en]}
      locale={data?.language}
      buttonText={{
        prev: "<<",
        next: ">>",
      }}
      {...props}
    />
  );
};
