import options from '../options.json';

const defaultOptions = Object.keys(options).reduce((agg, key) => {
    agg[key] = options[key].defaultVal;
    return agg;
}, {});

export default defaultOptions;
