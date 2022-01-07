startReactor = {
    //criando arrey e trabalhando com audio 

    computerCombination: [],
    playerCombination: [],
    computerCobinationPosition: 1,
    combinationMaxPosition: 5, 
    memoryMaxCombination: 9, 

    audio: {
        start: 'start.mp3',
        fail: 'fail.mp3', 
        complete: 'complete.mp3',
        combinations: ['0.mp3', '1.mp3', '2.mp3','3.mp3','4.mp3','5.mp3','6.mp3', '7.mp3', '8.mp3' ],

        //carregando audio de erro
        loadAudio(filename) {
            const file = `./audio/${filename}?cb=${new Date().getTime()}`
            const audio = new Audio(file)
            audio.load()
            return audio
        },
        loadAudio() {
            if (typeof(startReactor.audio.start) == "object") return

            startReactor.audio.start = startReactor.audio.loadAudio(startReactor.audio.start)
            startReactor.audio.complete = startReactor.audio.loadAudio(startReactor.audio.complete)
            startReactor.audio.fail = startReactor.audio.loadAudio(startReactor.audio.fail)
            startReactor.audio.combinations = startReactor.audio.combinations.map((audio) => startReactor.audio.loadAudio(audio))
        }

    },

    async load() {
        return new Promise(resolve => {
            console.log("Loading Game...")
            startReactor.audio.loadAudio()

            const playerMemory = startReactor.interface.playerMemory
            const memory = startReactor.interface.playerMemoryButtons

            Array.prototype.forEach.call(memory, (element) => {
                element.addEventListner("click", () => {
                    if (playerMemory.classList.contains("playerActive")) {
                        startReactor.play(parseInt(element.dataset.memory))
                        console.log("o valor do elemento clicado é:" + element.dataset.memory)

                        element.style.animation = "playermemoryClick .4s"
                        setTimeout(() => element.style.animation = "", 400)
                    }
                })
            })
        })
    }

}