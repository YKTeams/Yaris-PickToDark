import axios from "axios";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import JsBarcode from "../../node_modules/jsbarcode";
let arrays = [];
let details = {
  grant_type: "password",
  userName: "TermUser",
  password: "TermPass",
};
let formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const config1 = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
};

axios
  .post("http://192.168.5.90:8081/token", formBody, config1)
  .then(function (body) {
    let token = JSON.parse(JSON.stringify(body.data.access_token));
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const button = document.querySelector("Button");
    button.addEventListener("click", (event) => {
      let bodyParameters = {
        ProdId: "",
        //InventBatchId: "11497695",
        InventBatchId: getProd().toString(),
      };
      axios
        .post(
          "http://192.168.5.90:8081/api/TerminalListServices/getYrsCOProdBomList",
          bodyParameters,
          config
        )
        .then((json) => donustur(json.data.resultData));
    });
    function getVal() {
      let val = document.querySelector("input").value;
      let searchTerm = "_";
      let indexOfFirst = val.indexOf(searchTerm);
      if (indexOfFirst > 0) {
        val = val.slice(0, indexOfFirst);
      }

      return val;
    }
    function getProd() {
      let prodVal = document.getElementById("prodId").value;
      prodVal = prodVal.toString();
      prodVal = prodVal.substring(1);
      return prodVal;
    }
    function donustur(resultData1) {
      //let array =[1,5]
      //let i=0
      //array=Array( resultData1)
      const obj = JSON.parse(resultData1);
      // array.forEach(element => {

      //   console.log( obj.YrsCOProdBomLst[i].ItemId)
      //   i=i+1
      // });

      for (let index = 0; index < 1000; index++) {
        if (obj.YrsCOProdBomLst[index] == null) {
          break;
        }
        arrays[index] = obj.YrsCOProdBomLst[index].ItemId;
        console.log(obj.YrsCOProdBomLst[index].ItemId);
        //  document.getElementById("1").innerHTML = (obj.YrsCOProdBomLst[index].ItemId)
        if (obj.YrsCOProdBomLst[index].ItemId === getVal()) {
          document.getElementById("durumId").innerHTML = "BAŞARILI";
          document.getElementById("durumId").style.color = "rgba(0,128,0)";
          document.getElementById("durumId").style.boxShadow =
            "rgba(1 210 60 / 100%) 0px 40px 58px -16px";
          document.getElementById("durumId").style.borderColor =
            "rgba(0,128,0 , 0.8)";
          var w = window.open();
          //w.document.open("text/plain");
          let a1 = document.getElementById("opr").value;
          let a2 = document.getElementById("item").value;
          let a3 = document.getElementById("prodId").value;
          let dateString = new Date().toLocaleString("TR", {
            timeZone: "Europe/Istanbul",
          });
          let a4 = a2 + " " + a3 + " " + a1;
          let a5 = dateString;
          JsBarcode("#code128", a4);
          JsBarcode("#code129", a5);
          let innerContents = document.getElementById("code128").outerHTML;
          let innerContents1 = document.getElementById("code129").outerHTML;
          w.document.write(innerContents, innerContents1);
          w.document.close();
          w.focus();
          w.print();
          w.close();
          break;
        } else {
          document.getElementById("durumId").innerHTML = "BAŞARISIZ";
          document.getElementById("durumId").style.color = "rgba(255, 0, 0)";
          document.getElementById("durumId").style.boxShadow =
            "rgba(255 0 0 / 100%) 0px 40px 58px -16px";
          document.getElementById("durumId").style.borderColor =
            "rgba(255, 0, 0 , 0.8)";
            
        }
      }
    }

    // axios.post(
    // 'http://192.168.5.90:8081/api/TerminalListServices/getYrsCOProdBomList',
    // bodyParameters,
    // config

    // ).then( json => donustur(json.data.resultData))
  });

