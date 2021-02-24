/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}
//overwrite style
addStyle(`

	:root{
		--theme-main-color: goldenrod!important;
		--theme-secondary-color: gold!important;
	}

	//black body
	html, body, div.item-container{
		background-color: black!important;
	}
	
	//logo textcolor
	#pr0gramm-logo-type{
		fill: dimgray!important;
	}
	//logo
	#pr0gramm-logo-background{
		fill: gold!important;
	}
	//logo inside
	#pr0gramm-logo-sign{
		fill: black!important;
	}
	//this is nice usercolor
	.um9:after {
    	color: goldenrod!important;
	}
	//black thumbs
	a.thumb{
		background: black!important;
	}
`.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, ""));
//admin
p.user.admin = 1

//fuck the old theme
document.querySelector("body").setAttribute("class", document.querySelector("body").getAttribute("class").replace("theme-", "theme-custom "))

{
    function wordWrap(str, maxWidth) {
        var newLineStr = "\n";
        done = false;
        res = '';
        while (str.length > maxWidth) {
            found = false;
            // Inserts new line at first whitespace of the line
            for (i = maxWidth - 1; i >= 0; i--) {
                if (testWhite(str.charAt(i))) {
                    res = res + [str.slice(0, i), newLineStr].join('');
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
            // Inserts new line at maxWidth position, the word is too long to wrap
            if (!found) {
                res += [str.slice(0, maxWidth), newLineStr].join('');
                str = str.slice(maxWidth);
            }

        }

        return res + str;
    }

    function testWhite(x) {
        var white = new RegExp(/^\s$/);
        return white.test(x.charAt(0));
    };

    const signature = function(e) {

        const el = e.target;

        //only target buttons
        if (!el.tagName || el.tagName.toLowerCase() == "button") return;

        if (e.target.defaultValue === "Abschicken") {

            let box = el.parentElement.previousElementSibling.previousElementSibling;

            //normal comments
            if (!(box.tagName && box.tagName.toLowerCase() == "textarea"))
                box = box.previousElementSibling

            const sig = "ⓚ";

            //const KedValue = box.value.replace(/k/, "ⓚ").replace(/K/, "Ⓚ");
            const isPM = location.href.includes("/inbox/messages");

            //sig not there yet
            if (!isPM && !box.value.includes(sig)) {
                setTimeout(_ => {
                    //prevent sig-only posts
                    if (box.value.length > 0) {

                        //fill comment
                        box.value = `${sig}\r\n${box.value}`
                        //click btn
                        setTimeout(el.click());
                    } else alert("warning: empty");
                })
                el.disabled = true;
                e.preventDefault();
            }

            el.disabled = false;
        }
    }

    //bind it boi
    document.addEventListener("click", signature);
}

//fix mobile vid not draggable
setInterval(_ => {
    document.querySelector("video") && [document.querySelector("video").removeAttribute("draggable")]
}, 5999);

//short comments
setInterval(_ => {
    document.querySelector('textarea[minlength="3"]') && [document.querySelector('textarea[minlength="3"]').setAttribute("minlength", 1)]
}, 5999);
