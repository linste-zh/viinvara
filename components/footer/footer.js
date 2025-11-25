document.addEventListener("DOMContentLoaded", loadFooter)

async function loadFooter(){
    const footer = document.getElementById("footer")
    footer.innerHTML = await fetchHtmlAsText("./components/footer/footer.html")
    addEventListeners()
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}

function openCitationBox(){
    let background = document.createElement('div');
    background.id = 'backgroundCover';
    background.className = 'backgroundCover';
    document.getElementsByTagName('body')[0].appendChild(background);

    let citeBox = document.createElement('div');
    citeBox.id = 'citeBox';
    citeBox.className = 'citationBox';

    citeBox.innerHTML=`
    <div class='header'> 
        <span class="title">Citations (APA 7)</span>
        <button class='closeButton' id='closeCiteButton'> &#9747; </button> 
    </div> 
    <div class='text'>
        <b>Cite as:</b></br>
        <div class="citation">Steiner, Linda. (2025). <i>Vinvara</i> (Version 4.0) [Computer software]. GitHub. <a href='https://linste-zh.github.io/vinvara/' target="_blank">https://linste-zh.github.io/vinvara/</a></div>
        <hr>
        <b>Cited by:</b>
        <div class="citation"></div>
    </div>`
    background.appendChild(citeBox);
    document.getElementById("closeCiteButton").addEventListener("click", closeCiteBox)
}

function closeCiteBox(){
    document.getElementById("backgroundCover").remove()
}

function addEventListeners(){
    document.getElementById("citeLink").addEventListener("click", openCitationBox)
}