import { createDiv } from "../utils/helper.js";
import { originDivId } from '../constants/routerConstants.js';

const handlePlayClick = () => {
    const creditsText = document.getElementById('credits-input-text-area').value.trim();
    const rotationDeg = document.getElementsByClassName('credits-rotation-input')[0].value.trim();
    console.log('rotationDeg', rotationDeg);

    localStorage.clear();
    const config = { rotationDeg };
    const dataTransfer = { creditsText, config };
    localStorage.setItem('creditsData', JSON.stringify(dataTransfer));

    window.location.href = 'http://127.0.0.1:5500/#/credit'
};

export const frontPage = (context) => {
    let originDiv = document.getElementById(originDivId);
    originDiv.innerHTML = "";
    const frontPage = createDiv('view1', `<section class="start"> <div id="config"><div id="form-credits-intro-creator">            <div class="title-wrapper"><h2 id="page-title">Ultimate Roll</h2><h2 id="page-title">Credits Intro Creator</h2></div><textarea id="credits-input-text-area" rows="4" spellcheck="false" maxlength="3000"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et, dolore soluta impedit eos iure delectus vero iste asperiores distinctio, nesciunt odio provident, officiis illum sequi alias incidunt nisi tempore.</textarea><div class="credits-rotation-wrapper"><div class="settings-text"> Credits rotation</div><input class="credits-rotation-input" type="number"></input></div><button id="play" class="play-button" >Play</button></div></div></section>`);
    console.log(frontPage);
    originDiv.appendChild(frontPage);

    const button = document.getElementById('play');

    button.addEventListener('click', handlePlayClick);

    return true;
};
