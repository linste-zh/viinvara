document.addEventListener("DOMContentLoaded", loadFooter)

async function loadFooter(){
    header = document.getElementById("footer")
    footer.innerHTML = await fetchHtmlAsText("./components/footer/footer.html")
}

async function fetchHtmlAsText(url) {
    const response = await fetch(url);
    return await response.text();
}