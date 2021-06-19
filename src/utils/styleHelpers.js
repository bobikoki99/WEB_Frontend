export const transformRotation = (rotationDegree) => {
    const textElement = document.getElementById('titles');

    textElement.style.webkittransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.moztransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.mstransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.otransform = `perspective(300px) rotateX(${rotationDegree}deg)`;
    textElement.style.transform = `perspective(300px) rotateX(${rotationDegree}deg)`;
}

export const transformScreenTime = (screenTime) => {
    const textElement = document.getElementById('titlecontent');

    textElement.style.webkitanimation = `scroll ${screenTime}s linear 4s infinite`;
    textElement.style.mozanimation = `scroll ${screenTime}s linear 4s infinite`;
    textElement.style.msanimation = `scroll ${screenTime}s linear 4s infinite`;
    textElement.style.oanimation = `scroll ${screenTime}s linear 4s infinite`;
    textElement.style.animation = `scroll ${screenTime}s linear 4s infinite`;
}

export const transformFont = (font) => {
    const titleElement = document.getElementById('titlecontent');

    titleElement.style.fontFamily = font;
};

export const transformConfigInput = (jsonFile) => {
    if (jsonFile.config && jsonFile.config.rotationDeg) {
        document.getElementsByClassName('credits-rotation-input')[0].value = jsonFile.config.rotationDeg;
    }

    if (jsonFile.config && jsonFile.config.screenTime) {
        document.getElementsByClassName('credits-screen-time-input')[0].value = jsonFile.config.screenTime;
    }

    if (jsonFile.config && jsonFile.config.font) {
        document.getElementById('font-select').value = jsonFile.config.font;
    }

    if (jsonFile.config && jsonFile.config.youtubeUrl) {
        document.getElementsByClassName('credits-sound-input')[0].value = jsonFile.config.youtubeUrl;
    }

    if (jsonFile.data && jsonFile.data.text) {
        document.getElementById('credits-input-text-area').value = jsonFile.data.text;
    }

    if (jsonFile.data && jsonFile.data.title) {
        document.getElementsByClassName('credits-title-input')[0].value = jsonFile.data.title;
    }
};