export default class ProductService {
  getToken() {
    return;
  }
  getData() {
    window.onload = function () {
      
      
      // //INPUT ATLAMA
      // document.getElementById("item").focus();
      // var a = document.getElementById("item"),
      //   b = document.getElementById("prodId"),
      //   c = document.getElementById("opr");

      // a.onkeyup = function () {
      //   if (
      //     a.value.length === 10 ||
      //     a.value.length === 9 ||
      //     a.value.length === 8 ||
      //     a.value.length === 7 ||
      //     a.value.length === 6
      //   ) {
      //     b.focus();
      //   }
      // };

      // b.onkeyup = function () {
      //   if (
      //     b.value.length === 10 ||
      //     b.value.length === 9 ||
      //     b.value.length === 8 ||
      //     b.value.length === 7 ||
      //     b.value.length === 6
      //   ) {
      //     c.focus();
      //   }
      // };
      //OTOMATİK GETIR VE YAZDIR YAPABILIRIZ
      // c.onkeyup = function () {
      //   if (
      //     c.value.length === 10 ||
      //     c.value.length === 9 ||
      //     c.value.length === 8 ||
      //     c.value.length === 7 ||
      //     c.value.length === 6
      //   ) {
      //     document.getElementById("myBtn1").onclick();
      //   }
      // };
      //INPUT ATLAMA

      //BARKOD YAZDIR BAŞLANGIÇ
      //const btn = document.getElementById("myBtn1");
      //btn.onclick = function () {
      // var w = window.open();
      // w.document.open("text/plain");
      // let a1 = document.getElementById("opr").value;
      // let a2 = document.getElementById("item").value;
      // let a3 = document.getElementById("prodId").value;
      // let dateString = new Date().toLocaleString("TR", {
      //   timeZone: "Europe/Istanbul",
      // });
      // let a4 = a2 + " " + a3 + " " + a1;
      // let a5 = dateString;
      // JsBarcode("#code128", a4);
      // JsBarcode("#code129", a5);
      // let innerContents = document.getElementById("code128").outerHTML;
      // let innerContents1 = document.getElementById("code129").outerHTML;
      // w.document.write(innerContents,innerContents1);
      // w.document.close();
      // w.focus();
      // w.print();
      //};
      //BARKOD YAZDIR BİTİŞ
      const firebaseConfig = {
        apiKey: "AIzaSyD8x9jTou16nrIZgG1haY6izPxr4ijWPhM",
        authDomain: "web-picktodark.firebaseapp.com",
        databaseURL:
          "https://web-picktodark-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "web-picktodark",
        storageBucket: "web-picktodark.appspot.com",
        messagingSenderId: "909867660075",
        appId: "1:909867660075:web:9d011874579434a11d4b6e",
        measurementId: "G-01CWD4QKLV",
      };

      firebase.initializeApp(firebaseConfig);
      //let database = firebase.database();

      let opr, item, durum, prod;
      function Ready() {
        opr = document.getElementById("opr").value;
        item = document.getElementById("item").value;
        prod = document.getElementById("prodId").value;
        durum = document.getElementById("durumId").innerHTML;
      }
      document.getElementById("myBtn").onclick = function () {
        let dateString = new Date().toLocaleString("TR", {
          timeZone: "Europe/Istanbul",
        });

        let formattedString = dateString.replaceAll(".", "");
        console.log(formattedString);
        console.log(document.getElementById("prodId").innerHTML);
        setTimeout(function () {
          Ready();
          firebase
            .database()
            .ref("users/" + formattedString)
            .set({
              OprId: opr,
              ItemNo: item,
              ProdNo: prod,
              DurumNo: durum,
              ZamanDurum: formattedString,
            });
            
          document.getElementById("opr").value = "";
          document.getElementById("item").value = "";
          document.getElementById("prodId").value = "";
          document.getElementById("durumId").innerText = "DURUM";
          document.getElementById("durumId").style.color = "turquoise";
          document.getElementById("durumId").style.boxShadow =
            "rgba(60 210 300 / 100%) 0px 40px 58px -16px";
          //READ DATA
        }, 11000);

      };
      firebase
        .database()
        .ref("users")
        .on("value", (snap) => {
          console.log(snap.val());
        });
      firebase
        .database()
        .ref("users/")
        .limitToFirst(1500)
        .once("value", function (AllRecords) {
          AllRecords.forEach(function (CurrentRecord) {
            let durum = CurrentRecord.val().DurumNo;
            let opr1 = CurrentRecord.val().OprId;
            let items1 = CurrentRecord.val().ItemNo;
            let prod1 = CurrentRecord.val().ProdNo;
            let zaman = CurrentRecord.val().ZamanDurum;
            AddItemsToTable(durum, opr1, items1, prod1, zaman);
          });
        });
      let strNo = 0;
      function AddItemsToTable(durum, opr1, items1, prod1, zaman) {
        let tbody = document.getElementById("tbody1");
        let trow = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        td1.innerHTML = ++strNo;
        td2.innerHTML = opr1;
        td3.innerHTML = items1;
        td4.innerHTML = prod1;
        td5.innerHTML = durum;
        td6.innerHTML = zaman;
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        trow.appendChild(td6);
        tbody.appendChild(trow);
      }
      //READ DATA
    };
  }
}

