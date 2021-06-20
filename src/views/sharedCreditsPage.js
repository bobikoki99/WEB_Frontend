import { createDiv, parseTextToHtml } from "../utils/helpers.js";
import { createCredits, createActionButtons, createPasswordForm } from "../utils/viewHelpers.js";
import { originDivId } from '../constants/routerConstants.js';
import { parseYoutubeUrl } from '../utils/helpers.js';
import { transformRotation, transformScreenTime, transformFont } from '../utils/styleHelpers.js';
import { validateRotation, validateScreenTime, validateYoutubeUrl } from '../utils/validations.js';

import { 
    handlePauseClick, 
    handleForwardClick, 
    handleBackwardClick, 
    handleVolumeChange, 
    handleReverseClick,
} from "../utils/handleFunctions.js";

import { getCredit, checkPassword } from '../actions/creditActions.js';

var isPasswordCurrect = false;

const handleSubmitClick = async () => {
    const password = document.getElementById('password').value;
    const id = window.location.href.split('?id=')[1];

    if(password.length < 6) {
        alert("Password must be longer!!");
        sharedCreditsPage();
    } else {
        const result = await checkPassword(id, password);
        isPasswordCurrect = result.isCorrect;

        sharedCreditsPage();
    }
};

export const sharedCreditsPage = async () => {
    const id = window.location.href.split('?id=')[1];
    const result = await getCredit(id);

    const displayText = parseTextToHtml(result.text);
    const displayTitle = result.title;
    const config = JSON.parse(result.config);

    if(isPasswordCurrect || result.isPrivate === '0') {
        const youtubeUrl = validateYoutubeUrl(config.youtubeUrl || 'https://www.youtube.com/watch?v=GiPuOb1erM8');
        const videoId = parseYoutubeUrl(youtubeUrl);
    
        let originDiv = document.getElementById(originDivId);
        originDiv.innerHTML = "";
        const credits = createCredits(displayTitle, displayText);
        const actionButtons = createActionButtons(videoId);
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
    
        const iframe = document.querySelector('iframe');
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    
        pauseButton.addEventListener('click', handlePauseClick);
        reverseForwardButton.addEventListener('click', handleBackwardClick);
        forwardButton.addEventListener('click', handleForwardClick);
        reverseButton.addEventListener('click', handleReverseClick)
        volumeElement.addEventListener('change', handleVolumeChange);
    
        localStorage.clear();
    
        return true;
    } else {
        let originDiv = document.getElementById(originDivId);
        originDiv.innerHTML = "";

        const actionButtons = createPasswordForm();
        originDiv.appendChild(actionButtons);

        const submitButton = document.getElementById('submit-button');

        submitButton.addEventListener('click', handleSubmitClick);
    }
};
