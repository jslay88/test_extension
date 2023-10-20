const inputURL = document.getElementById("url")
const btnSave = document.getElementById("btnSave")
const btnTestRequest = document.getElementById("btnTestRequest")


function saveURL() {
    chrome.runtime.sendMessage({action: "updateRules", url: inputURL.value}).catch((e) => {
        console.warn("Failed to send message to service worker!", e)
    })
}

function testRequest() {
    chrome.runtime.sendMessage({action: "testRequest", url: inputURL.value}).catch((e) => {
        console.warn("Failed to send message to service worker!", e)
    })
}

btnSave.addEventListener("click", saveURL)
btnTestRequest.addEventListener("click", testRequest)
