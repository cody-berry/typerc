/*
@author Cody
@date 2021-11-11

version comments
.   1-line passage, basic render of text
.   start typing, getCurrentChar(), set incorrect/correct
.   cursor
.   highlight incorrect/correct
.   text wrap
.   word wrap
    box above current word
    WPM
    accuracy
    score
    special screen
    block on errors
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

    passage = new Passage("Hello! My name is Cody Tian. Right now, I'm" +
        " working on word wrap! I'm also the developer of the page.")
}


function draw() {
    background(234, 34, 24)

    passage.render()
    // console.log(passage.text)
    // console.log(passage.correctList)
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

function keyPressed() {
    // we don't want our things to trigger if we press Shift, Alt, Control,
    // or Capslock. The capslock keycode is 20.
    // TODO disable windows from typing
    if (keyCode === ALT ||
        keyCode === SHIFT ||
        keyCode === CONTROL ||
        keyCode === 20) {
        return
    }

    // let's set our correct keys to be correct!
    if (passage.getCurrentChar() === key) {
        passage.setCorrect()
        correctSound.play()
    } else {
        passage.setIncorrect()
        incorrectSound.play()
    }
}

