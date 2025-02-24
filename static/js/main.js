// verify resend code
var minutes = 0;
var seconds = 60;

// var x = setInterval(function () {
//   if (seconds != 0) {
//     seconds--;
//   } else if (seconds == 0) {
//     minutes--;
//     seconds = 59;
//   }
//
//   document.getElementById("verify-code").innerHTML =
//     "ارسال مجدد کد بعد از " + "ثانیه " + seconds;
//   if (seconds == 0 && minutes == 0) {
//     clearInterval(x);
//     document.getElementById("block-verify-code").innerHTML =
//       "<a href='#'>ارسال مجدد</a>";
//   }
// }, 1000);

/////////////////////////////////////////////////////////add counter

jQuery(
  '<button class="quantity-nav quantity-button quantity-down inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button"><span class="sr-only">Quantity button</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/></svg></button>'
).insertAfter(".quantity input");
jQuery(
  '<button class="quantity-nav quantity-button quantity-up inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button"><span class="sr-only">Quantity button</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/></svg></button>'
).insertBefore(".quantity input");
jQuery(".quantity").each(function () {
  var spinner = jQuery(this),
    btnUp = spinner.find(".quantity-up"),
    input = spinner.find('input[type="number"]'),
    btnDown = spinner.find(".quantity-down"),
    min = input.attr("min"),
    max = input.attr("max");

  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });
});
/////////////////////////////////////////////////////
// show edit address alert
function showEditAlert() {
  document.getElementById("boxAddProduct").style.display = "block";
}
function closeBoxEditAddress() {
  document.getElementById("boxAddProduct").style.display = "none";
}
/////////////////////////////////////////////////////////
$(document).ready(function () {
  var inputs = $("#advantage-input, #disadvantage-input");
  var inputChangeCallback = function () {
    var self = $(this);
    if (self.val().trim().length > 0) {
      self.siblings(".js-icon-form-add").show();
    } else {
      self.siblings(".js-icon-form-add").hide();
    }
  };
  inputs.each(function () {
    inputChangeCallback.bind(this)();
    $(this).on("change keyup", inputChangeCallback.bind(this));
  });
  $("#advantages")
    .delegate(".js-icon-form-add", "click", function (e) {
      var parent = $(".js-advantages-list");
      if (parent.find(".js-advantage-item").length >= 5) {
        return;
      }
      var advantageInput = $("#advantage-input");
      if (advantageInput.val().trim().length > 0) {
        parent.append(
          '<div class="ui-dynamic-label ui-dynamic-label--positive js-advantage-item">\n' +
            advantageInput.val() +
            '<button type="button" class="ui-dynamic-label-remove js-icon-form-remove"></button>\n' +
            '<input type="hidden" name="comment[advantages][]" value="' +
            advantageInput.val() +
            '">\n' +
            "</div>"
        );
        advantageInput.val("").change();
        advantageInput.focus();
      }
    })
    .delegate(".js-icon-form-remove", "click", function (e) {
      $(this).parent(".js-advantage-item").remove();
    });
  $("#disadvantages")
    .delegate(".js-icon-form-add", "click", function (e) {
      var parent = $(".js-disadvantages-list");
      if (parent.find(".js-disadvantage-item").length >= 5) {
        return;
      }
      var disadvantageInput = $("#disadvantage-input");
      if (disadvantageInput.val().trim().length > 0) {
        parent.append(
          '<div class="ui-dynamic-label ui-dynamic-label--negative js-disadvantage-item">\n' +
            disadvantageInput.val() +
            '<button type="button" class="ui-dynamic-label-remove js-icon-form-remove"></button>\n' +
            '<input type="hidden" name="comment[disadvantages][]" value="' +
            disadvantageInput.val() +
            '">\n' +
            "</div>"
        );
        disadvantageInput.val("").change();
        disadvantageInput.focus();
      }
    })
    .delegate(".js-icon-form-remove", "click", function (e) {
      $(this).parent(".js-disadvantage-item").remove();
    });
});
//////////////////////////////////////////////Timer
document.addEventListener("DOMContentLoaded", () => {
  const clockdivs = document.querySelectorAll(".clockdiv");

  // Convert numbers to Persian digits
  const toPersianNumbers = (num) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return num.toString().padStart(2, '0').replace(/\d/g, (d) => persianDigits[d]);
  };

  // Update the countdown timer
  const updateCountdown = (el) => {
    const now = new Date(); // Use system clock for accuracy
    const expireTime = new Date(el.getAttribute("data-expired"));
    const distance = expireTime - now;

    if (distance <= 0) {
      el.innerHTML = "تخفیف به پایان رسید";
      return;
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the countdown elements
    el.innerHTML = `
      <span class="hours">${toPersianNumbers(hours)}</span>:
      <span class="minutes">${toPersianNumbers(minutes)}</span>:
      <span class="seconds">${toPersianNumbers(seconds)}</span>
    `;
  };

  // Initialize and start the countdown for each clockdiv
  const startCountdown = (el) => {
    const expireTime = new Date(el.getAttribute("data-expired"));
    const now = new Date();

    // If the countdown is already expired, show the message
    if (expireTime <= now) {
      el.innerHTML = "تخفیف به پایان رسید";
      return;
    }

    // Update countdown immediately and then every second
    updateCountdown(el);
    setInterval(() => updateCountdown(el), 1000);
  };

  // Start countdown for all elements
  clockdivs.forEach(startCountdown);
});
// blog comment section

function addParent(parentId){
  $('#comment-parent').val(parentId)
}
