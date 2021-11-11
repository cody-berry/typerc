/*
@author Cody
@date 2021-11-11

version comments
    1-line passage, render text
    highlights, sounds
    block on error #1
    block on error #2
    block on error setting
    text wrap
    word wrap
    WPM
    accuracy
    score
    special screen
 */


let font
let passage
let correctSound // audio cue for typing one char correctly
let incorrectSound // audio cue for typing one char incorrectly


function preload() {
    font = loadFont('data/lucida-console.ttf')
    // font = loadFont('data/Meiryo-01.ttf')
}


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 30)

    correctSound = loadSound('data/correct.wav')
    incorrectSound = loadSound('data/incorrect.wav')

    passage = new Passage("Hello! I'm Cody.")
}


function draw() {
    background(234, 34, 24)

    passage.render()
}


// // retype this for familiarity
// function keyPressed() {
//     // don't do anything if we detect SHIFT ALT CONTROL keycodes
//     if (keyCode === SHIFT ||
//         keyCode === ALT ||
//         keyCode === CONTROL ||
//         keyCode === 20) { // this is capslock
//         return
//     }
//
//     /*  if the key we just pressed === passage.getCurrentChar, play correct
//         sound, rewind it, passage.setCorrect(). otherwise, play and rewind
//         the incorrect sound. passage.setIncorrect().
//      */
//     if (passage.getCurrentChar() === key) {
//         passage.setCorrect()
//         correctSound.play()
//     } else {
//         passage.setIncorrect()
//         incorrectSound.play()
//     }
// }