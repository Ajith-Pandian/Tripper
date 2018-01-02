const getTodayDate = () => {
  let today = new Date();
  let dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;

  var todayDate = dd + "/" + mm + "/" + yyyy;
  console.log(todayDate);
  return todayDate;
};
