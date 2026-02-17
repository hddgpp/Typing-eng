const words = 'The morning sun spilled over the jagged mountain peaks, casting long shadows across the valley below. Birds flitted between the branches, singing melodies that tangled with the distant roar of a waterfall. A thin mist curled around the roots of ancient trees, hiding paths that led to forgotten ruins. Somewhere in the distance, a bell tolled softly, echoing across the hills as if counting the moments before the world awoke fully. Every leaf, every stone, seemed alive, whispering secrets to anyone patient enough to listen.'.split(' ')

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * words.length) 
    return words[randomIndex -1]
}

function formatWord(word) {
    return `<div class="word"><span class="letter">
                ${word.split('').join('</span><span class="letter">')}
            </span></div>`
}

function newGame() {
    for (let i = 0; i < 200; i++) {
        document.querySelector('#words').innerHTML += formatWord(randomWord())
    }
}

newGame()