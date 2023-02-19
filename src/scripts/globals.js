const BASEAPIURL = "https://content.guardianapis.com/";
const API = "api-key=" + window.API;

function convertTimeString(timeString) {
  const date = new Date(timeString);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayName = days[date.getUTCDay()];
  const monthName = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const time = `${hours}:${minutes} UTC`;
  return `${dayName} ${day} ${monthName} ${year}, ${time}`;
}

export { BASEAPIURL, API, convertTimeString };
