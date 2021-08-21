const NewDeathsField = document.getElementById("death-count");
const newCasesField = document.getElementById("new-cases");
const ActiveCaseField = document.getElementById("active-cases");
const LastPCRCountField = document.getElementById("last-pcr");
const LastUpdate = document.getElementById("last-update");
//updated Data

UpdateData();

async function UpdateData() {
  result = await fetchdata();

  //data update date
  LastUpdate.innerText = result.data.update_date_time;
  //New Deaths
  animateValue(NewDeathsField,0,result.data.local_new_deaths,1000);
  //New Cases
  animateValue(newCasesField,0,result.data.local_new_cases,1000);
  //Active Cases
  animateValue(ActiveCaseField,0,result.data.local_active_cases,1000);
  //Last PCR
  animateValue(LastPCRCountField,0,result.data.daily_pcr_testing_data[0].pcr_count,1000);
}

async function fetchdata() {
  const url = "https://www.hpb.health.gov.lk/api/get-current-statistical";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (e) {
    console.log("error");
  }
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}