//https://www.google.com/search?client=opera&q=hello&sourceid=opera&ie=UTF-8&oe=UTF-8
//https://www.yandex.ru/search/?text=hello&lr=10741&redircnt=1675711300.1

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        const newUrl = modifyUrl(tab[0].url, request.msg);
        if (newUrl) {
            chrome.tabs.update(tab[0].id, { url: newUrl });
            sendResponse(true);
        } else sendResponse(false);
    });
});

function getSearchEngine(url) {
    if (
        url.includes("google.com/search") || 
        url.includes("google.ru/search")
    ) {
        return "google";
    } else if (
        url.includes("yandex.ru/search") ||
        url.includes("yandex.ru/images/search")
    ) {
        return "yandex";
    }
}

function modifyUrl(url, targetEngine) {
    const currEngine = getSearchEngine(url);

    if (!currEngine) return undefined;

    let start;
    if (currEngine == "yandex") start = url.indexOf("text=") + 5;
    else start = url.indexOf("q=") + 2;

    let end = url.slice(start).search("&");
    if (end != -1) url = url.slice(start, start + end);
    else url = url.slice(start);

    console.log("Search was:", url);
    console.log("Swap from", currEngine, "to", targetEngine);

    if (targetEngine == "google") {
        url = "https://www.google.com/search?q=" + url;
    } else if (targetEngine == "yandex") {
        url = "https://www.yandex.ru/search?text=" + url;
    } else {
        url = undefined;
    }

    return url;
}
