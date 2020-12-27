import MainMenuSong from './main-menu-theme-2.mp3';

export default class MainMenuTheme {

    constructor() {
        this.filePath = MainMenuSong;
        this.audio = new Audio(MainMenuSong);
        this.setOnEndedToInvokePlay(this.audio)
        this.play = this.play.bind(this);
    }

    play() {
        if (this.audio.ended) {
            this.audio = new Audio(this.filePath);
            this.setOnEndedToInvokePlay(this.audio);
        }

        // this.audio.play();
    }

    setOnEndedToInvokePlay(a) {
        this.audio.onended = ('ended', () => {
            a.play();
        });
    }

    pause() {
        this.audio.pause();
    }
}