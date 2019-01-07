export const endPoints = {
    blindCreds: 'api/socket/credentials',
    socket: 'api/socket/get',
}

export function parameters() {
    var res = [];
    for (var i = 0; i < arguments.length; i++) {
        res.push(arguments[i]);
    }
    return res.length ? '/' + res.join('/') : '';
}