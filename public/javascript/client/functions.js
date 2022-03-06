let text = {};

text.ellipsize = (text) => {
    // console.log(`ellipsize(${text})`);
    let result = ``;
    let limit = 150;

    if (text.length > limit) {
        result = text.slice(0, limit) + `...`;
    } else {
        result = text;
    }

    // console.log(`result = ${result}`);
    return result;
};