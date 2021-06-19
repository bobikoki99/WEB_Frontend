import { createDiv } from "../utils/helpers.js";
import { originDivId } from '../constants/routerConstants.js';
import { transformConfigInput } from '../utils/styleHelpers.js';
import { FONTS } from '../constants/dataConstants.js';

const handlePlayClick = () => {
    const text = document.getElementById('credits-input-text-area').value.trim();
    const title = document.getElementsByClassName('credits-title-input')[0].value;
    const rotationDeg = document.getElementsByClassName('credits-rotation-input')[0].value;
    const screenTime = document.getElementsByClassName('credits-screen-time-input')[0].value;
    const font = FONTS[document.getElementById('font-select').value];
    const youtubeUrl = document.getElementsByClassName('credits-sound-input')[0].value;

    localStorage.clear();
    const textData = { title, text };
    const config = { rotationDeg, screenTime, font, youtubeUrl };
    const dataTransfer = { textData, config };
    localStorage.setItem('creditsData', JSON.stringify(dataTransfer));

    window.location.href = 'http://127.0.0.1:5500/#/credit';
};

const handleImportClick = async () => {
    document.getElementById("selectFiles").click();
};

const handleImportFile = async () => {
    const files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
      return false;
    }
  
    const fr = new FileReader();
  
    fr.onload = function(e) { 
        const result = JSON.parse(e.target.result);
        console.log(result);
        transformConfigInput(result);
        document.getElementById('selectFiles').value = '';
    }
  
    fr.readAsText(files.item(0));
};

const handleExportClick = () => {
    const text = document.getElementById('credits-input-text-area').value.trim();
    const title = document.getElementsByClassName('credits-title-input')[0].value;
    const rotationDeg = document.getElementsByClassName('credits-rotation-input')[0].value;
    const screenTime = document.getElementsByClassName('credits-screen-time-input')[0].value;
    const font = document.getElementById('font-select').value;
    const youtubeUrl = document.getElementsByClassName('credits-sound-input')[0].value;

    const data = { title, text };
    const config = { rotationDeg, screenTime, font, youtubeUrl };
    const jsonData = { data, config };

    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

const handleShareClick = () => {
    const popupContent = document.getElementsByClassName('popup-content')[0];
    
    popupContent.style.display = 'flex';
}

const handleSubmitShareClick = () => {
    const popupContent = document.getElementsByClassName('popup-content')[0];

    navigator.clipboard.writeText('Areeee she go bude ')
    
    popupContent.style.display = 'none';
}

export const frontPage = () => {
    let originDiv = document.getElementById(originDivId);
    originDiv.innerHTML = "";
    const popup = '<div class="popup-content"><p class="check-mark"> <input type="checkbox" id="private"> <label class="settings-text" for="private">Private</label> </p> <div><label class="settings-text" for="password">Password:</label> <input type="password" id="password"> </div><input type="button" id="submit" value="Get URL"></div>';
    const frontPage = createDiv('view1', `<section class="start"><div id="config"><form id="form-credits-intro-creator"><div class="title-wrapper">                <h2 id="page-title">Ultimate Roll</h2>                <h2 id="page-title">Credits Intro Creator</h2>            </div>            <input class="credits-title-input" type="text" value="EPISODE IV A NEW HOPE FOR 3"></input><textarea id="credits-input-text-area" rows="4" spellcheck="false" maxlength="3000"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et, dolore soluta impedit eos iure delectus vero iste asperiores distinctio, nesciunt odio provident, officiis illum sequi alias incidunt nisi tempore.</textarea>            <div class="credits-rotation-wrapper"><div class="credits-container"><div class="settings-text">Credits rotation</div><input class="credits-rotation-input" type="number"></input>              </div>              <div class="credits-container">                <div class="settings-text">Screen time</div>                <input class="credits-screen-time-input" type="number"></input>              </div>              <div class="credits-container">                <div class="settings-text">Font</div><select name="fonts" id="font-select"><option value="">Default</option><option value="starWars">StarWars</option><option value="arial">Arial</option><option value="verdana">Verdana</option><option value="helvetica">Helvetica</option><option value="trebuchet">Trebuchet MS</option><option value="timesNewRoman">Times New Roman</option><option value="georgia">Georgia</option><option value="garamond">Garamond</option><option value="courierNew">Courier New</option><option value="brushScript">Brush Script MT</option></select></div><div class="credits-container"><div class="settings-text">Sound URL</div><input class="credits-sound-input" type="text"></input></div></div><input type="file" id="selectFiles" value="Import" /><div class="action-buttons"><button id="play" class="play-button" type="button">Play</button><button id="import" type="button">Import</button><button id="export" type="button">Export</button><button id="public-url" type="button">Share URL</button></div></form>${popup}</div></section>`);
    originDiv.appendChild(frontPage);

    const popupContent = document.getElementsByClassName('popup-content')[0];

    popupContent.style.display = 'none';

    const importButton = document.getElementById('import');
    const importFiles = document.getElementById('selectFiles');
    const button = document.getElementById('play');
    const exportButton = document.getElementById('export');
    const shareUrl = document.getElementById('public-url');
    const submitShare = document.getElementById('submit');

    console.log(submitShare);

    button.addEventListener('click', handlePlayClick);
    importButton.addEventListener('click', handleImportClick);
    importFiles.addEventListener('change', handleImportFile);
    exportButton.addEventListener('click', handleExportClick);
    shareUrl.addEventListener('click', handleShareClick);
    submitShare.addEventListener('click', handleSubmitShareClick);

    return true;
};
