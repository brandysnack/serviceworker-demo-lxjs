function get(url, opts) {
    opts = opts || {};
    opts.headers = opts.headers || {};
    return new Promise(function (fulfill, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        Object.keys(opts.headers).forEach(function (name) {
            xhr.setRequestHeader(name, opts.headers[name]);
        });
        xhr.onload = function () {
            return fulfill(JSON.parse(xhr.responseText));
        };
        xhr.onerror = reject;
        xhr.send()
    });
}
