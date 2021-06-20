import { originDivId } from '../constants/routerConstants.js';
import { createFrotPage } from '../utils/viewHelpers.js';

import { 
    handlePlayClick, 
    handleImportClick, 
    handleImportFile, 
    handleExportClick, 
    handleShareClick,
    handleSubmitShareClick,
    handleClosePopupClick
} from "../utils/handleFunctions.js";

export const frontPage = () => {
    let originDiv = document.getElementById(originDivId);
    originDiv.innerHTML = "";

    const frontPage = createFrotPage();
    originDiv.appendChild(frontPage);

    const popupContent = document.getElementsByClassName('popup-content')[0];

    popupContent.style.display = 'none';

    const importButton = document.getElementById('import');
    const importFiles = document.getElementById('selectFiles');
    const button = document.getElementById('play');
    const exportButton = document.getElementById('export');
    const shareUrl = document.getElementById('public-url');
    const submitShare = document.getElementById('submit');
    const closePopup = document.getElementById('close-button');

    button.addEventListener('click', handlePlayClick);
    importButton.addEventListener('click', handleImportClick);
    importFiles.addEventListener('change', handleImportFile);
    exportButton.addEventListener('click', handleExportClick);
    shareUrl.addEventListener('click', handleShareClick);
    submitShare.addEventListener('click', handleSubmitShareClick);
    closePopup.addEventListener('click', handleClosePopupClick);

    return true;
};
