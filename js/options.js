const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");
const scoretext = document.getElementById("scoretext");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {   
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });
});

function updateScore () {
  score += 30;
  scoretext.setText('score: '+ score);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
      console.log("received");
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "hide");  
      });
});