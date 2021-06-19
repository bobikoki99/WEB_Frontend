import { createDiv, parseTextToHtml } from "../utils/helpers.js";
import { originDivId } from '../constants/routerConstants.js';
import { parseYoutubeUrl } from '../utils/helpers.js';
import { transformRotation, transformScreenTime, transformFont } from '../utils/styleHelpers.js';
import { validateRotation, validateScreenTime, validateYoutubeUrl } from '../utils/validations.js';


const handlePauseClick = () => {
    const plane = document.getElementById('titlecontent');
    const iframe = document.querySelector('iframe');
    const pauseButton = document.getElementsByClassName('pause-image')[0];

    if (plane.style.animationPlayState === 'running') {
        plane.style.animationPlayState = 'paused';
        plane.lastElementChild.anim
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        pauseButton.src = './src/assets/play.svg'
    } else {
        plane.style.animationPlayState = 'running';
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        pauseButton.src = './src/assets/pause.svg'
    }
};

const handleForwardClick = () => {
    const textElement = document.getElementById('titlecontent');
    const iframe = document.querySelector('iframe');
    const pauseButton = document.getElementsByClassName('pause-image')[0];

    let screenTime = Number(textElement.style.animation.split('s')[0]);

    if (screenTime > 14) {
        screenTime = screenTime - 10;
    }

    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    pauseButton.src = './src/assets/pause.svg'

    transformScreenTime(screenTime);
};

const handleBackwardClick = () => {

    const textElement = document.getElementById('titlecontent');
    const iframe = document.querySelector('iframe');
    const pauseButton = document.getElementsByClassName('pause-image')[0];

    let screenTime = Number(textElement.style.animation.split('s')[0]);

    if (screenTime < 191) {
        screenTime = screenTime + 10;
    }

    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    pauseButton.src = './src/assets/pause.svg'

    transformScreenTime(screenTime);
};

const handleVolumeChange = () => {
    const audio_iframe = document.querySelector('iframe');
    const volume = document.getElementById('volume-control').value;
    audio_iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, '*');
};

const handleReverseClick = () => {
    const animationElement = document.getElementById('titlecontent');

    if(animationElement.style.animationDirection === 'normal') {
        animationElement.style.animationDirection = 'reverse';
    } else {
        animationElement.style.animationDirection = 'normal';
    }

};

export const creditPage = () => {
    const data = JSON.parse(localStorage.getItem("creditsData"));

    const displayText = parseTextToHtml(data.textData.text);
    const displayTitle = data.textData.title;
    const config = data.config;

    const youtubeUrl = validateYoutubeUrl(config.youtubeUrl || 'https://www.youtube.com/watch?v=GiPuOb1erM8');
    const videoId = parseYoutubeUrl(youtubeUrl);

    let originDiv = document.getElementById(originDivId);
    originDiv.innerHTML = "";
    const credits = createDiv('credits', `<div id="titles"> <section id="titlecontent"> <p class="center">${displayTitle}</p> ${displayText} </section></div> `);
    const actionButtons = createDiv('actions', `<div class="action-wrapper"><div style="position:absolute;top:-500px;left:-5px"><iframe id='audio' width="300" height="300"
    src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&rel=0&controls=1" controls="1" allow='autoplay' frameborder="0" allowfullscreen>
    </iframe></div><button class="reverse-button no-background"><image class="reverse" src="./src/assets/reverse.svg"></image></button><button class="backward-button no-background"><image class="reverse-forward" src="./src/assets/fast-forward.svg"></image></button><button class="pause-button no-background"><image class='pause-image' src="./src/assets/pause.svg"></image></button><button class="forward-button no-background"><image src="./src/assets/fast-forward.svg"></image></button><input type="range" value="100" id="volume-control"></div>`);
    originDiv.appendChild(credits);
    originDiv.appendChild(actionButtons);

    const rotationDegree = validateRotation(Number(config.rotationDeg || '25'));
    const screenTime = validateScreenTime(Number(config.screenTime || '100'));
    const font = config.font || 'Calibri';

    transformRotation(rotationDegree);
    transformScreenTime(screenTime);
    transformFont(font);

    const pauseButton = document.getElementsByClassName('pause-button')[0];
    const reverseForwardButton = document.getElementsByClassName('reverse-forward')[0];
    const forwardButton = document.getElementsByClassName('forward-button')[0];
    const volumeElement = document.getElementById('volume-control');
    const reverseButton = document.getElementsByClassName('reverse-button')[0];

    pauseButton.addEventListener('click', handlePauseClick);
    reverseForwardButton.addEventListener('click', handleBackwardClick);
    forwardButton.addEventListener('click', handleForwardClick);
    reverseButton.addEventListener('click', handleReverseClick)
    volumeElement.addEventListener('change', handleVolumeChange);

    //localStorage.clear();

    return true;
};
