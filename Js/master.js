function handelActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
  // console.log("not null")
  document.documentElement.style.setProperty("--main--color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color == mainColor) {
      element.classList.add("active");
    }
  });
}

document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

const color = document.querySelectorAll(".colors-list li");
color.forEach((li) => {
  // console.log(li)
  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);

    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);

    handelActive(e);
  });
});

let page = document.querySelector(".landing-page");
let arr = [
  "../image/contactbg.png",
  "../image/pro.jpeg",
  "../image/pro2.jpeg",
  "../image/pro3.jpeg",
  "../image/pro4.jpeg",
];
let backgroundOption = true;
let theBackground;
let random_background = document.querySelectorAll(".random-background");

let backgroundlocal = localStorage.getItem("background");

if (backgroundlocal != null) {
  // console.log('asd')
  if (backgroundlocal === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-background").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundlocal === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

function runBackground() {
  if (backgroundOption === true) {
    theBackground = setInterval(() => {
      let random = Math.floor(Math.random() * arr.length);
      // console.log(random)
      page.style.backgroundImage = `url(${arr[random]})`;
    }, 1000);
  }
}

// runBackground()

random_background.forEach((element) => {
  // console.log(element)
  element.addEventListener("click", function (e) {
    handelActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      // console.log(backgroundOption)
      runBackground();
      localStorage.setItem("background", true);
    } else {
      backgroundOption = false;
      clearInterval(theBackground);
      // console.log(backgroundOption)
      localStorage.setItem("background", false);
    }
  });
});

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsTop = ourSkills.offsetTop;

  let skillsOuter = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowscroll = this.pageYOffset;
  // this.console.log(windowscroll)

  if (windowscroll > skillsTop + skillsOuter - windowHeight) {
    let skill_property = document.querySelectorAll(".skill-property span");
    skill_property.forEach((element) => {
      element.style.width = element.dataset.progress;
      // element.style.width="100%"
      // element.style.backgroundColor="red"
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((element) => {
  element.addEventListener("click", function (e) {
    let overlay = document.createElement("div");
    overlay.classList.add("over-lay"); //
    document.body.appendChild(overlay);

    let popup = document.createElement("div");
    popup.classList.add("popup");

    let image = document.createElement("img");
    // console.log(element.src)
    image.src = element.src;

    popup.appendChild(image);

    document.body.appendChild(popup);

    if (element.alt !== null) {
      let heading = document.createElement("h2");
      let text = document.createTextNode(element.alt);
      heading.appendChild(text);
      popup.insertBefore(heading, image);
    }

    let close = document.createElement("span");
    let closeButton = document.createTextNode("X");
    close.appendChild(closeButton);
    close.classList.add("close-buttone");
    popup.appendChild(close);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-buttone") {
    e.target.parentNode.remove();

    document.querySelector(".over-lay").remove();
  }
});

let bullet = document.querySelectorAll(".nav-bullet .bullet");
let allLinks = document.querySelectorAll(".links li a");
function scroll(element) {
  element.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scroll(bullet);
scroll(allLinks);

let savelocal = localStorage.getItem("Bullets-option");
let bulletSpan = document.querySelectorAll(".Bullets-option span");
let bulletContainer = document.querySelector(".nav-bullet");
if (savelocal !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (savelocal == "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".Bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".Bullets-option .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display == "yes") {
      bulletContainer.style.display = "block";
      localStorage.setItem("Bullets-option", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("Bullets-option", "none");
    }
    handelActive(e);
  });
});

document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear()
  localStorage.removeItem("Bullets-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background");
  window.location.reload();
};

let emial = document.getElementById("emial");
let textarea = document.getElementById("textarea");
let phone = document.getElementById("phone");
let span = document.getElementById("span-email");
let span_textArea = document.getElementById("span-textArea");
let span_phone = document.getElementById("span-phone");

emial.addEventListener("keyup", () => {
  if (emial.value.match(/@/) && emial.value.match(/\./)) {
    span.innerHTML = "Valid Email";
    span.style.color = "#00ff00";
  } else {
    span.innerHTML = "Not Valid Email";
    span.style.color = "red";
  }
});

emial.addEventListener("blur", () => {
  span.style.display = "none";
});
emial.addEventListener("focus", () => {
  span.style.display = "block";
});

textarea.addEventListener("keyup", () => {
  if (textarea.value.match(/^.{30,300}$/)) {
    span_textArea.innerHTML = "Valid TextArea";
    span_textArea.style.color = "#00ff00";
  } else {
    span_textArea.innerHTML = "You Must enter letter from 30 to 300";
    span_textArea.style.color = "red";
  }
});
textarea.addEventListener("blur", () => {
  span_textArea.style.display = "none";
});
textarea.addEventListener("focus", () => {
  span_textArea.style.display = "block";
});

phone.addEventListener("keyup", () => {
  if (phone.value.match(/^(010|011|012|015)\d{8}$/)) {
    span_phone.innerHTML = "Valid Phone number";
    span_phone.style.color = "#00ff00";
  } else {
    span_phone.innerHTML =
      "your Phone Number must be like this [011,012,015,010]";
    span_phone.style.color = "red";
  }
});
phone.addEventListener("blur", () => {
  span_phone.style.display = "none";
});
phone.addEventListener("focus", () => {
  span_phone.style.display = "block";
});

let before_toggle = document.querySelector(".header-area .toggle-menu::before");

let toggle_menu = document.querySelector(".header-area .toggle-menu");

let links = document.querySelector(".header-area .links");

toggle_menu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("active");
  links.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggle_menu && e.target !== links) {
    if (links.classList.contains("open")) {
      // links.classList.remove("open")
      toggle_menu.classList.toggle("active");
      links.classList.toggle("open");
    }
  }
});

links.onclick = function (e) {
  e.stopPropagation();
};
