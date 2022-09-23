/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;

    let url = options.url;
    const formData = new FormData();

    xhr.responseType = 'json';

    if (options.data) {
        if (options.method === 'GET') {
            url += '?' + Object.entries(options.data)
            .map( ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
        } else {
            Object.entries(options.data).forEach(v => formData.append(...v));
        }
    }

    xhr.onload = () => { 
        let err = null;
        let resp = null; 

        if (xhr.status === 200) {
            const r = xhr.response;
            if (r?.success) {
                resp = r;
            } else {
                err = r;
            }
        } else {
            err = new Error('...');
        } 
        options.callback(err, resp); 
    };

    try {
        xhr.open( options.method, url );
        xhr.send(formData);
    } catch (e) {
        console.err(e);
    }
    
};

