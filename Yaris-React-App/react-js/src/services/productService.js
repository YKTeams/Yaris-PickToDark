import axios from "axios";
//import { StatisticValue } from "semantic-ui-react";
//import React, { useState, useEffect } from 'react'
//import { Table } from "semantic-ui-react";
let arrays= []
let details = {
  'grant_type': 'password',
    'userName': 'TermUser',
    'password': 'TermPass'
};
let formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

const config1 = {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
};

axios.post('http://192.168.5.90:8081/token',
  formBody,
  config1
).then(function(body){
  let token = JSON.parse(JSON.stringify(body.data.access_token))
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  const bodyParameters = {
    ProdId: "",
    InventBatchId:"11497695"
  };
  
  const button = document.querySelector('Button');
  button.addEventListener('click', event => {
    axios.post( 
      'http://192.168.5.90:8081/api/TerminalListServices/getYrsCOProdBomList',
      bodyParameters,
      config
      
      ).then( json => donustur(json.data.resultData))
    
  });
  function getVal() {
    const val = document.querySelector('input').value;
    return val
  }
  function donustur(resultData1)
  {
    //let array =[1,5]
    //let i=0 
    //array=Array( resultData1)
    const obj =JSON.parse(resultData1)
    // array.forEach(element => {
      
    //   console.log( obj.YrsCOProdBomLst[i].ItemId)
    //   i=i+1
    // });
    
    
    for (let index = 0; index < 1000 ; index++) {
      if (obj.YrsCOProdBomLst[index]==null) {
        break
      }
      arrays[index]=obj.YrsCOProdBomLst[index].ItemId
        console.log( obj.YrsCOProdBomLst[index].ItemId)
      //  document.getElementById("1").innerHTML = (obj.YrsCOProdBomLst[index].ItemId)
      if((obj.YrsCOProdBomLst[index].ItemId)===getVal()) {
        document.getElementById("durumId").innerHTML="BAŞARILI"
        document.getElementById("durumId").style.color="green"
        break
      }
      else
      {
        document.getElementById("durumId").innerHTML="Başarısız"
        document.getElementById("durumId").style.color="red"
        
      }
    }
    ;
  }
 
  // axios.post( 
  // 'http://192.168.5.90:8081/api/TerminalListServices/getYrsCOProdBomList',
  // bodyParameters,
  // config
  
  // ).then( json => donustur(json.data.resultData))
 
})



export default class ProductService{
      getToken(){
          return;
      }
  }

