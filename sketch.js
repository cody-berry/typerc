/*
@author Cody
@date 2021-11-23

features
    display one line
        this.text, character
        currentCharPos p5.Vector
    correct / incorrect with sounds
        highlight method: this.index, increment index
    highlight correct / incorrect
        loop through correct characters and incorrect characters, and
        highlight them based on their value
    current typing cursor
        use this.index and positions
    text wrap
        if the current x is greater than a wrapping bound, set x back to
        the left margin
    word wrap
        if the current character is a space, check the next delimiter index
        and if it is farther than the same wrapping bound, set x back to
        the left margin
    highlight bar for each word
        find the previous delimiter index. next, draw a line over the
        positions
    WPM
        find minutes by milliseconds and words by this.index
    accuracy
        take the number of corrects and divide it by our index and multiply
        by 100 to get the percentage. Then, round.
    WPM for each word typed
        Make timestamps for every space typed, then iterate through each and
        do the same process to find the WPM for that word
    stars based on WPM for each word
        set stars for word, then draw the number of stars earned
    special screen
        have score equal pounds of mead fermented from the stars, and
        subtract from the score the amount of given rainwater left. before
        subtracting, multiply by the accuracy. There will be no stars if
        you have a too low accuracy or WPM. if any excess honey and no
        excess rainwater, add pounds of honey to score
 */

let font
let passage
let correctSound // audio cue for typing one char correctly
let incorrectSound // audio cue for typing one char incorrectly


function preload() {
    font = loadFont('data/lucida-console.ttf')
}


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 30)

    correctSound = loadSound('data/correct.wav')
    incorrectSound = loadSound('data/incorrect.wav')
    passage = new Passage("Hi! My name is Cody Tian. The width and height of" +
        " my star image is just 1 all over the place. How can I fix it? I" +
        " just" +
        " finished my WPM!" +
        " Let's see if it works. Huh, the stars display as just 🌟s.")
}


function draw() {
    background(234, 34, 24)

    passage.render()
}

function keyPressed() {
    // don't do anything unless we find a shift, alt, control, or capslock
    if (keyCode === SHIFT ||
        keyCode === ALT ||
        keyCode === CONTROL ||
        keyCode === TAB ||
        keyCode === 20) {
        return
    }
    // Now what to do? We should check if our key is the same as the correct
    // key.
    if (key === passage.getCurrentChar()) {
        passage.setCorrect()
        correctSound.play()
    }
    else {
        passage.setIncorrect()
        incorrectSound.play()
    }
}