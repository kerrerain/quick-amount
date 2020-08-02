const FORM_IDS = [
  "amount",
  "payee"
];

$("#add-amount").on("click", function() {
  form = {};

  FORM_IDS.forEach(function(id) {
    form[id] = $("#" + id).val()
  });

  $("#quicken-file-content").prepend(toQuicken(form));

  resetForm(FORM_IDS);
});

function toQuicken(form) {
  return "D" + new Date().toLocaleDateString("en-US") + "\nT" +
    form.amount + "\nPCARTE " + form.payee + "\n^\n";
}

function resetForm(ids) {
  // Reset every field of the form.
  ids.forEach(function(id) {
    $("#" + id).val("");
  });
  // Focus back to the first field of the form.
  $("#" + ids[0]).focus();
}

// ---- QUICK AMOUNT INPUT ----

$("input[data-type='quick-amount']").on({
  keyup: function() {
    let value = $(this).val();

    if (value && Number(value) !== 0) {
      /*
        We do not format the input when the user is fixing an invalid value.
      
        The value can be empty if there are trailing minuses.
        For example, 12-- is possible because minus is allowed by the browser
        in a number input, but it results in an empty value.

        If the value is not empty but equal to 0, the most likely is the user
        removing all the numbers with the return key, resulting in 0.00.
        Of the user reaches 0.00, we stop formatting the value to let him
        clear everything if he wants to.
      */
      $(this).val(formatAmountWithTwoDecimals(value));
    }
  },
  blur: function() {
    // Even if the user leaves an invalid value, format anyway to get 0.00 at least.
    $(this).val(formatAmountWithTwoDecimals($(this).val()));
  }
});

function formatAmountWithTwoDecimals(amount) {
  // Keep the negative sign before doing any formatting.
  let negativePart = /-/.test(amount) ? "-" : "";

  // Replace any character that is not a number
  // (ex: separators like . or , and minus -).
  amount = amount.replace(/[^0-9]/g, "");

  // Replace leading zeros.
  amount = amount.replace(/^0+/, "");

  // Pad 3 zeros left only if the number is too short.
  if (amount.length < 3) {
    amount = ("000" + amount).slice(-3);
  }

  let partInteger = amount.substr(0, amount.length - 2);
  let partDecimal = amount.substr(amount.length - 2, amount.length);

  return negativePart + partInteger + "." + partDecimal;
}