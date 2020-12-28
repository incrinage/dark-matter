import Sound from '../Sound';
import MainMenuSong from './mp3/main-menu-theme-2.mp3';

export default class MainMenuTheme {

    constructor() {
    }

    createSound(audioCtx) {
        return new Sound(audioCtx, MainMenuSong);
    }
}