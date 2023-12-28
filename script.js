const red = "#ff0000";
const blue = "#007fff";
const silver = "#c5c9c7";
const green = "#008000";

colorPassword("christmas-toy", [red, silver, blue, green], {
  christmasToy2: silver,
  christmasToy6: blue,
  christmasToy11: red,
  christmasToy8: red,
  christmasToy4: silver,
  christmasToy9: red,
  christmasToy5: blue,
  christmasToy10: red,
  christmasToy1: blue,
  christmasToy12: green,
  christmasToy3: red,
  christmasToy7: blue,
});

countdownToTheNewYear("days", "hour");

//_______________Utilities________________

function devtoolschange(сallback) {
  setInterval(function () {
    let widthThreshold = window.outerWidth - window.innerWidth > 160;
    let heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      сallback();
    }
  }, 1000);
}

function colorPassword(
  classPasswordElements,
  colorVariations,
  passwordSettings
) {
  const christmasToys = document.querySelectorAll("." + classPasswordElements);

  const colorPasswordIsCorrect = colorPasswordVerification(passwordSettings);

  const onGarland = function () {
    // let mysterySolved = localStorage.getItem?.("mysterySolved");

    if (!colorPasswordIsCorrect()) return;

    // localStorage.setItem("mysterySolved", " ");

    modalWindowSwitch();

    christmasToys.forEach((element) => {
      element.classList.add("active");
    });
  };
  onGarland();

  christmasToys.forEach((element) => {
    element.addEventListener(
      "click",
      createColorSwitch(element, colorVariations)
    );

    element.addEventListener("click", onGarland);
  });
}

function countdownToTheNewYear(idElementDay, tdElementHour) {
  const deadline = new Date("2024", "00", "01").getTime();

  function setTame() {
    const currentDate = new Date().getTime();

    const diff = deadline - currentDate;
    const days = diff > 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) : 0;
    const hours = Math.max(
      Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      0
    );

    let elementDay = document.getElementById(idElementDay);
    let elementHour = document.getElementById(tdElementHour);

    elementDay.innerText = days;
    elementHour.innerText = hours;
  }
  setTame();
  setInterval(setTame, 60000);
}

function createColorSwitch(element, colors) {
  let count = 0;

  return function () {
    element.style.fill = colors[count];

    count++;

    if (count === colors.length) {
      count = 0;
    }
  };
}

function colorPasswordVerification(passwordSettings) {
  const idElementArray = Object.keys(passwordSettings);
  const colorArray = Object.values(passwordSettings);

  let colorPasswordIsCorrect = true;

  const elementArray = idElementArray.map((id) => {
    return (element = document.getElementById(id));
  });

  return () => {
    for (let index = 0; index < idElementArray.length; index++) {
      const elementСolor = rgbStringToHex(elementArray[index].style.fill);
      const correctColor = colorArray[index];

      if (elementСolor !== correctColor) {
        return false;
      }
    }

    return colorPasswordIsCorrect;
  };
}

function rgbStringToHex(rgbString) {
  const regex = /rgb\((\d+), (\d+), (\d+)\)/;
  const matches = rgbString.match(regex);
  if (matches) {
    const r = parseInt(matches[1]);
    const g = parseInt(matches[2]);
    const b = parseInt(matches[3]);
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
  } else {
    return "Invalid RGB string";
  }
}

function modalWindowSwitch() {
  const element = document.getElementById("modalWindow");
  console.log(element);
  element.classList.toggle("active");
}

function devtoolsBan() {
  let rickroll = () => {
    let hrefElement = this.document.createElement("a");
    hrefElement.setAttribute(
      "href",
      "https://www.youtube.com/watch?v=lzTQCgpHAWE&ab_channel=músicosCínicos鯉"
    );
    hrefElement.click();
  };

  window.addEventListener("keydown", function (event) {
    if (event.key === "F12") {
      rickroll();
    }
  });
  window.addEventListener("keydown", function (event) {
    if (event.key === "I") {
      rickroll();
    }
  });

  window.addEventListener("contextmenu", rickroll);

  devtoolschange(rickroll);
}
// devtoolsBan();
