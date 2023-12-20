
// ----------------
var pName=document.getElementById('pName');
var pPrice=document.getElementById('price');
var pCat=document.getElementById('pCat');
var pDesc=document.getElementById('pDesc');
var btnAddProduct=document.getElementById('btn_add');
var btnSerach=document.getElementById('search');
var sucss=document.querySelector('.successData');
var erros=document.querySelector('.errorData');
 
var singleProduc={};

var listProduct=[];
var count=0;
if(localStorage.getItem('productItems')!=null){
  listProduct=JSON.parse( localStorage.getItem('productItems') )
  displayProduct(listProduct) ;
}
// take value frome the form  add value of product
//  to object [single product] and add [single product]to
//  arry[listProduct] and stor [listProduct]  in localstorge 
function  addProduct(){
  
  // console.log(validationName(),validationPrice(),validationCat(),validationDes())
  console.log(validationPrice())
  
  if(validationName() && validationPrice() && validationCat() && validationDes()){
    sucss.classList.replace('d-none','d-block');
    erros.classList.replace('d-block','d-none');
    // btn btn-outline-primary
    btnAddProduct.classList.replace('btn-info','btn-outline-primary');
    btnAddProduct.classList.replace('btn-outline-danger','btn-outline-primary');
  singleProduc={
    name:pName.value,
    category:pCat.value,
    price:pPrice.value,
    desc:pDesc.value
    
 }
if(btnAddProduct.innerHTML=='add Product'){
   
  console.log(singleProduc);
  listProduct.push(singleProduc);
  console.log(listProduct);
}
  else{
    listProduct.splice(count,1,singleProduc);
    btnAddProduct.innerHTML='add Product'
    btnAddProduct.classList.replace('btn-outline-info','btn-info');
    
  }
localStorage.setItem('productItems',JSON.stringify(listProduct));
displayProduct(listProduct);
  }
  else{
 
  sucss.classList.replace('d-block','d-none');
    erros.classList.replace('d-none','d-block');
    btnAddProduct.classList.replace('btn-info','btn-outline-danger');
    btnAddProduct.classList.replace('btn-outline-primary','btn-outline-danger');
  
  }

}



// diplay product in table 
function displayProduct(list){
var str='';

// var spa=Array.from(document.querySelectorAll('.spa'))

console.log(list)
if(list.length==0)
document.getElementById('demo').innerHTML= `
<tr>
<td colspan="7">
  <img src="img/download.jfif" alt="" class="w-50">
</td>
</tr>
`


for(var i=0;i<list.length;i++){
    str+=`
    <tr class="">
        <td scope="row">${i+1}</td>
        <td class="spa">${list[i].newName?list[i].newName:list[i].name}
       
        </td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc}</td>
        <td><button class=" btn btn-success"
        onclick="upDateProduct(${i})">Edit</button></td>
        <td><button class=" 
        btn btn-danger"onclick=
        "deleteProduct(${i})">Delete
        </button></td>
         </tr>`
        
// onclick="deleteProduct(${i})
document.getElementById('demo').innerHTML=str;

}
}


function replacing(x){
console.log(x)
}
// clear the form 
function clearProduct(){
pName.value=pPrice.value=pCat.value=pDesc.value=' ';
sucss.classList.replace('d-block','d-none');
erros.classList.replace('d-block','d-none')
btnAddProduct.classList.replace('btn-outline-danger','btn-info');
btnAddProduct.classList.replace('btn-outline-primary','btn-info');

}


function deleteProduct(index){


listProduct.splice(index,1);

localStorage.setItem('productItems',JSON.stringify(listProduct));
displayProduct(listProduct);
}

function upDateProduct(index){
btnAddProduct.innerHTML='updat Product';
btnAddProduct.classList.replace('btn-info','btn-outline-info')
count=index;
pName.value=listProduct[index].name;
pPrice.value=listProduct[index].price;
pCat.value=listProduct[index].category;
pDesc.value=listProduct[index].desc;







}



// serch
function searchProduct(){
  var sp=Array.from(document.querySelectorAll('span'))
   
  var searchWorde= btnSerach.value;
  var is_serch=searchWorde.toLocaleLowerCase();
  var is_listname,is_listCat;
  var searchList=[];
//  console.log(searchWorde);
 if(searchWorde != ''){
  for(var i=0,j=1;i<listProduct.length;i++){

  is_listname=listProduct[i].name.toLocaleLowerCase();
  is_listCat=listProduct[i].category.toLocaleLowerCase();

   if(is_listname.includes(is_serch) || is_listCat.includes(is_serch) )
   
  {
var index=is_listname.indexOf(is_serch)
console.log(index)
if(index==0){
  listProduct[i].newName=is_listname.
  replace(is_serch,`<span class="text-danger fw-bold">${is_serch.toLocaleUpperCase()}</span>`)
    
}
  else{
    listProduct[i].newName=is_listname.replace(is_serch,
      `<span class="text-danger fw-bold">${is_serch}</span>`)
   
   
  }
  searchList.push(listProduct[i]);
     
    
  
   }
   
 
 
 displayProduct(searchList);
  
 
 }
  
 
  }
 
 }





























// ------------------Validation Name------------------------------
function validationName(){
var errName=document.querySelector('.errName')
var regxN=/^[A-Z][a-z]{2,8}$/;
if(regxN.test(pName.value) && pName.value !=''){
 errName.classList.replace('d-block','d-none');
  return true;
}
 
else{
  errName.classList.replace('d-none','d-block');
  return false;
}


}
 
// ------------------Validation Price------------------------------
function validationPrice(){
var errPrice=document.querySelector('.errPrice')
var regxP=/^([1-9][0-9]{3}||(10000))$/;


if(regxP.test(pPrice.value) && pPrice.value !=''){
  errPrice.classList.replace('d-block','d-none');
  return true;
}
 
else{
  errPrice.classList.replace('d-none','d-block');
  return false;
}


}

// ------------------Validation catogery------------------------------

function validationCat(){
  var errCat=document.querySelector('.errCat')
  var regxC=/^(mobile||screen||watch)$/i;
  if(regxC.test(pCat.value) && pCat.value!=''){
    errCat.classList.replace('d-block','d-none');
    return true;
  }
   
  else{
 
    errCat.classList.replace('d-none','d-block');
 
    return false;
  }
  
  
  }

// ------------------Validation Descrption------------------------------

function validationDes(){
  var errDesc=document.querySelector('.errDesc')
  console.log(pDesc.value.length)
  if(pDesc.value.length <25 && pDesc.value !=''){
    errDesc.classList.replace('d-block','d-none');
      return true;
  
  }
  else{
    errDesc.classList.replace('d-none','d-block');
      return false;
  }
}


