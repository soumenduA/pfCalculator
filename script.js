$(document).ready(() => {
  // $("body").css({ "background-image": "url('bg_image_7')" });
  let opBal = 0;
  let clBal = 0;
  let intrSum = 0;
  let totalSum = 0;
  var fileName = "";
  const months = [
    { month: "apr", isAddedToTable: false },
    { month: "may", isAddedToTable: false },
    { month: "jun", isAddedToTable: false },
    { month: "jul", isAddedToTable: false },
    { month: "aug", isAddedToTable: false },
    { month: "sep", isAddedToTable: false },
    { month: "oct", isAddedToTable: false },
    { month: "nov", isAddedToTable: false },
    { month: "dec", isAddedToTable: false },
    { month: "jan", isAddedToTable: false },
    { month: "feb", isAddedToTable: false },
    { month: "mar", isAddedToTable: false },
  ];

  const getNextMonth = (currMonth) => {
    const index = months.findIndex((ele) => ele.month === currMonth);
    if (index >= 0 && index < months.length - 1) {
      return months[index + 1].month;
    }
    return null;
  };

  const getCurrentMonthIndex = () => {
    // TODO
  };
  const schools = [
    { name: "Select", value: "None", addr: "" },
    {
      name: "SANTOSHPUR GOVT. COLONY NETAJI SUBHAS VIDYALAYA(H.S)",
      id: "SANTOSHPUR_GOVT",
      value: "SANTOSHPUR GOVT. COLONY NETAJI SUBHAS VIDYALAYA(H.S)",
      addr: "P.O.-SANTOSHPUR(M), P.S.-MAHASHTALA, DIST.-24PGS(SOUTH), PIN - 700044",
    },
  ];

  const years = [
    { fY: "Select", aY: "Select" },
    { fY: "2021-22", aY: "2022-23" },
    { fY: "2022-23", aY: "2023-24" },
    { fY: "2023-24", aY: "2024-25" },
    { fY: "2024-25", aY: "2025-26" },
    { fY: "2025-26", aY: "2026-27" },
    { fY: "2026-27", aY: "2027-28" },
    { fY: "2027-28", aY: "2028-29" },
    { fY: "2028-29", aY: "2030-31" },
    { fY: "2030-31", aY: "2031-32" },
    { fY: "2031-32", aY: "2032-33" },
  ];
  // Years - Begin
  years.forEach((ele, idx) => {
    $("#fin-year-inpt").append(`<option value="${ele.fY}">
      ${ele.fY}
    </option>`);
  });

  $("#fin-year-inpt").change(function (event) {
    if (event.target.value === "Select") {
      $("#fin-year").html("");
      $("#asse-year").html("");
    } else {
      $("#fin-year").html(event.target.value);
      years.forEach((ele) => {
        if (ele.fY === event.target.value) {
          $("#asse-year").html(ele.aY);
        }
      });
    }
  });
  // Years - End
  // School - Begin
  schools.forEach((ele) => {
    $("#school-name-inpt").append(`<option value="${ele.value}">
      ${ele.name}
    </option>`);
  });

  $("#school-address-inpt").append(`<option value="None">
    ${"Select"}
  </option>`);

  $("#school-name-inpt").change(function (event) {
    $("#school-address-inpt")
      .find("option")
      .remove()
      .end()
      .append('<option value="">Select</option>');
    $("#school-address").html("");
    schools.forEach((ele) => {
      if (ele.value === event.target.value) {
        $("#school-address-inpt").append(`<option value="${ele.addr}">
          ${ele.addr}
        </option>`);
      }
    });

    event.target.value === "None"
      ? $("#school-name").html("")
      : $("#school-name").html(event.target.value);
  });

  $("#school-address-inpt").change(function (event) {
    event.target.value === "None"
      ? $("#school-address").html("")
      : $("#school-address").html(event.target.value);
  });
  // School - End

  $("#emp-name-inpt").change(function (event) {
    $("#emp-name").html(event.target.value.toUpperCase());
    fileName = event.target.value.toUpperCase();
  });

  $("#emp-designation-inpt").change(function (event) {
    $("#emp-designation").html(event.target.value.toUpperCase());
  });

  $("#btn-export").click(function () {
    $(".header-line-breaker").remove();
    $("#PF_Table").table2excel({
      // exclude CSS class
      exclude: ".noExl",
      name: "Worksheet Name",
      filename: `${fileName}`, //do not include extension
      fileext: ".xls", // file extension
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true,
    });
    location.reload();
  });

  $("#next_btn").click(function () {
    // const month = $("#month").val();
    const month = $("#month").html(); //change for making month uneditable
    const index = months.findIndex(
      (ele) => ele.month.toLowerCase() === month.toLowerCase()
    ); //change for making month uneditable
    if (months[index].isAddedToTable) {
      const nextMonth = getNextMonth(month.toLowerCase());
      opBal = clBal;
      $("#opening-bal").val(opBal);
      nextMonth
        ? $("#month").html(nextMonth.toUpperCase())
        : window.alert(
            "Done for the FY! Please download and reload the page to enter new data."
          );
    } else window.alert(`Please add ${month.toUpperCase()} data to table before going to next month.`);
  });

  $("#addToTable_btn").click(function () {
    // const month = $("#month").val();
    const month = $("#month").html(); //change for making month uneditable
    const index = months.findIndex(
      (ele) => ele.month.toLowerCase() === month.toLowerCase()
    ); //change for making month uneditable
    if (!months[index].isAddedToTable) {
      if (window.confirm("Are you sure you wnat to add this row to table?")) {
        try {
          opBal = parseFloat($("#opening-bal").val(), 2);
          const bfr_15 = parseFloat($("#before-15").val() || 0, 2);
          const aft_15 = parseFloat($("#after-15").val() || 0, 2);
          const intPA = parseFloat($("#int-pa").val(), 2);
          const pfRecoBfr = parseFloat($("#pf-reco-bfr").val() || 0, 2);
          const pfAdvBfr = parseFloat($("#pf-adv-bfr").val() || 0, 2);
          const pfRecoAft = parseFloat($("#pf-reco-aft").val() || 0, 2);
          const pfAdvAft = parseFloat($("#pf-adv-aft").val() || 0, 2);
          const lwstPayment = opBal + bfr_15 + pfRecoBfr - pfAdvBfr;
          const intr = (lwstPayment * intPA) / 1200;
          intrSum += intr;
          clBal =
            opBal +
            bfr_15 +
            aft_15 +
            pfRecoBfr +
            pfRecoAft -
            pfAdvBfr -
            pfAdvAft;
          totalSum = clBal + intrSum;
          $("#PF_Table tr:last").before(
            `<tr id=${month.toLowerCase()}>
              <td>${month.toUpperCase()}</td>
              <td>${opBal}</td>
              <td>${bfr_15}</td>
              <td>${aft_15}</td>
              <td>${pfAdvBfr}</td>
              <td>${pfAdvAft}</td>
              <td>${pfRecoBfr}</td>
              <td>${pfRecoAft}</td>
              <td>${lwstPayment}</td>
              <td>${intPA}</td>
              <td>${intr.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}</td>
              <td>${clBal.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}</td>
              </tr>`
          ); // two places after decimal truncation is handled using string regex matcher
          months[index].isAddedToTable = true;
          // populate total row
          $("#closing-bal").html(clBal);
          $("#total-int-sum").html(
            intrSum.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
          );
          $("#total-bal").html(
            totalSum.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
          );
          // populate total row End
        } catch (err) {
          window.alert(
            "Something went WRONG! Please check if all fields are filled."
          );
          // console.error(err);
        }
      }
    } else window.alert(`${month.toUpperCase()} data already added to table, please go to next month.`);
  });
});
