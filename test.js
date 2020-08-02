function testToQuicken() {
  // Given
  element = {
    amount: "-30.00",
    payee: "Bill"
  }

  // When
  actual = toQuicken(element);

  // Then
  expected = "D" + new Date().toLocaleDateString("en-US") + "\nT-30.00\nPCARTE Bill\n^\n"

  if (actual !== expected) {
    console.log("Assertion failed: element=%s expected=%s actual=%s",
      JSON.stringify(element), expected, actual);
  }
}

testToQuicken();

// ---- QUICK AMOUNT INPUT ----

TEST_CASES = [{
    amount: "",
    expected: "0.00"
  },
  {
    amount: "1",
    expected: "0.01"
  },
  {
    amount: "0.01",
    expected: "0.01"
  },
  {
    amount: "13999",
    expected: "139.99"
  },
  {
    amount: "000.01",
    expected: "0.01"
  },
  {
    amount: "0.001",
    expected: "0.01"
  },
  {
    amount: "0,01",
    expected: "0.01"
  },
  {
    amount: "-0.01",
    expected: "-0.01"
  },
  {
    amount: "-13999",
    expected: "-139.99"
  },
  {
    amount: "13999-",
    expected: "-139.99"
  }
]

TEST_CASES.forEach(function(testCase) {
  // Given
  // When
  actual = formatAmountWithTwoDecimals(testCase.amount);

  // Then
  if (actual !== testCase.expected) {
    console.log("Assertion failed: amount=%s expected=%s actual=%s",
      testCase.amount, testCase.expected, actual);
  };
});