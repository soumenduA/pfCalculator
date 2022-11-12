$(document).ready(() => {
  let opBal = 0;
  let clBal = 0;
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
    console.log({ index });
    if (index >= 0 && index < months.length - 1) {
      return months[index + 1].month;
    }
    return null;
  };
  
  const getCurrentMonthIndex = () => {
    // TODO
  }

  $("#btn-export").click(function () {
    console.log("export clicked");
    $(".header-line-breaker").remove();
    $("#PF_Table").table2excel({
      // exclude CSS class
      exclude: ".noExl",
      name: "Worksheet Name",
      filename: "Employee", //do not include extension
      fileext: ".xlsx", // file extension
      exclude_img: true,
      exclude_links: true,
      exclude_inputs: true,
    });
    location.reload();
  });

  $("#next_btn").click(function () {
    // const month = $("#month").val();
    const month = $("#month").html(); //change for making month uneditable
    const index = months.findIndex((ele) => ele.month.toLowerCase() === month.toLowerCase()); //change for making month uneditable
    if (months[index].isAddedToTable) {
      const nextMonth = getNextMonth(month.toLowerCase());
      console.log({ clBal, opBal, nextMonth });
      opBal = clBal;
      $("#opening-bal").val(opBal);
      nextMonth
        // ? $("#month").val(nextMonth)
        ? $("#month").html(nextMonth.toUpperCase())
        : window.alert(
            "Done for the FY! Please reload the page to enter new data."
          );
    } else window.alert(`Please add ${month.toUpperCase()} data to table before going to next month.`);
  });

  $("#addToTable_btn").click(function () {
    // const month = $("#month").val();
      const month = $("#month").html(); //change for making month uneditable
      console.log("adding row to table", month);
      const index = months.findIndex((ele) => ele.month.toLowerCase() === month.toLowerCase()); //change for making month uneditable
      if (!months[index].isAddedToTable) {
        if(window.confirm("Are you sure you wnat to add this row to table?")){
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
            clBal = opBal + bfr_15 + aft_15 + pfRecoBfr + pfRecoAft - pfAdvBfr - pfAdvAft;
            console.log({ clBal, opBal, intr, bfr_15, aft_15 });
            $("#PF_Table tr:last").after(
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
          } catch (err) {
            window.alert("Something went WRONG! Please check if all fields are filled.");
            // console.error(err);
          }
        }
      } else window.alert(`${month.toUpperCase()} data already added to table, please go to next month.`);
  });
});
