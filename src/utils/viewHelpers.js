import { createDiv } from "./helpers.js";

export const createCredits = (displayTitle, displayText) => {
    return createDiv('credits', `<div id="titles"> <section id="titlecontent"> <p class="center">${displayTitle}</p> ${displayText} </section></div> `);
};

export const createActionButtons = (videoId) => {
    return createDiv('actions', `<div class="action-wrapper"><div style="position:absolute;top:-500px;left:-5px"><iframe id='audio' width="300" height="300"
                                src="https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&rel=0&controls=1" controls="1" allow='autoplay' frameborder="0" allowfullscreen>
                                </iframe></div><button class="reverse-button no-background"><image class="reverse" src="./src/assets/reverse.svg"></image></button>
                                <button class="backward-button no-background"><image class="reverse-forward" src="./src/assets/fast-forward.svg"></image></button>
                                <button class="pause-button no-background"><image class='pause-image' src="./src/assets/pause.svg"></image></button><button class="forward-button no-background">
                                <image src="./src/assets/fast-forward.svg"></image></button><input type="range" value="100" id="volume-control"></div>`
    )
};

export const createPasswordForm = () => {
    return createDiv('actionButtons', `<div class="action-password"><div class="password-wrapper"><label class="settings-text" for="password">Password:</label><input type="password" id="password"></div><button id="submit-button" type="button">Submit</button></div>`);
};

export const createFrotPage = () => {
    const popup = '<div class="popup-content"><button id="close-button" class="close-button no-background"><image class="close" src="./src/assets/close.svg"></image></button><p class="check-mark"> <input type="checkbox" id="private"> <label class="settings-text" for="private">Private</label> </p> <div><label class="settings-text" for="password">Password:</label> <input type="password" id="password"> </div><input type="button" id="submit" value="Get URL"></div>';
    return createDiv('view1', `<section class="start"><div id="config"><form id="form-credits-intro-creator"><div class="title-wrapper"><h2 id="page-title">Ultimate Roll</h2><h2 id="page-title">Credits Intro Creator</h2></div><input class="credits-title-input" type="text" value="EPISODE IV A NEW HOPE FOR 3"></input><textarea id="credits-input-text-area" rows="4" spellcheck="false" maxlength="3000"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et, dolore soluta impedit eos iure delectus vero iste asperiores distinctio, nesciunt odio provident, officiis illum sequi alias incidunt nisi tempore.</textarea><div class="credits-rotation-wrapper"><div class="credits-container"><div class="settings-text">Credits rotation</div><input class="credits-rotation-input" type="number"></input></div><div class="credits-container"><div class="settings-text">Screen time</div><input class="credits-screen-time-input" type="number"></input></div><div class="credits-container"><div class="settings-text">Font</div><select name="fonts" id="font-select"><option value="">Default</option><option value="starWars">StarWars</option><option value="arial">Arial</option><option value="verdana">Verdana</option><option value="helvetica">Helvetica</option><option value="trebuchet">Trebuchet MS</option><option value="timesNewRoman">Times New Roman</option><option value="georgia">Georgia</option><option value="garamond">Garamond</option><option value="courierNew">Courier New</option><option value="brushScript">Brush Script MT</option></select></div><div class="credits-container"><div class="settings-text">Sound URL</div><input class="credits-sound-input" type="text"></input></div></div><input type="file" id="selectFiles" value="Import" /><div class="action-buttons"><button id="play" class="play-button" type="button">Play</button><button id="import" type="button">Import</button><button id="export" type="button">Export</button><button id="public-url" type="button">Share URL</button></div></form>${popup}</div></section>`);
}