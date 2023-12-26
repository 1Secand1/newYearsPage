colorPassword("christmas-toy", ["#ff0000", "#ffb90f", "#007fff"], {
  christmasToy1: "#ff0000",
  christmasToy2: "#ff0000",
  christmasToy3: "#ff0000",
});

function colorPassword(
  classPasswordElements,
  colorVariations,
  passwordSettings
) {
  const christmasToys = document.querySelectorAll("." + classPasswordElements);

  let colorPasswordIsCorrect = colorPasswordVerification(passwordSettings);

  let onGarland = function () {
    if (!colorPasswordIsCorrect()) return;

    // убрать обработчик события

    christmasToys.forEach((element) => {
      element.classList.add("active");
    });
  };

  christmasToys.forEach((element) => {
    element.addEventListener(
      "click",
      createColorSwitch(element, colorVariations)
    );

    element.addEventListener("click", onGarland);
  });
}

//Utilities

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
