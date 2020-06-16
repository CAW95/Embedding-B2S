console.log("Hello DS🐱‍👤");
let viz;

// Create a variable to store the URL
const url =
  "https://public.tableau.com/views/ClaphamWOWLeaderboard/OverallLeaderboard";

// Create a variable to store the dashboard options
const options = {
  device: "desktop",
};
// Create a variable to store the viz container
const vizContainer = document.getElementById("vizContainer");

// Create a varibale to store the showViz button
const showVizButton = document.getElementById("showViz");

// Create a varibale to store the hideViz button
const hideVizButton = document.getElementById("hideViz");

// Create a function that shows the dashboard

function initViz() {
  console.log("Hello!");
  // no const with viz as it has been assigned by let at the top
  viz = new tableau.Viz(vizContainer, url, options);
}

function showViz() {
  viz.show();
}
function hideViz() {
  viz.hide();
}

//Create event listener for show/hide
showVizButton.addEventListener("click", showViz);
hideVizButton.addEventListener("click", hideViz);
// Create variables for PDF and PPT buttons
const ExportPDFbutton = document.getElementById("exportPDF");
const ExportPPTbutton = document.getElementById("exportPPT");

// create functions for PDF and PPT documents
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
  console.log("PPT Download");
}

// create event listener for the buttons PDF and PPT
ExportPDFbutton.addEventListener("click", exportPDFfunction);
ExportPPTbutton.addEventListener("click", exportPPTfunction);
//should be the last element
document.addEventListener("DOMContentLoaded", initViz);

// function on getting the range values and applying them

function getRangeValues() {
  // get values from the input
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  //get the workbook option
  const workbook = viz.getWorkbook();
  const activesheet = workbook.getActiveSheet();
  const sheets = activesheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[0];
  sheetToFilter.applyRangeFilterAsync("AGG(Points )", {
    min: minValue,
    max: maxValue,
  });
  const sheetToFilter2 = sheets[1];
  sheetToFilter2.applyRangeFilterAsync("SUM(Total Points)", {
    min: minValue,
    max: maxValue,
  });
  console.log("Running RangeFilter");
}

const ApplyFilters = document.getElementById("ApplyButton");

ApplyFilters.addEventListener("click", getRangeValues);
// test
