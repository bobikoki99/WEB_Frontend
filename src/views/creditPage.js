import { createDiv } from "../utils/helper.js";
import { originDivId } from '../constants/routerConstants.js';

const parseText = (text) => {
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

const transformRotation = (rotationDegree) => {
    const textElement = document.getElementById('titles');

    textElement.style.webkittransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.moztransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.mstransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.otransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.transform = `perspective(300px) rotateX(${rotationDegree}deg)`;
}

export const creditPage = (context) => {
    const data = JSON.parse(localStorage.getItem("creditsData"));
    console.log('data', data)

    const displayString = parseText(data.creditsText);
    const config = data.config;

    let originDiv = document.getElementById(originDivId);
    originDiv.innerHTML = "";
    const credits = createDiv('credits', `<div id="titles"> <section id="titlecontent"> <p class="center">EPISODE IV A NEW HOPE FOR CSS3</p> ${displayString} </section></div>`);
    originDiv.appendChild(credits);

    const rotationDegree = Number(config.rotationDeg || '25');

    console.log(rotationDegree);

    transformRotation(rotationDegree);

    //localStorage.clear();

    return true;
};
