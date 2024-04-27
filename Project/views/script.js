// alert("Welcome to Airbnb!!!");
let propertyContainerElement = document.querySelector('.property-card');
let propertyContainerIndivisual = document.querySelector('.property-indivisual');
// let itemId;
let searchPropData;

function searchProp(){
  searchPropData = document.querySelector('.place-search').value;
  // console.log(searchPropData.toUpperCase());
  if(!searchPropData){
    displayItem()
  }else{
      displayItemFiltered()
  }
}

async function displayItem(){
  if(!propertyContainerElement){
    return;
  }
  const fetchURL = "http://localhost:6789/api/property"
  const respo = await fetch(fetchURL);
  // console.log(respo);
  const json = await respo.json();
  // console.log(json);


  var innerHtml = ``;
  await json.map(item =>{
    // console.log(item._id);
    // console.log(item.id);
    const path = `http://localhost:6789/images/property-img/${item.image}`;
    // const rePath = `http://localhost:6789/api/property/indivisual/${item._id}`
    const rePath = `http://localhost:6789/api/property/reserve`
    // console.log(path);
  innerHtml +=`<div class="item-container">
  <img class="item-image" src= "${path}" alt="property image" />
  <div class="item-rating">
  Rating: 
  ${item.rating} <span><i class="fa-solid fa-star"></i></span>
  </div>
  <div class="item-brand-name">Location: ${item.location}</div>
  <div class="item-name">${item.description}</div>
  <div class="item-price">
    <span class="item-current-price">Rs.${item.price}/- per night</span>
  </div>
  <div class="item-add-cart">
    <a class="btn btn-primary btn-booking"  href="http://localhost:6789/api/property/indivisual/${item._id}" >Book Now</a>
  </div>
  </div>`



});

propertyContainerElement.innerHTML = innerHtml;
};

displayItem();



async function displayItemFiltered(){

  const searchPropDataCap = searchPropData.charAt(0).toUpperCase()+searchPropData.slice(1);
// console.log(searchPropDataCap);
  if(!propertyContainerElement){
    return;
  }
  const fetchURL = "http://localhost:6789/api/property"
  const respo = await fetch(fetchURL);
  // console.log(respo);
  const json = await respo.json();
  // console.log(json);


  var innerHtml = ``;
  await json.filter((item)=> item.location == searchPropDataCap).map(item =>{
    // console.log(item._id);
    // console.log(item.id);
    const path = `http://localhost:6789/images/property-img/${item.image}`;
    // const rePath = `http://localhost:6789/api/property/indivisual/${item._id}`
    const rePath = `http://localhost:6789/api/property/reserve`
    // console.log(path);
  innerHtml +=`<div class="item-container">
  <img class="item-image" src= "${path}" alt="property image" />
  <div class="item-rating">
  Rating: 
  ${item.rating} <span><i class="fa-solid fa-star"></i></span>
  </div>
  <div class="item-brand-name">Location: ${item.location}</div>
  <div class="item-name">${item.description}</div>
  <div class="item-price">
    <span class="item-current-price">Rs.${item.price}/- per night</span>
  </div>
  <div class="item-add-cart">
    <a class="btn btn-primary btn-booking"  href="http://localhost:6789/api/property/indivisual/${item._id}" >Book Now</a>
  </div>
  </div>`
});

if(!innerHtml){
  displayItem()
}else{
  propertyContainerElement.innerHTML = innerHtml;
}

// propertyContainerElement.innerHTML = innerHtml;
};




function bookPropertySet(itemId) {

  setTimeout(bookPropertyGet, 2000);



  propertyContainerIndivisual.innerHTML = "Hi";
  // localStorage.setItem('property', JSON.stringify(itemId));
  console.log(itemId);

  const fetchURI = `http://localhost:6789/api/property/indivisual/${itemId}`
 
}

async function bookPropertyGet() {
  let propId = localStorage.getItem('property');
  console.log(propId);
   
 
}
// bookProperty(displayItem)


/*For Login page*/

function usingEmail(){
  document.querySelector(".email-btn").style.display = "none"
  document.querySelector(".username-btn").style.display = "block"

  document.querySelector(".username-div").style.display = "none"
  document.querySelector(".email-div").style.display = "block"

}

function usingUsername(){
  document.querySelector(".email-btn").style.display = "block"
  document.querySelector(".username-btn").style.display = "none"

  document.querySelector(".email-div").style.display = "none"
  document.querySelector(".username-div").style.display = "block"
}

/*End For login page*/