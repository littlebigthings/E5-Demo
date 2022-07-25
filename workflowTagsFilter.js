class WORKFLOWFILTER {
    constructor() {
        this.tagElements = document.querySelectorAll("[data-filter='tags']");
        this.filterElements = document.querySelectorAll("[data-filter='item']");
        this.clickedOnFilter = [];
        this.init()
    }

    init() {
        this.addSlugs();
        this.addListener();
    }

    addSlugs() {
        if (this.tagElements.length > 0 && this.filterElements.length > 0) {
            this.tagElements.forEach(item => {
                let text = item.textContent;
                let slugVal = this.convertToSlug(text);
                item.setAttribute('tag-name', slugVal)
            })

            this.filterElements.forEach(item => {
                let cardParent = item.closest(".w-dyn-item");
                let text = item.textContent;
                let slugVal = this.convertToSlug(text);
                cardParent.setAttribute('card-name', slugVal);
            })
        }
    }

    addListener() {
        if (this.tagElements.length > 0) {
            this.tagElements.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    let targetElm = e.currentTarget;
                    let tagName = targetElm.getAttribute("tag-name");
                    let isActive = targetElm.getAttribute("is-active");
                    let getCards = [];
                    if (tagName == 'all-') {
                        this.clickedOnFilter = [];
                        targetElm.setAttribute('is-active', true);
                        targetElm.classList.add("active-tag");
                        this.resetTags(targetElm)
                    }
                    else if (isActive == "false") {
                        targetElm.classList.add("active-tag")
                        targetElm.setAttribute("is-active", true);
                        this.clickedOnFilter.push(tagName);
                        if(this.tagElements[0].classList.contains("active-tag"))this.tagElements[0].classList.remove("active-tag");
                    }
                    else if (isActive == "true") {
                        targetElm.classList.remove("active-tag")
                        targetElm.setAttribute("is-active", false);
                        let idx = this.clickedOnFilter.indexOf(tagName)
                        this.clickedOnFilter.splice(idx, 1);
                    }

                    if (this.clickedOnFilter.length > 0) {
                        this.clickedOnFilter.forEach(filter => {
                            getCards.push(...document.querySelectorAll(`[card-name='${filter}']`));
                        })
                        this.showAndHideCard(getCards, false);
                    }
                    else {
                        this.tagElements[0].setAttribute("is-active", true)
                        this.tagElements[0].classList.add("active-tag");
                        this.showAndHideCard(getCards, true);
                    }
                })
            })
            // To activate default
            this.tagElements[0].click();
        }
    }

    convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }

    
    showAndHideCard(filteredCards, reset) {
        let allCards = document.querySelectorAll("[card-name]");
        allCards.forEach(card => {
            if (!reset) {
                if (filteredCards.includes(card)) {
                    card.style.display = 'block';
                }
                else {
                    card.style.display = 'none';
                }
            }
            else {
                card.style.display = 'block';
            }
        })
    }

    resetTags(tagElm) {
        this.tagElements.forEach(tag => {
            if (tag != tagElm && tag.classList.contains("active-tag")) {
                tag.classList.remove("active-tag");
                tag.setAttribute("is-active", false)
            }
        })
    }
}

new WORKFLOWFILTER;