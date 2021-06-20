import { parseTextToHtml } from "../utils/helpers.js";
import { originDivId } from '../constants/routerConstants.js';
import { createCredits, createActionButtons } from "../utils/viewHelpers.js";
import { parseYoutubeUrl } from '../utils/helpers.js';
import { transformRotation, transformScreenTime, transformFont } from '../utils/styleHelpers.js';
import { validateRotation, validateScreenTime, validateYoutubeUrl } from '../utils/validations.js';
import { 
    handlePauseClick, 
    handleForwardClick, 
    handleBackwardClick, 
    handleVolumeChange, 
    handleReverseClick 
} from "../utils/handleFunctions.js";

export const creditPage = () => {
    const data = JSON.parse(localStorage.getItem("creditsData"));

    const displayText = parseTextToHtml(data.textData.text);
    const displayTitle = data.textData.title;
    const config = data.config;

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

    pauseButton.addEventListener('click', handlePauseClick);
    reverseForwardButton.addEventListener('click', handleBackwardClick);
    forwardButton.addEventListener('click', handleForwardClick);
    reverseButton.addEventListener('click', handleReverseClick)
    volumeElement.addEventListener('change', handleVolumeChange);

    return true;
};
