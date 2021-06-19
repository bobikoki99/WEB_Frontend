export const createDiv = (id, xmlString) => {
    let d = document.createElement('div');
    d.id = id;
    d.innerHTML = xmlString;
    return d.firstChild;
};

export const createLink = (title, text, href) => {
    let a = document.createElement('a');
    let linkText = document.createTextNode(text);
    a.appendChild(linkText);
    a.title = title;
    a.href = href;
    return a;
};

export const parseTextToHtml = (text) => {
    const textArray = text.split(/[\.\!\?]/);
    textArray.pop();

    let hellper = '';

    const parseText = textArray.reduce((acc, sentence, index) => {
        if(index % 3 === 2) {
            acc = acc.concat(`<p>${hellper}</p>`);
            hellper = `${sentence}.`;
        } else {
            hellper = hellper.concat(`${sentence}.`);
        }

        if(index === textArray.length - 1 && hellper !== '') {
            acc = acc.concat(`<p>${hellper}</p>`);
            hellper = '';
        }

        return acc;
    }, '')

    return parseText;
};

export const parseYoutubeUrl = (youtubeUrl) => {
    return youtubeUrl.split('?v=')[1];
} 
