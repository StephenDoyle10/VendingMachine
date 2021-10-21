let totalNumberOfCoke = 0;
let totalNumberOfTango = 0;
let totalNumberOfWater = 0;
let totalRequired = 0;

let totalOffered = 0;

let totalNumberOf1p = 0;
let totalNumberOf5p = 0;
let totalNumberOf10p = 0;
let totalNumberOf20p = 0;
let totalNumberOf50p = 0;

let excess = 0;

//reusuable function, for reseting values if order is submitted or cancelled
resetOrder = () => {
  totalNumberOfCoke = 0;
  totalNumberOfTango = 0;
  totalNumberOfWater = 0;
  totalRequired = 0;
};

//reusuable function, for reseting values if order is submitted or cancelled
resetAllGlobalVariablesToZero = () => {
  resetOrder();
  totalOffered = 0;
  totalNumberOf1p = 0;
  totalNumberOf5p = 0;
  totalNumberOf10p = 0;
  totalNumberOf20p = 0;
  totalNumberOf50p = 0;
  excess = 0;
};

//reusuable function, if user wants to reset everything and start again
resetVariablesAndHtml = () => {
  resetAllGlobalVariablesToZero();
  document.getElementById("thankYou").innerHTML = "";
  document.getElementById("change").innerHTML = "";
  document.getElementById("orderCancelled").innerHTML = "";
  document.getElementById("refundText").innerHTML = "";
  document.getElementById("totalRequired").innerHTML = "0";
  document.getElementById("totalOffered").innerHTML = "0";
};

//reusable function: This function and it's 'if statement' ensures that if the total required is greater than the total number of coins that have been inserted, then the 'buy' button will be disabled (because if the customer hasn't inserted enough coins they should not be able to select 'buy'), also the total amount of coins will be displayed in red, indicating to the customer that they have not yet inserted enough. Once the total amount of coins inserted is greater than the total required, the total amount of coins inserted will be in green, and the 'buy' button will be enabled.

buyButtonDisable = () => {
  if (totalRequired > totalOffered) {
    document.getElementById("totalOffered").style.color = "red";
    document.getElementById("totalOffered").style.borderColor = "red";
    document.getElementById("purchase").disabled = true;
  }
  //the following condition means no drinks have been selected, so the buy button is disabled
  else if (totalRequired == 0) {
    document.getElementById("totalOffered").style.color = "green";
    document.getElementById("totalOffered").style.borderColor = "green";
    document.getElementById("purchase").disabled = true;
  } else {
    document.getElementById("totalOffered").style.color = "green";
    document.getElementById("totalOffered").style.borderColor = "green";
    document.getElementById("purchase").disabled = false;
  }
};

//reusuable function: necessary so that when amount goes over 100p it converts into pounds. So, for example, 120p becomes £1.20.
convertToPound = (x, y) => {
  if (y < 100) {
    document.getElementById(x).innerHTML = y + "p";
  } else {
    const dividedBy100 = y / 100;
    document.getElementById(x).innerHTML = "£" + dividedBy100.toFixed(2);
  }
};

addBeverage = (costOfBeverage) => {
  totalRequired = totalRequired + costOfBeverage;
  convertToPound("totalRequired", totalRequired);
  buyButtonDisable();
  if (costOfBeverage == 55) {
    totalNumberOfCoke += 1;
  } else if (costOfBeverage == 35) {
    totalNumberOfTango += 1;
  } else if (costOfBeverage == 45) {
    totalNumberOfWater += 1;
  }
};

reset = () => {
  resetOrder();
  document.getElementById("totalRequired").innerHTML = 0;
  buyButtonDisable();
};

calculateTotalOfCoinsInserted = (c) => {
  totalOffered = totalOffered + c;
  convertToPound("totalOffered", totalOffered);
  buyButtonDisable();
};

cancelOrder = () => {
  const refundAmount = totalOffered;
  document.getElementById("totalOffered").innerHTML = "0";
  totalOffered = 0;
  convertToPound("orderCancelled", refundAmount);
  document.getElementById("refundText").innerHTML = " returned to customer";
  buyButtonDisable();
};

purchase = () => {
  excess = totalOffered - totalRequired;
  if (excess >= 50) {
    const x = excess / 50;
    totalNumberOf50p = Math.floor(x);
    excess = excess - totalNumberOf50p * 50;
  }
  if (excess >= 20) {
    const x = excess / 20;
    totalNumberOf20p = Math.floor(x);
    excess = excess - totalNumberOf20p * 20;
  }
  if (excess >= 10) {
    const x = excess / 10;
    totalNumberOf10p = Math.floor(x);
    excess = excess - totalNumberOf10p * 10;
  }
  if (excess >= 5) {
    const x = excess / 5;
    totalNumberOf5p = Math.floor(x);
    excess = excess - totalNumberOf5p * 5;
  }
  if (excess >= 1) {
    const x = excess / 1;
    totalNumberOf1p = Math.floor(x);
    excess = excess - totalNumberOf1p * 1;
  }

  document.getElementById("totalOffered").innerHTML = "0";
  document.getElementById("totalRequired").innerHTML = "0";

  document.getElementById("thankYou").innerHTML =
    "Collect your order: " +
    totalNumberOfCoke +
    " x Coke, " +
    totalNumberOfTango +
    " x Tango, and " +
    totalNumberOfWater +
    " x water. Enjoy!";

  if (totalOffered == totalRequired) {
    document.getElementById("change").innerHTML =
      "Exact amount required given. No change to collect.";
  } else {
    document.getElementById("change").innerHTML =
      "Don't forget to take your change: " +
      totalNumberOf50p +
      " x 50p, " +
      totalNumberOf20p +
      " x 20p, " +
      totalNumberOf10p +
      " x 10p, " +
      totalNumberOf5p +
      " x 5p, and " +
      totalNumberOf1p +
      " x 1p.";
  }

  resetAllGlobalVariablesToZero();
};

