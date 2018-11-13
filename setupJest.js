global.fetch = require('jest-fetch-mock');
window.confirm = (Message) => { return true };
let DOMContentLoaded_event = document.createEvent("Event");
DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
window.document.dispatchEvent(DOMContentLoaded_event);