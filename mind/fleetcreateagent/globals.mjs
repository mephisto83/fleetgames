let defaultUrl = '';
export const getDefaultURL = () => {
    return Promise.resolve().then(e => defaultUrl);
}

export const setDefaultUrl = (val) => {
    defaultUrl = val;
    return Promise.resolve();
}