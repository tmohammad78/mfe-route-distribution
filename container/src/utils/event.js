export function sendMessage (data, iframe) {
    iframe.contentWindow.postMessage(data, "*");
}