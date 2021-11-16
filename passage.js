/*

 */

class Passage {
    constructor(text) {
        this.text = text
        this.index = 0 // where in the passage we're currently typing
        this.correctList = [] // booleans recording character correctness
        this.playing = false
    }


    render() {
        fill(0, 0, 100)

        // the bottom left corner of the current letter we are typing = cursor
        const leftMargin = 20
        const topMargin = 20

        let x = leftMargin
        let y = topMargin + textAscent() // our text coordinates are on
        // the bottom-left, not the top-left
        // and luckily, that's our cursor!
        let cursor = new p5.Vector(0, 0)
        // we'll need to save all of the positions here.
        let positions = []

        /*  display the entire passage without text wrap
         */
        for (let i = 0; i < this.text.length; i++) {
            // save the position of the ith character. we'll need this later
            let c = this.text[i]

            /*  show the highlight box for correct vs incorrect after we type
             */
            if (i < this.correctList.length) {
                fill(90, 60, 60, 50)
                if (this.correctList[i] === false) {
                    fill(0, 100, 60, 50)
                }
                rect(x,
                    y-textAscent(),
                    textWidth(c),
                    textAscent() + 6,
                    3)
            }


            /*  draw current letter above the highlight box in terms of z-index
             */
            // let's find the x position of our character

            // and we can finally draw it!
            // after resetting our fill.
            fill(0, 0, 100)
            text(c, x, y)


            /*  modify cursor position to where the next letter should be
                each highlight box should be 1 pixel bigger on left and right
                1+1=2 total pixels of extra width
             */
            // cursor.x += textWidth(' ')

            /* below is a more advanced word wrap, wrapping by word
             */

            /*  if we're at a whitespace, determine if we need a new line:
                    find the next whitespace
                    the word between us and that whitespace is the next word
                    if the width of that word + our cursor + current space >
                     limit, then newline
             */
            // let i = this.index
            let wrapped = false
            if (this.text[i] === ' ') {
                // console.log('space found!')
                let restOfPassage = this.text.substring(i+1)
                // console.log(restOfPassage)
                let nextWhitespaceIndex = restOfPassage.indexOf(' ') + i
                // console.log(nextWhitespaceIndex)
                let currentWord = this.text.substring(i,
                    nextWhitespaceIndex+1)
                // console.log(currentWord)
                let widthOfWord = textWidth(currentWord)
                // console.log(widthOfWord)
                // console.log(textWidth(' '))
                if (widthOfWord + x + textWidth(' ') > width - leftMargin) {
                    wrapped = true
                }
            }


            // we can increment our x position, after saving it to our
            // cursor if we're at it
            let save_x = x
            let save_y = y
            if (i === this.index) {
                cursor = new p5.Vector(save_x, save_y+6)
            }
            // also, we need to append our saves to our position list
            positions.push(new p5.Vector(save_x, save_y))
            if (wrapped) {
                x = 0
                y += textAscent() + textDescent() + 6
            }
            x += textWidth(' ') // our position is i spaces


            // this is the horizontal coordinate where we must text wrap
            // let x_wrap = width - leftMargin

            /*  let's do a simple word wrap, wrapping just by character!
             */
            // if (x > x_wrap) {
            //     x = leftMargin
            //     y += textAscent() + textDescent() + 6
            // }
        }

        /*  add current word top highlight horizontal bar
         */
        // find index of next and previous whitespace chars

        // next delimiter index
        let restOfPassage = this.text.substring(this.index)
        let nextWhitespaceIndex = restOfPassage.indexOf(' ') + this.index
        // previous delimiter index
        let passedPassage = this.text.substring(0, this.index)
        let previousWhitespaceIndex = 0
        for (let i = 0; i < passedPassage.length; i++) {
            if (passedPassage[i] === ' ') {
                previousWhitespaceIndex = i+1
            }
        }
        // console.log(previousWhitespaceIndex)
        // console.log(nextWhitespaceIndex)

        // see where our positions list comes in handy? We can access our
        // positions without doing much work anymore!
        let nextWhitespacePos = positions[nextWhitespaceIndex]
        let previousWhitespacePos = positions[previousWhitespaceIndex]

        // +1 because we don't want the line to go over the previous
        // whitespace char

        // let's finally draw our horizontal bar!
        stroke(0, 0, 50)
        line(previousWhitespacePos.x, previousWhitespacePos.y-textAscent()-3,
            nextWhitespacePos.x, nextWhitespacePos.y-textAscent()-3)
        // we can also draw bracket lines
        line(previousWhitespacePos.x, previousWhitespacePos.y-textAscent()-1,
            previousWhitespacePos.x, previousWhitespacePos.y-textAscent()-3)
        line(nextWhitespacePos.x, nextWhitespacePos.y-textAscent()-3,
            nextWhitespacePos.x, nextWhitespacePos.y-textAscent()-1)


        /*  add cursor below current character
        */
        stroke(0, 0, 0)
        rect(cursor.x, cursor.y, textWidth(' '), 3)

        // TODO check if we're finished, otherwise we try to read [index+1]

        // let's add WPM! The first step is finding the milliseconds passed.
        let ms = millis()
        text(millis, 0, height)
        // closest to the given number, in this case, millis()
        // how many words have we typed? Let's assume that the length of a
        // word is 5 characters.
        text(this.index/5, 100, height)
        // what is the number of seconds that has elapsed?
        let seconds = ms*1000
    }


    getCurrentChar() {
        // we want our text's letter at our index
        return this.text[this.index]
    }


    // set the current char to correct
    setCorrect() {
        // as always, we increase our index
        this.index += 1
        // and append a 'true' to our correct list, meaning that last time
        // we got a correct
        this.correctList.push(true)

        // the line below is for testing
        console.assert(this.correctList.length === this.index)
    }


    // set the current char to be incorrect, skip
    setIncorrect() {
        // we increase our index as well, not blocking on errors
        this.index += 1
        // and append a 'false' to our correct list, meaning that we got an
        // incorrect ; ;
        this.correctList.push(false)
    }
}