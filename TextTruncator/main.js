$("div").data("text", `The game has changed. The word is out. And you... are a killer. Apparently it's all over town. Somebody crossed you, you got angry, you crushed their skull with an ATM machine. Who cares! Just as long as it's our competitors who believe it and not the police. 

Don't you see how great this is? You, you are a... Jesse look at me. You... are a blowfish. A blowfish! Think about it. Small in stature, not swift, not cunning. Easy prey for predators but the blowfish has a secret weapon doesn't he. Doesn't he? What does the blowfish do, Jesse. What does the blowfish do? The blowfish puffs up, okay? 

The blowfish puffs himself up four, five times larger than normal and why? Why does he do that? So that it makes him intimidating, that's why. Intimidating! So that the other, scarier fish are scared off. And that's you! You are a blowfish. You see it's just all an illusion. You see it's... it's nothing but air. Now... who messes with the blowfish, Jesse? You're damn right. You are a blowfish. Say it again. Say it like you mean it. You're a BLOWFISH! 

My partner was about to get himself shot. I intervened. He was angry because those two dealers of yours had just murdered an eleven year-old boy. Then again, maybe he thought it was you who gave the order.`)

function outerHeight(element) { return $(element).outerHeight(); }
function outerWidth(element) { return $(element).outerWidth();  }
function innerHeight(element) { return $(element).innerHeight(); }
function innerWidth(element) { return $(element).innerWidth(); }

function TruncateText(element, lines) {
	//Add a period, get the element's inner height, and remove it.  If the height changes, this is the height of a line.
	$(element).text(".")
	var innerHeightWithPeriod = innerHeight(element)
	$(element).text("")
	
	var numberOfLines = () => {
		var currentInnerHeight = innerHeight(element)
		//console.log(currentInnerHeight, innerHeightWithPeriod)
		//console.log("Number of lines:", currentInnerHeight / innerHeightWithPeriod)
		return Math.round(currentInnerHeight / innerHeightWithPeriod)
	}

	var firstNWords = (n) => {
		var text = $(element).data("text")
		var words = 0
		for (let i = 0; i < text.length; i++) {
			if (text[i]==" " && text[i-1]!=" ") {
				words++
			}
			if (words === n) {
				return (text.substr(0, i))
			}
		}
		return text
	}

	//Keep adding words until the element height is the line height of the first line plus the line height of all subsequent lines times the number of lines, then remove one word.
	var prevText, text
	var numWords = $(element).data("text").split(/\s+/).length

	for (let i = 1; i <= numWords; i++) {
		prevText = $(element).html().length ? $(element).html() : ""
		text = firstNWords(i)

		if (i < numWords) { text += "&#8230;" }
		$(element).html(text)

		//If the new number of lines is greater than the requested number of lines
		//append the previous text and break out of the loop.
		if (numberOfLines() > lines) {
			$(element).html(prevText)
			break
		}
	}
}

$(document).ready(() => { TruncateText("div", 6) })
$(window).resize(() => { TruncateText("div", 6) })