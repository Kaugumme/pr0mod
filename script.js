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

            const sigChar = "ⓚ";
	    const fillChar = "‎"

            const isPM = location.href.includes("/inbox/messages");
	    const fill = box.value.length<5;

            //sig not there yet
            if (!isPM && !box.value.includes(sigChar) && !box.value.includes(fillChar)) {
                setTimeout(_ => {
                    //prevent sig-only posts
                    if (box.value.length > 0) {

			if(fill){ //fill empty spaces
                        box.value = box.value + "‎".repeat(3-box.value.length);
			}
			else {
			//add sig
                        box.value = `${sigChar}\r\n${box.value}`;
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











/////////////////pr0no
{
    const filterSyntax = '! -Auto & -"mein Gemüse" & -"genau mein Gemüse" & -scat & -kaviar';
    const //script vars
        root = 'https://pr0gramm.com',
        Top = "top",
        New = "new",
        cleanNew = `${root}/${New}/${filterSyntax}`,
        cleanTop = `${root}/${Top}/${filterSyntax}`;
    //custom filter method
    const filter = arg => {
	  if(document.location.pathname.startsWith("/new") ||  document.location.pathname.startsWith("/top") ){
              document.title = "pr0>" + (document.location.pathname.startsWith("/new") ? "Neu" : "Beliebt")
          }
	 //reset search vars
            document.querySelector('[name="q"]').value="";
            document.getElementById("search-exclude-tags").value="";
        //initial filter mode
        if (arg.mode === 1) {
            //coming from new
            if (location.href !== cleanNew && (location.href === `${root}/${New}`)) {
                location.href = cleanNew;
            }
            //coming from initial (root) or top
            if (location.href !== cleanTop && (
                    location.href === `${root}/` || location.href === `${root}/${Top}`)) {
                location.href = cleanTop;

            }
        }
        //push filter mode
        if (arg.mode === 2) {
            let go = false;
            switch (arg.url) {
                case `/${New}`: //push to clean top
                    location.href = cleanNew;
                    break;
                case `/${Top}`: //push to clean new
                    location.href = cleanTop;
                    break;
            }
            return go;
        }
    }

    //filter initial call
    filter({
        mode: 1
    }); { //catch push crap
        var realPushState = history.pushState;
        history.pushState = function() {

            if (filter({ //ignore unfiltered pushies
                    mode: 2,
                    url: arguments[2]
                })) return void 0;
            //dun touch ( apply original push url)
            return realPushState.apply(history, arguments);
        };
    }
}
