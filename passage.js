class Passage {
    constructor(text) {
        // this.text here
        this.text = text
        // this.index here
        this.index = 0
        // what is teh correct information?
        this.correctList = []
    }

    // renders our text
    render() {
        // we need to keep track of our x-coordinates
        // left margin here
        let leftMargin = 20
        // top margin here
        let topMargin = 20 + textAscent()
        // positions here
        let x = leftMargin
        let y = topMargin
        let pos = []

        fill(0, 0, 100)
        // let's iterate through all of our characters!
        for (let i = 0; i < this.text.length; i++) {
            // what is our current character?
            let c = this.text[i]
            // now let's display it!
            // first, we need to reset our color.
            fill(0, 0, 100)
            text(c, x, y)

            // if our i is less than our index, we should highlight.
            if (i < this.index) {
                // then, we can fill a greenish color, but if we get it
                // wrong, we fill with a reddish color.
                fill(100, 50, 50, 50)
                if (this.correctList[i] === false) {
                    fill(343, 50, 50, 50)
                }
                rect(x, y-textAscent()-2, textWidth(c), textAscent() + textDescent() + 4, 3)
            }

            // below is a text wrap that will be commented out after we get
            // to word wrap.
            // if our current x is greater than our width minus our left
            // margin...
            let wrap = false
            // if (x + textWidth(c) > width - leftMargin) {
            //     // ...we set our wrap to true. This is going to be useful when
            //     // saving positions.
            //     wrap = true
            // }

            // word wrap!
            // if our current letter is a space...
            if (c === ' ') {
                // ...we need to find the next delimiter index using the
                // rest of the passage...
                let restOfPassage = this.text.substring(i + 1)
                let nextSpace = restOfPassage.indexOf(' ') + i + 1
                console.log(nextSpace)
                // ...and then the current word...
                let currentWord = this.text.substring(i + 1, nextSpace)
                // ... and if the text length of the current word plus our
                // current x plus a text width is greater than our x wrap...
                if (x + textWidth(' ') + textWidth(currentWord) > width - leftMargin) {
                    // ...again, we set our wrap to true.
                    wrap = true
                }
            }




            // now that we've did our business with wraps, we can now save
            // our position and increment our x, but if wrap is set to true,
            // we need to wrap instead

            // we add our position to our positions list (pos).
            pos.push(new p5.Vector(x, y))
            x += textWidth(c)
            // but what if our wrap is true? we set our x to our left margin
            // and increment our y such that things don't overlap.
            if (wrap) {
                x = leftMargin
                y += textAscent() + textDescent() + 5
            }
        }


        // let's do our highlight bars!
        // find the previous delimiter index

        // find the next delimiter index

        // find the positions using the position list

        // let's draw at least the line above
        // now we can draw the sides

        // let's do our cursor!
        // find the position of the character we're on, then find text width
        // of current character
        let char_pos = pos[this.index]
        let text_width = textWidth(this.text[this.index])
        rect(char_pos.x, char_pos.y+6, text_width, -3)
    }

    // sets our current character to incorrect
    setIncorrect() {
        // our index needs to be incremented and also we have a correct list
        // and we append a false to it because we got it incorrect.
        this.index += 1
        this.correctList.push(false)
    }
    // sets our current character to correct
    setCorrect() {
        // our index needs to be incremented (no block on errors yet) and
        // also we have a correct list and we append a true to it because
        // we got it correct.
        this.index += 1
        this.correctList.push(true)
    }
    // gets our current char
    getCurrentChar() {
        return this.text[this.index]
    }
}
