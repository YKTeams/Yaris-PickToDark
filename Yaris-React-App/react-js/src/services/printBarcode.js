window.onload = function () {
  const btn = document.getElementById("myBtn1");
  btn.onclick = function () {
    console.log("print");
    // w.document.write("deneme"); //only part of the page to print, using jquery
    // w.document.close(); //this seems to be the thing doing the trick
    // w.focus();
    // w.print();
    // w.close();
  };
};
