// set of variables declared
var today = moment().format("LLLL");
var now = moment().format("H A");

// this just uses the moment and the variable to show the current day/time
$("#currentDay").text(today);

//Hour entries for the planner
var workDay = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
  { time: "6 PM", event: "" },
  { time: "7 PM", event: "" },
  { time: "8 PM", event: "" },
  { time: "9 PM", event: "" },
  { time: "10 PM", event: "" },
  { time: "11 PM", event: "" },
];

//save to the local storage
var eventEl = JSON.parse(localStorage.getItem("workDay"));
if (eventEl) {
  workDay = eventEl;
}

//This creates the rows for the time and texts
workDay.forEach(function (timeBlock, index) {
  var timeLabel = timeBlock.time;
  var blockColor = colorRow(timeLabel);
  var row =
    `<div class="time-block" id="${index}">
        <div class="row no-gutters input-group">
            <div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">${timeLabel}
            </div>
            <textarea class="form-control ${blockColor}">${timeBlock.event}</textarea>
                <div class="col-sm col-lg-1 input-group-append">
                <button class="saveBtn btn-block" type="submit">
                <i class="fas fa-save"></i>
                 </button>
             </div>
         </div>
    </div>`;

  // appending the rows to the div container
  $(".container").append(row);
});
// This will add color based on the time (grey,red,green)
function colorRow(time) {
  var nowText = moment(now, "H A");
  var entryEl = moment(time, "H A");
  var nowText = moment(now, "H A");
  var entryEl = moment(time, "H A");
  if (nowText.isBefore(entryEl) === true) {
    return "future";
  } else if (nowText.isAfter(entryEl) === true) {
    return "past";
  } else {
    return "present";
  }
};
// This enable the save botton to actually save
$(".saveBtn").on("click", function () {
  var blockEl = parseInt($(this).closest(".time-block").attr("id"));
  var userEntry = $.trim($(this).parent().siblings("textarea").val());
  workDay[blockEl].event = userEntry;
  // This stores the save in local storage
  localStorage.setItem("workDay", JSON.stringify(workDay));
});