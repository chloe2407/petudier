const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");
const score = document.getElementById("score");
const scoreButton = document.getElementById("scoreButton");

// default websites 

// const blocked = ["youtube.com", "facebook.com", "instagram.com", "reddit.com"]
// chrome.storage.local.set({ blocked });

// saving score
scoreButton.addEventListener("click", () => {
  const scores = score.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ scores });
});
 
// saving blocked websites
save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  // displaying blocked websites
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled} = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });

  // displaying scores
  chrome.storage.local.get(["scores"], function (local) {
    const { scores } = local;
    if (Array.isArray(scores)) {
      score.value = scores.join("\n");
    }
  });
});
