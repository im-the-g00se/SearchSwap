function load() {
    document
        .getElementById("google")
        .addEventListener("click", () => sendMessage("google"));
    document
        .getElementById("yandex")
        .addEventListener("click", () => sendMessage("yandex"));
}

function sendMessage(targetEngine) {
    chrome.runtime.sendMessage({ msg: targetEngine }, function (response) {
    });
}

setTimeout(load, 500);
