class Passage {
    constructor(text, star) {
        // this.text here
        this.text = text
        // this.index here
        this.index = 0
        // what is the correct information?
        this.correctList = []
        // what is our space timestamp list? it keeps track of timestamps
        // for when we reach a space
        this.spaceTimestamps = []

        this.star = star
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
        // let's keep track of our space timestamp index so that we don't
        // have to go through a loop to figure out what space timestamp
        // we're on.
        let spaceTimestampIndex = 0

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
                rect(x, y - textAscent() - 2, textWidth(c), textAscent() + textDescent() + 4, 3)
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
                // console.log(nextSpace)
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
                y += textAscent() + textDescent() + 30
            }
            // if our current i is less than our current index and that i is
            // a space...
            if (i < this.index && this.text[i] === ' ') {
                // then, we can access the corresponding space timestamp and
                // do the same WPM process we did at the end of this function
                let space = this.spaceTimestamps[spaceTimestampIndex]
                let nextSpace = this.spaceTimestamps[spaceTimestampIndex+1]
                // figure out the number of milliseconds
                // wait, there's a whole other function called seconds that
                // we can use to find the seconds! Sadly, it just is the
                // simple second with no decimal.
                let ms = nextSpace[0] - space[0]
                // text(round(ms), 0, height)
                // then seconds
                let s = ms/1000
                // text(s, 0, height)
                // then minutes
                let m = s/60
                // text(m, 0, height)
                // then find words using number of characters divided by 5
                let w = (nextSpace[1] - space[1])/5
                // text(w, 0, height)
                // then takes words over minutes to find words per minute
                let wpm = w/m
                // text(round(wpm), width-textWidth(str(round(wpm))), height)
                // access the already-made position of this character and
                // then draw text above it saying the wpm in a different
                // font.
                // textSize(8)
                let alreadyPassedPassage = this.text.substring(0, i)
                let restOfPassage = this.text.substring(i)
                // find the previous delimiter index
                let previousDelimiterIndex = -1
                for (let i = 0; i < alreadyPassedPassage.length; i++) {
                    if (this.text[i] === ' ') {
                        previousDelimiterIndex = i
                    }
                }
                // find the next delimiter index
                let nextDelimiterIndex = restOfPassage.indexOf(' ') + i
                previousDelimiterIndex++
                if (nextDelimiterIndex - previousDelimiterIndex > 2) {
                    textSize(8)
                    let position = pos[previousDelimiterIndex]
                    stroke(0, 0, 100)
                    fill(0, 0, 100)
                    // let roundedWPM = str(round(wpm))
                    // text(round(wpm), position.x, position.y-textAscent()-textDescent()-20)
                    // textSize(30)
                    // stroke(0, 0, 0)
                    // for the stars, just draw a number of stars based on
                    // the wpm. the next redo will make it so that it has bounds
                    // for the number of stars depending on the difficulty of
                    // the word. This probably requires a dictionary. After
                    // that, we can assign values for bad, ok, good, great,
                    // amazing, wow!, Wow!!, and WOW!!!

                    let roundedWPM
                    let image_star_indices = []
                    // image(this.star, 0, 0)

                    // bad should be 20wpm
                    if (wpm < 20) {
                        roundedWPM = str(round(wpm)) + ' bad'
                    }

                    // ok should be 50wpm
                    else if (wpm < 50) {
                        roundedWPM = str(round(wpm)) + ' ok'
                    }
                    // good should be 60wpm
                    else if (wpm < 60) {
                        roundedWPM = str(round(wpm)) + ' good!'
                    }
                    // great should be 70wpm
                    else if (wpm < 70) {
                        roundedWPM = str(round(wpm)) + ' great!'
                    }
                    // amazing should be 80wpm
                    else if (wpm < 80) {
                        roundedWPM = str(round(wpm)) + ' awesome!'
                    }
                    // one star should be 90wpm, also wow!
                    else if (wpm < 90) {
                        roundedWPM = str(round(wpm)) + '   wow!'
                        image_star_indices = [str(round(wpm)).length + 2]

                    }
                    // two stars should be 100wpm, also Wow!!
                    else if (wpm < 100) {
                        roundedWPM = str(round(wpm)) + '    Wow!!'
                        image_star_indices = [str(round(wpm)).length + 2, str(round(wpm)).length + 2]
                    }
                    // three stars should be above 100wpm, also WOW!!!
                    else {
                        roundedWPM = str(round(wpm)) + '     WOW!!!'
                        image_star_indices = [str(round(wpm)).length + 2, str(round(wpm)).length + 2, str(round(wpm)).length + 2]
                    }
                    // now we can make our text!
                    text(roundedWPM, position.x, position.y - textAscent() - textDescent() - 25)
                    for (let star_index of image_star_indices) {
                        image(this.star, position.x + textWidth(' ') * star_index, position.y - 31 - textAscent() - textDescent())
                    }
                    textSize(30)
                    stroke(0, 0, 0)
                    // now we can increment our space timestamp index
                    spaceTimestampIndex++
                }
            }
        }
        // console.log(pos)


        // let's do our highlight bars!
        let alreadyPassedPassage = this.text.substring(0, this.index)
        let restOfPassage = this.text.substring(this.index)
        // find the previous delimiter index
        let previousDelimiterIndex = -1
        for (let i = 0; i < alreadyPassedPassage.length; i++) {
            if (this.text[i] === ' ') {
                previousDelimiterIndex = i
            }
        }
        // find the next delimiter index
        let nextDelimiterIndex = restOfPassage.indexOf(' ') + this.index
        // console.log(previousDelimiterIndex)
        // console.log(nextDelimiterIndex)
        // find the positions using the position list
        let previousDelimiterIndexPos = pos[previousDelimiterIndex + 1]
        let nextDelimiterIndexPos = pos[nextDelimiterIndex]

        // let's draw at least the line above
        stroke(0, 0, 100)
        strokeWeight(2)
        line(previousDelimiterIndexPos.x, previousDelimiterIndexPos.y - 6 - textAscent(),
            nextDelimiterIndexPos.x, nextDelimiterIndexPos.y - 6 - textAscent())
        // console.log(previousDelimiterIndexPos.x)
        // console.log(previousDelimiterIndexPos.y-6-textAscent())
        // console.log(nextDelimiterIndexPos.x)
        // console.log(nextDelimiterIndexPos.y-6-textAscent())
        // now we can draw the sides

        stroke(0, 0, 0)
        strokeWeight(1)
        // let's do our cursor!
        // find the position of the character we're on, then find text width
        // of current character
        let char_pos = pos[this.index]
        let text_width = textWidth(this.text[this.index])
        rect(char_pos.x, char_pos.y + 6, text_width, -3)
        // let's find our WPM!
        // wait, there's a whole other function called seconds that
        // we can use to find the seconds! Sadly, it just is the
        // simple second with no decimal.
        let ms = millis()
        // text(round(ms), 0, height)
        // then seconds
        let s = ms/1000
        // text(s, 0, height)
        // then minutes
        let m = s/60
        // text(m, 0, height)
        // then find words using number of characters divided by 5
        let w = this.index/5
        // text(w, 0, height)
        // then takes words over minutes to find words per minute
        let wpm = w/m
        text(round(wpm), width-textWidth(str(round(wpm))), height)
        // so what about saving timestamps for every space that we type?

        // if our current character is a space or this is the first character...
        if (this.text[this.index] === ' ') {
            // otherwise, we can find the last space timestamp.
            // if the second element of the last space timestamp is our
            // current index, just don't go through this loop, otherwise do.
            let lastTimestamp = this.spaceTimestamps[this.spaceTimestamps.length - 1]
            if (lastTimestamp[1] !== this.index){
                // we can save a space timestamp with a list with the first
                // element being the number of milliseconds and the second
                // one being the index
                this.spaceTimestamps.push([round(millis()), this.index])
            }
        }
        if (this.index === 0) {
            // console.log(this.spaceTimestamps.length)
            if (this.spaceTimestamps.length === 0) {
                this.spaceTimestamps.push([round(millis()), this.index])
            }
        }
        // below is for testing
        fill(0, 0, 100)
        textSize(10)
        text(this.spaceTimestamps, 0, height-20)
        textSize(30)
        // console.log(this.spaceTimestamps)
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
