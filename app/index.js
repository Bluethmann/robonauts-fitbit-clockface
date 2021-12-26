import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { today } from "user-activity";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const steps = document.getElementById("steps");
const dayofweek = document.getElementById("dayofweek");
const dayofmonth = document.getElementById("dayofmonth");

const lastMin = 0;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  
  let today_time_date = evt.date;
  let minutes = today_time_date.getMinutes();
  if(minutes != lastMin)
  {
    let hours = today_time_date.getHours();
    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;
    } else {
    // 24h format
    hours = util.zeroPad(hours);
    }
    let dayofweek_num = today_time_date.getDay();
    let dayofmonth_num = today_time_date.getDate();
    dayofmonth.text = dayofmonth_num;
    switch(dayofweek_num)
    {
      case 0:
        dayofweek.text = "SUN";
        break;
      case 1:
        dayofweek.text = "MON";
        break;
      case 2:
        dayofweek.text = "TUE";
        break;
      case 3:
        dayofweek.text = "WED";
        break;
      case 4:
        dayofweek.text = "THU";
        break;
      case 5:
        dayofweek.text = "FRI";
        break;
      case 6:
        dayofweek.text = "SAT";
        break;
      default:
        break;
    }
    let mins = util.zeroPad(today_time_date.getMinutes());
    myLabel.text = `${hours}:${mins}`;
  }
  lastMin = minutes;
  console.log(`${today.adjusted.steps} Steps`);
  steps.text = today.adjusted.steps;
}

