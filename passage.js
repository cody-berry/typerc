class Passage {
    constructor(text) {
        // this.text here
        this.text = text
        // this.index here
        this.index = 0
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

        fill(0, 0, 100)
        // let's iterate through all of our characters!
        for (let i = 0; i < this.text.length; i++) {
            // what is our current character?
            let c = this.text[i]
            // now let's display it!
            text(c, x, y)
            // below is a text wrap that will be commented out after we get
            // to word wrap.
            // if our current x is greater than our width minus our left
            // margin...
            // ...we set our wrap to true. This is going to be useful when
            // saving positions.

            // word wrap!
            // if our current letter is a space...
            // ...we need to find the next delimiter index using the
            // rest of the passage...


            // ...and then the current word...

            // ... and if the text length of the current word plus our
            // current x plus a text width is greater than our x wrap...

            // ...again, we set our wrap to true.


            // now that we've did our business with wraps, we can now save
            // our position and increment our x, but if wrap is set to true,
            // we need to wrap instead
            x += textWidth(c)
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
    }

    // sets our current character to incorrect
    setIncorrect() {

    }
    // sets our current character to correct
    setCorrect() {

    }
}
