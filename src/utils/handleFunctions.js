import { transformConfigInput } from '../utils/styleHelpers.js';
import { createCredit } from '../actions/creditActions.js';
import { FONTS } from '../constants/dataConstants.js';
import { transformScreenTime } from '../utils/styleHelpers.js';
import { FRONTEND_BASE_URL } from '../constants/envConstants.js';

export const handlePauseClick = () => {
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

export const handleForwardClick = () => {
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

export const handleBackwardClick = () => {

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

export const handleVolumeChange = () => {
    const audio_iframe = document.querySelector('iframe');
    const volume = document.getElementById('volume-control').value;
    audio_iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${volume}]}`, '*');
};

export const handleReverseClick = () => {
    const animationElement = document.getElementById('titlecontent');

    if(animationElement.style.animationDirection === 'normal') {
        animationElement.style.animationDirection = 'reverse';
    } else {
        animationElement.style.animationDirection = 'normal';
    }
};

export const handleSubmitClick = async () => {
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

export const handlePlayClick = () => {
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

    window.location.href = `${FRONTEND_BASE_URL}/#/credit`;
};

export const handleImportClick = async () => {
    document.getElementById("selectFiles").click();
};

export const handleImportFile = async () => {
    const files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
      return false;
    }
  
    const fr = new FileReader();
  
    fr.onload = function(e) { 
        const result = JSON.parse(e.target.result);
        transformConfigInput(result);
        document.getElementById('selectFiles').value = '';
    }
  
    fr.readAsText(files.item(0));
};

export const handleExportClick = () => {
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

export const handleShareClick = () => {
    const popupContent = document.getElementsByClassName('popup-content')[0];
    
    popupContent.style.display = 'flex';
}

export const handleSubmitShareClick = async () => {
    const popupContent = document.getElementsByClassName('popup-content')[0];

    const isPrivate = Number(document.getElementById('private').checked);
    const password = document.getElementById('password').value;
    const text = document.getElementById('credits-input-text-area').value.trim();
    const title = document.getElementsByClassName('credits-title-input')[0].value;
    const rotationDeg = document.getElementsByClassName('credits-rotation-input')[0].value;
    const screenTime = document.getElementsByClassName('credits-screen-time-input')[0].value;
    const font = document.getElementById('font-select').value;
    const youtubeUrl = document.getElementsByClassName('credits-sound-input')[0].value;

    const config = { rotationDeg, screenTime, font, youtubeUrl };

    const data = { 
        title: title,
        text: text,
        config: config,
        password: password,
        isPrivate: isPrivate,
    }

    if(isPrivate && password.length < 6) {
        alert("Password must be longer!!");
        return;
    }

    const result = await createCredit(data);

    navigator.clipboard.writeText(`${FRONTEND_BASE_URL}/#/credit/shared?id=${result.id}`)

    document.getElementById('private').checked = false;
    document.getElementById('password').value = '';
    
    popupContent.style.display = 'none';
}

export const handleClosePopupClick = () => {
    const popupContent = document.getElementsByClassName('popup-content')[0];

    document.getElementById('private').checked = false;
    document.getElementById('password').value = '';

    popupContent.style.display = 'none';
}

export const handleFullScreenClick = () => {
    const element = document.body;
    const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    const isFullScreen = (window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height);

    if(!isFullScreen) {
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    } else {
        document.exitFullscreen();
    }
}
