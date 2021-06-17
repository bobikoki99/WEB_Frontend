import { createDiv } from "../utils/helper.js";
import { originDivId } from '../constants/routerConstants.js';

 export const frontPage = () => {
    let originDiv = document.getElementById(originDivId);
    originDiv.innerHTML = "";
    const frontPage = createDiv('view1', `<section class="start">        <div id="config">          <form id="form-credits-intro-creator">            <div class="title-wrapper">                <h2 id="page-title">Ultimate Roll</h2>                <h2 id="page-title">Credits Intro Creator</h2>            </div>            <textarea id="credits-input-text-area" rows="4" spellcheck="false" maxlength="3000">                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error et, dolore soluta impedit eos iure delectus vero iste asperiores distinctio, nesciunt odio provident, officiis illum sequi alias incidunt nisi tempore.            </textarea>            <br />            <button id="play" class="play-button" type="submit">Play</button>            <br />          </form>        </div>      </section>`);
    return originDiv.appendChild(frontPage);
};
