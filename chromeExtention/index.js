let myLeads = [];
const input = document.getElementById("input-el");
const button = document.getElementById("input-btn");
const ulEl = document.getElementById("list");
const deletebtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("savetab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

saveTabBtn.addEventListener("click", () => {
    chrome.tabs.query({active:true, currentwindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads();
    })
})

button.addEventListener("click", () =>{
    let site = input.value;
    myLeads.push(site);
    input.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
})

function renderLeads(){
let listitems = "";
for (let i = 0; i < myLeads.length; i++){
    listitems += `
    <li><a target = '_blank' href='${myLeads[i]}'> ${myLeads[i]}</a>
    </li>
    `
}
ulEl.innerHTML = listitems;
}

deletebtn.addEventListener("dblclick",() =>{
    localStorage.clear();
    myLeads = [];
    renderLeads();
})