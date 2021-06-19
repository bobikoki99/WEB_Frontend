export const validateRotation = (rotation) => {
    return rotation > -180 && rotation < 180 ? rotation : 25;
};

export const validateScreenTime = (screenTime) => {
    return screenTime > 4 && screenTime < 200 ? screenTime : 100;
};

export const validateYoutubeUrl = (youtubeUrl) => {
    const regex = new RegExp('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$');
    return regex.test(youtubeUrl) ? youtubeUrl : 'https://www.youtube.com/watch?v=GiPuOb1erM8';
};
