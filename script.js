let project = document.querySelector(".Projects")
let container = project.querySelector(".container")
let sections = project.querySelectorAll(".section")
let first = project.querySelectorAll(".first")
let last = project.querySelectorAll(".last")
let headerProject = document.querySelector(".header_down")
let icons = headerProject.querySelectorAll("ion-icon")
let sheetUrl = "https://script.google.com/macros/s/AKfycbymRDKN3APiEjZCOA5u8UQwVuFZMeE62vGSciwmez5MyWgDlFNTGVjfGNVNTYNl-aq0/exec"



icons.forEach(icon => {
    icon.addEventListener("click", function () {
        sections.forEach(section => { section.classList.remove("active") });
        location.href = "#Projects"
        if (icon.name == "code-slash") {
            sections[0].classList.add("active")
            container.style.height = sections[0].clientHeight + "px"
        }
        else if (icon.name == "logo-octocat") {
            sections[1].classList.add("active")
            container.style.height = sections[1].clientHeight + "px"
        }
        else if (icon.name == "images") {
            sections[2].classList.add("active")
            container.style.height = sections[2].clientHeight + "px"
        }
        else if (icon.name == "videocam") {
            sections[3].classList.add("active")
            container.style.height = sections[3].clientHeight + "px"
        }
        else if (icon.name == "color-wand") {
            sections[4].classList.add("active")
            container.style.height = sections[4].clientHeight + "px"
        }
        else if (icon.name == "id-card") {
            sections[5].classList.add("active")
            container.style.height = sections[5].clientHeight + "px"
        }
    })
});

fetch(sheetUrl)
    .then((response) => response.json())
    .then((row) => Data(row))
function Data(row) {
    for (let i = 1; i < row.length; i++) {
        let colum = row[i];
        let element = `
                <div class="card" id="${colum[0]}">
                    <img src="${colum[3]}" alt="">
                    <div class="starts">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-half"></ion-icon>
                    </div>
                    <div class="reactive">
                        <a onclick="update_value(event)" class="fas fa-solid fa-thumbs-down"> ${colum[6]}</a>
                        <a onclick="update_value(event)" class="fas fa-solid fa-heart"> ${colum[5]}</a>
                        <a onclick="update_value(event)" class="fas fa-solid fa-thumbs-up"> ${colum[4]}</a>
                    </div>
                </div>`

        if (colum[1] === "Design-html") {
            first[0].innerHTML += element
        }
        else if (colum[1] === "Design-logo") {
            first[1].innerHTML += element
        }
        else if (colum[1] === "Design-image" && colum[2] === "first") {
            first[2].innerHTML += element
        }
        else if (colum[1] === "Design-image" && colum[2] === "last") {
            last[0].innerHTML += element
        }
        else if (colum[1] === "Design-video" && colum[2] === "first") {
            first[3].innerHTML += element
        }
        else if (colum[1] === "Design-video" && colum[2] === "last") {
            last[1].innerHTML += element
        }
        else if (colum[1] === "Design-graphic") {
            first[4].innerHTML += element
        }
        else if (colum[1] === "Design-cv") {
            last[2].innerHTML += element
        }
    }
    container.style.height = sections[0].clientHeight + "px"
}

function update_value(event) {
    let btn = event.target;
    let parent = btn.parentElement;
    let plus = parseFloat(btn.innerText) + 1
    let minus = parseFloat(btn.innerText) - 1
    if (parent.classList.contains("Done") == false) {
        btn.classList.add("active")
        parent.classList.add("Done")
        btn.innerText = " " + plus;
    }else if (btn.classList.contains("active") == false) {
        let a = parent.querySelector(".active");
        let minus2 = parseFloat(a.innerText) - 1
        btn.innerText = " " + plus;
        btn.classList.add("active")
        a.innerText = " " + minus2 ;
        a.classList.remove("active")
    }else {
        btn.innerText = " " + minus;
        btn.classList.remove("active")
        parent.classList.remove("Done")
    }
    let id = btn.parentElement.parentElement.id
    let like = parent.querySelectorAll("a")[2].innerText;
    let love = parent.querySelectorAll("a")[1].innerText;
    let dislike = parent.querySelectorAll("a")[0].innerText;

    let url = sheetUrl + "?&id=" + id + "&like=" + like + "&action=update" + "&love=" + love + "&dislike=" + dislike ;
    let request = jQuery.ajax({ crossDomain: true, url: url, method: "GET", dataType: "jsonp" });

}

