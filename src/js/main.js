'use strict';
const url = "https://studenter.miun.se/~maaf2200/writeable/dt173g/Projekt/webbservice/rest.php";

window.onload = init;

function init() {
    getData(); // läser in data
}
const order = document.getElementById('order');
const liEl = document.getElementsByClassName("orderdish");

const submit_order = document.getElementById('submit_order');
const order_name = document.getElementById('name');
const order_number = document.getElementById('phonenr');
const order_time = document.getElementById('time');

function stripTags(html) {
  return html.replace(/<\/?[^>]+>/gi, '');
}

//hämta data
async function getData() {
    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      const menu = data.filter(item => item.dishName !== undefined);
      writeMenu(menu);
    } catch (err) {
      console.log(err);
    }
  }

  //Skriv ut menyn
  function writeMenu(menu) {
    const ulEl = document.getElementById("menu");
    ulEl.innerHTML = "";
  
    menu.forEach(dish => {
      ulEl.innerHTML += `
        <li id="${dish.id}" class="dish">
          <b>${dish.dishName}</b><br> 
          ${dish.dishContents}<br>
          ${dish.dishPrice} kr 
        </li>
      `;
    });
    const liEl = document.getElementsByClassName("dish");
  
    Array.from(liEl).forEach((item) => {
      item.addEventListener("click", addDishToOrder);
    });
    submit_order.addEventListener("click", confirm_order)
  }

  // function addDishToOrder(e) {
  //   const dish = e.target.querySelector('b').innerText;
    
  //   order.innerHTML += `<b class="orderdish" id=${e.target.id}>${dish}<br></b>`;

  //   Array.from(liEl).forEach((item) => {
  //     item.addEventListener("click", deleteDish);
  //   });
  // }
  function addDishToOrder(e) {
    const dishId = e.target.id;
    const dishName = e.target.querySelector('b').innerText;
    
    const dishObj = {
      id: dishId,
      name: dishName
    };
  
    order.innerHTML += `<b class="orderdish" id=${dishId}>${dishName}<br></b>`;
  
    Array.from(liEl).forEach((item) => {
      item.addEventListener("click", deleteDish);
    });
  
    orderContent.push(dishObj);
  }
  

  function deleteDish(e) {
    const delDish = e.target;
    if(confirm("Denna rätt tas bort från din beställning") == true) {
      delDish.remove();
    }
  }

  function confirm_order() {
    const orderContent = Array.from(order.querySelectorAll('b')).map((bTag) => bTag.innerText);
    if(order_name.value!= "" && order_number.value!= "" && order_time.value!= "" && orderContent!= "") {
      if (confirm(`Bekräfta följande beställning: 
          Namn: ${order_name.value}
          Telefonnummer: ${order_number.value}
          Tid för pickup: ${order_time.value}
          Beställning: ${orderContent}`)== true) {
            sendOrder(order_name.value, order_number.value, order_time.value, orderContent);
    }
    }
    else {
      alert("Varning! viktig information saknas för att du ska kunna lägga denna beställning. \nVänligen försök igen!")
    }
    
  }
  // function confirm_order() {
  //   const orderContent = Array.from(order.querySelectorAll('b')).map((bTag) => bTag.innerText);
    
  //   if (
  //     order_name.value !== "" &&
  //     order_number.value !== "" &&
  //     order_time.value !== "" &&
  //     orderContent.length > 0
  //   ) {
  //     if (
  //       confirm(`Bekräfta följande beställning: 
  //         Namn: ${order_name.value}
  //         Telefonnummer: ${order_number.value}
  //         Tid för pickup: ${order_time.value}
  //         Beställning: ${orderContent.map(dish => dish.name).join(', ')}
  //       `)
  //     ) {
  //       sendOrder(order_name.value, order_number.value, order_time.value, orderContent);
  //     }
  //   } else {
  //     alert("Varning! Viktig information saknas för att du ska kunna lägga denna beställning. \nVänligen försök igen!");
  //   }
  // }
  

  function sendOrder(order_name_val, order_number_val, order_time_val, orderContent_val) {
    const formData = new FormData();
    formData.append('name', order_name_val);
    formData.append('phoneNumber', order_number_val);
    formData.append('time', order_time_val);
    formData.append('food', JSON.stringify(orderContent_val));
  
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => getData())
      .catch(err => console.log(err));
  
    console.log(order_name_val, order_number_val, order_time_val, orderContent_val);
  }
  