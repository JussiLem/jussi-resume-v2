/***
 * Append index.html or .html to the request path so that it matches the object inside S3
 * @param event
 */
function handler(event) {
    var {request} = event;
    var {uri} = request;
    if (uri === '/') {
        // turns "/" to "/index.html"
        request.uri += 'index.html';
    } else if (uri.endsWith('/')) {
        // turns "/foo/" to "/foo.html"
        request.uri = uri.slice(0, -1) + '.html';
    } else if (!uri.includes('.')) {
        // turns "/foo" to "/foo.html"
        request.uri += '.html';
    }
    return request;
}
