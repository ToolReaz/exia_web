import $ from 'jquery';

export function getApi(path) {
    return new Promise((resolve, reject) => {
        try {
            $.get(path, response => {
                if (response.error == null) {
                    resolve(response.content);
                } else {
                    reject(response.error);
                }
            }, "json");
        } catch (e) {
            reject({'error': e.toString()});
        }
    });
}

export function postApi(path, values) {
    return new Promise((resolve, reject) => {
        try {
            $.post(path, values, response => {
                console.log(response);
                if (response.error == null) {
                    resolve(response.content);
                } else {
                    reject(response.error);
                }
            }, "json");
        } catch (e) {
            reject({'error': e.toString()});
        }
    });
}