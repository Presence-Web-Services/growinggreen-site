let currDate = new Date();
let day = currDate.getDay();
let hour = currDate.getHours();
let openTimeSpan = document.querySelector('#open_time');
let timeText = '';
const de = {//day enum
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
const he = {//hour enum
  _7am: 7,
  _7pm: 19,
  _8am: 8,
  _1pm: 13,
};

switch (day) {
  case de.monday:
  case de.tuesday:
  case de.wednesday:
  case de.thursday:
  case de.friday:
    if (hour < he._7am) {
      timeText = 'Open today at 7am';
    } else if (hour < he._7pm) {
      timeText = 'Open today until 7pm';
    } else if (hour >= he._7pm && day != de.friday) {
      timeText = 'Opening at 7am tomorrow';
    } else if (day == de.friday) {
      timeText = 'Opening at 8am tomorrow';
    }
    break;
  case de.saturday:
    if (hour < he._8am) {
      timeText = 'Open today at 8am';
    } else if (hour < he._1pm) {
      timeText = 'Open today until 1pm';
    } else {
      timeText = 'Opening at 7am Monday';
    }
    break;
  case de.sunday:
    timeText = 'Opening at 7am tomorrow';
    break;
}

if (openTimeSpan) {
  openTimeSpan.innerText = timeText;
}
