// Event handler for image zoom behavior. On click a modal will display a full res version of the image.
function imageZoom(e) {
    e.preventDefault();

    // get the image in the clicked frame
    const img = this.querySelector("img");
    // get the clicked image source and alt
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");

    // create the frame for the image in the modal
    const frame = document.createElement("div");
    frame.classList.add("frame");

    // create the image to be placed in the frame
    const image = document.createElement("img");
    image.classList.add("object-fit:scale-down");
    image.setAttribute("src", src);
    image.setAttribute("alt", alt);

    //attach the image to the frame
    frame.appendChild(image);

    // get a reference to the modal in the page
    const modal = document.querySelector(".modal");

    // attach the frame to the image container and show the modal
    modal.querySelector(".image-container").appendChild(frame);
    modal.classList.toggle("display:none");
}

// Event handler that closes the modal on the page and removes it's content.
function closeModal(e) {
    e.preventDefault();

    // get a reference to the modal
    const modal = document.querySelector(".modal");
    const imgContainer = modal.querySelector(".image-container");

    // remove the image currently in the modal
    imgContainer.removeChild(imgContainer.lastChild);

    // hide the modal
    modal.classList.toggle("display:none");
}

//function that checks whether arr1 is a subarray of arr2
function isSubArray(arr1, arr2) {
    if(arr1.length > arr2.length) {
        return false;
    }
    for(let elt of arr1) {
        if(!arr2.includes(elt)) {
            return false;
        }
    }
    return true;
}

function filterByTagList(tagsList) {
    const cards = document.querySelectorAll(".card");
    if(tagsList.length === 0) {
        for(const card of cards) {
            card.parentElement.classList.remove("display:none")
        }
    } else {
        for(const card of cards) {
            const cardTags = card.getAttribute("data-tags").split(" ");
            (isSubArray(tagsList, cardTags)) ? card.parentElement.classList.remove("display:none") : card.parentElement.classList.add("display:none");
        }
    }
}

// Get all images in the current page and add zoom event handler
const images = document.querySelectorAll(".frame.zoom");
for(let image of images) {
    image.addEventListener("click", imageZoom);
}

//let the modal and x icon close the modal if it's open
const modal = document.querySelector(".modal");
const xIcon = modal.querySelector(".close");
modal.addEventListener("click", closeModal);
xIcon.addEventListener("click", closeModal);

const activeFilters = [];
const filters = document.querySelectorAll(".filter");

for (const filter of filters) {
    filter.addEventListener("click", function(e) {
        e.preventDefault();
        if(this.classList.contains("active")) {
            this.classList.remove("active");
            activeFilters.splice(activeFilters.indexOf(this.getAttribute("data-filter").toLowerCase()), 1);
        } else {
            this.classList.add("active");
            activeFilters.push(this.getAttribute("data-filter").toLowerCase());
        }

        filterByTagList(activeFilters);
    });
}

let scrollY = window.pageYOffset;
let currScrollY;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function() {    
    currScrollY = window.pageYOffset;
    if(currScrollY > 300) {
        navbar.style["boxShadow"] = "0 2px 6px #3209400F"
    } else {
        navbar.style["boxShadow"] = "none";
    }
    (scrollY > currScrollY) ? navbar.style.top = "0" : navbar.style.top = "-150px";
    scrollY = currScrollY;
});

