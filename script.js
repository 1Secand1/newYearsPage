const red = "#ff0000";
const blue = "#001C7C";
const purple = "#7B5BA3";
const silver = "#BF9E7B";
const green = "#008000";

colorPassword("christmas-toy", {
  christmasToy2: silver,
  christmasToy6: blue,
  christmasToy11: red,
  christmasToy8: red,
  christmasToy4: silver,
  christmasToy9: red,
  christmasToy5: blue,
  christmasToy10: red,
  christmasToy1: purple,
  christmasToy12: green,
  christmasToy3: red,
  christmasToy7: blue,
});

countdownToTheNewYear("days", "hour");

textOptions();

helpMessage();

//_______________Utilities________________

function colorPassword(classPasswordElements, passwordSettings) {
  const colorVariations = [...new Set(Object.values(passwordSettings))];
  const christmasToys = document.querySelectorAll("." + classPasswordElements);
  const colorPasswordIsCorrect = colorPasswordVerification(passwordSettings);

  const onGarland = function () {
    if (!colorPasswordIsCorrect()) return;

    modalWindowSwitch();

    christmasToys.forEach((element) => {
      element.classList.add("active");
    });
  };
  onGarland();

  christmasToys.forEach((element) => {
    element.style.fill =
      colorVariations[randomValue(0, colorVariations.length - 1)];
  });

  christmasToys.forEach((element) => {
    element.addEventListener(
      "click",
      createColorSwitch(element, colorVariations)
    );

    element.addEventListener("click", onGarland);
  });
}

function colorPasswordVerification(passwordSettings) {
  const idElementArray = Object.keys(passwordSettings);
  const colorArray = Object.values(passwordSettings);

  let colorPasswordIsCorrect = true;

  const elementArray = idElementArray.map((id) => {
    return (element = document.getElementById(id));
  });

  return () => {
    const allColorsCorrect = elementArray.every((element, index) => {
      const elementColor = rgbStringToHex(element.style.fill).toLowerCase();
      const correctColor = colorArray[index].toLowerCase();
      return elementColor === correctColor;
    });

    if (!allColorsCorrect) {
      return false;
    }
    return colorPasswordIsCorrect;
  };
}

function countdownToTheNewYear(idElementDay, idElementHour) {
  const deadline = new Date("2024", "00", "01").getTime();

  function setTame() {
    const currentDate = new Date().getTime();
    const timeLeft = deadline - currentDate;
    const days = Math.max(Math.floor(timeLeft / (1000 * 60 * 60 * 24)), 0);
    const hours = Math.max(
      Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      0
    );

    const elementDay = document.getElementById(idElementDay);
    const elementHour = document.getElementById(idElementHour);

    if (days > 0) {
      elementDay.innerText = `${days} ${getCorrectNounForm(days, [
        "день",
        "дня",
        "дней",
      ])} и`;
    } else {
      elementDay.style.display = "none";
    }

    if (hours > 0) {
      elementHour.innerText = `${hours} ${getCorrectNounForm(hours, [
        "час",
        "часа",
        "часов",
      ])}`;
    } else {
      elementHour.innerText = `уже почти наступил`;
    }
  }

  function getCorrectNounForm(number, forms) {
    if (number % 100 > 10 && number % 100 < 15) return forms[2];
    if (number % 10 === 1) return forms[0];
    if (number % 10 > 1 && number % 10 < 5) return forms[1];
    return forms[2];
  }

  function getCorrectNounForm(number, forms) {
    if (number % 100 > 10 && number % 100 < 15) {
      return forms[2];
    }
    if (number % 10 === 1) {
      return forms[0];
    }
    if (number % 10 > 1 && number % 10 < 5) {
      return forms[1];
    }
    return forms[2];
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
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLocaleLowerCase();
  } else {
    return "Invalid RGB string";
  }
}

function modalWindowSwitch() {
  const element = document.getElementById("modalWindow");
  element.classList.toggle("active");
}

function devtoolsBloc() {
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

  // devtoolschange(rickroll);
}

function devtoolschange(сallback) {
  setInterval(function () {
    let widthThreshold = window.outerWidth - window.innerWidth > 160;
    let heightThreshold = window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {
      сallback();
    }
  }, 1000);
}

function textOptions() {
  const deadline = new Date("2024", "00", "01").getTime();
  const currentDate = new Date().getTime();

  const timeLeft = deadline - currentDate;

  if (timeLeft <= 0) {
    document.getElementById("titleText").innerText = `Новый год уже насупил`;
    document.getElementById("modalWindowText").innerText = ``;
  }
}

function helpMessage() {
  return setTimeout(() => {
    const element = document.querySelector(".christmas-toy");

    if (!element.classList.contains("active")) {
      alert("Подсказка - внимательно присмотрись к фотографии");
    } else {
      console.log(5);
    }
  }, 100 * 10 * 60 * 4);
}

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

devtoolsBloc();
