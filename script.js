/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

//initial admin on normal nav
p.user.admin = 1;

//overwrite style
addStyle(`
	//overwrite theme vars
	:root{
		--theme-main-color: goldenrod!important;
		--theme-secondary-color: gold!important;
	}

	//no admin items (log you out)
	#item-delete, .comment-delete, .comment-edit-link, #item-edit-tags{
		display: none!important;
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

//fuck the old theme
document.querySelector("body").setAttribute("class", document.querySelector("body").getAttribute("class").replace("theme-", "theme-custom "))

{ //sig logic
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

            const isPM = false// location.href.includes("/inbox/messages");
	    const fill = box.value.length<3;

            //sig not there yet
            if (!isPM && !box.value.includes(sig)) {
                setTimeout(_ => {
                    //prevent sig-only posts
                    if (box.value.length > 0) {

			if(fill){ //fill empty spaces
                        box.value = box.value + "‎".repeat(3-box.value.length);
			}
			else {
			//add sig
                        box.value = `${sig}\r\n${box.value}`;
			}
			    
                        //click btn
                        setTimeout(el.click());
                    } else alert("warning: empty");
                });
                //prevent premature submit, the submit is done when the sig is inserted in the next step
                el.disabled = true;
                e.preventDefault();
            }
            //ignore
            el.disabled = false;
        }
    }

    //bind it boi
    document.addEventListener("click", signature);
}

//see votes
setInterval(_ => {
    p.user.admin = 1;
}, 5999);

//fix mobile vid not draggable
setInterval(_ => {
    document.querySelector("video") && [document.querySelector("video").removeAttribute("draggable")]
}, 5999);

//short comments
setInterval(_ => {
    document.querySelector('textarea[minlength="3"]') && [document.querySelector('textarea[minlength="3"]').setAttribute("minlength", 1)]
}, 5999);
