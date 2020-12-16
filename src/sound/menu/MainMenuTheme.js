import MainMenuSong from './main-menu-theme.mp3';

export default class MainMenuTheme {

    constructor() {
        this.filePath = MainMenuSong;
        this.audio = new Audio(MainMenuSong);
        const a = this.audio;
        this.audio.onended = ('ended', () => {
            a.play()
        });
        this.play = this.play.bind(this);
    }

    play() {
        if (this.audio.ended) {
            this.audio = new Audio(this.filePath);
            let a = this.audio;
            this.audio.onended = ('ended', () => {
                a.play()
            })
        }

        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }
}