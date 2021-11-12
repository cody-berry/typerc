/*

 */

class Passage {
    constructor(text) {
        this.text = text
        this.index = 0 // where in the passage we're currently typing
        this.correctList = [] // booleans recording character correctness
    }


    render() {
        fill(0, 0, 100)

        // the bottom left corner of the current letter we are typing = cursor
        let leftMargin = 20
        let topMargin = 20

        /*  display the entire passage without text wrap
         */
        for (let i = 0; i < this.text.length; i++) {
            // save the position of the ith character. we'll need this later
            let c = this.text[i]

            /*  show the highlight box for correct vs incorrect after we type
             */


            /*  draw current letter above the highlight box in terms of z-index
             */
            // let's find the x position of our character
            let x = leftMargin + textWidth(' ')*i // our position is i spaces'
            let y = topMargin + textAscent() // our text coordinates are on
            // the bottom-left, not the top-left

            // and we can finally draw it!
            text(c, x, y)


            /*  modify cursor position to where the next letter should be
                each highlight box should be 1 pixel bigger on left and right
                1+1=2 total pixels of extra width
             */

            /*  let's do a simple word wrap, wrapping just by character!
             */


            // this is the horizontal coordinate where we must text wrap

            /*  if we're at a whitespace, determine if we need a new line:
                    find the next whitespace
                    the word between us and that whitespace is the next word
                    if the width of that word + our cursor + current space >
                     limit, then newline
             */
        }

        /*  add current word top highlight horizontal bar
         */
        // find index of next and previous whitespace chars

        // next delimiter index

        // previous delimiter index

        // +1 because we don't want the line to go over the previous
        // whitespace char



        /*  add cursor below current character
        */

        // TODO check if we're finished, otherwise we try to read [index+1]
        
    }


    getCurrentChar() {
    }


    // set the current char to correct
    setCorrect() {
      

        console.assert(this.correctList.length === this.index)
    }


    // set the current char to be incorrect
    setIncorrect() {

    }
}