// <------------------------------------------------------------------------------------------
let product_container = document.querySelector(".products_container");

// ! add product to container
function addProducts(produ) {
  produ.forEach((product) => {
    let product_card = document.createElement("div");
    product_card.classList.add("product_card");
    product_card.innerHTML = `<img src="./assets//${product.image}" alt="" />
       <span class="sponsered">sponsered</span>
       <span class="product_name">${product.title}</span>
       <span class="color">${product.color}</span>
       <div >
         <span class="rating"
           >${product.rating}<i class="fa fa-star" aria-hidden="true"></i
         ></span>
       </div>
       <div>
         <span class="special_price">₹${product.specialPrice}</span>
         <span class="original_price">₹${product.price}</span>
         <span class="discount">${Math.round(
           (product.discountPrice / product.price) * 100
         )}% off</span>
       </div>
       <div class="delivery">free delivery</div>
       <div class="offers">Bank offer</div>`;
    //  product_card.appendChild(product_image);
    //  product_card.appendChild(product_name)
    product_container.appendChild(product_card);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  addProducts(products);
});

//! todo Sorting the category
let popularity = document.querySelector("#popularity");
let lowToHigh = document.querySelector("#low_to_high");
let highToLow = document.querySelector("#high_to_low");

popularity.addEventListener("click", (e) => {
  let arr = product.sort((a, b) => {
    a = a.popularity;
    b = b.popularity;
    return a - b;
  });
  product_container.innerHTML = "";
  addProducts(arr);
});

lowToHigh.addEventListener("click", (e) => {
  let arr = product.sort((a, b) => {
    a = a.price;
    b = b.price;
    return a - b;
  });
  product_container.innerHTML = "";
  addProducts(arr);
});

highToLow.addEventListener("click", (e) => {
  let arr = product.sort((a, b) => {
    a = a.price;
    b = b.price;
    return b - a;
  });
  product_container.innerHTML = "";
  addProducts(arr);
});

//todo filter the category

//filter data according discount
let inputs = document.querySelectorAll(".dicount-category input");
var selectedValArrr = [];
function filterValueAccordingDiscount(e) {
  if (e.target.checked) {
    selectedValArrr.push(e.target.value);
  } else {
    selectedValArrr = selectedValArrr.filter((val) => val != e.target.value);
  }
  console.log(selectedValArrr);
  let filterArr = product.filter((el) => {
    return selectedValArrr.join(",").includes(el.discountPrice.toString());
  });

  product_container.innerHTML = "";
  if (selectedValArrr.length > 0) {
    addProducts(filterArr);
  } else {
    addProducts(product);
  }
}
inputs.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    filterValueAccordingDiscount(e);
  });
});

//filter data according offers
let offerInputs = document.querySelector(".offers-category input");
offerInputs.addEventListener("change", (e) => {
  console.log(e.target);
  product_container.innerHTML = "";
  if (e.target.checked) {
    let filterArr = product.filter((el) => {
      return el.noCostEMI == true;
    });
    addProducts(filterArr);
  } else {
    addProducts(product);
  }
});

//filter data according customer rating
let ratingInputs = document.querySelectorAll(".customer-rating-category input");
var ratingValArr = [];
function filterValueAccordingRating(e) {
  if (e.target.checked) {
    ratingValArr.push(e.target.value);
  } else {
    ratingValArr = ratingValArr.filter((val) => val != e.target.value);
  }
  console.log(ratingValArr);
  let filterArr = product.filter((el) => {
    return ratingValArr.join(",").includes(Math.floor(el.rating).toString());
  });
  product_container.innerHTML = "";
  if (ratingValArr.length > 0) {
    addProducts(filterArr);
  } else {
    addProducts(product);
  }
}
ratingInputs.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    filterValueAccordingRating(e);
  });
});

//filter basis of price
function roundOf(val) {
  return Math.round(val / 100) * 100;
}
let range = document.querySelector("#range");
range.addEventListener("input", (e) => {
  product_container.innerHTML = "";
  let maxValue = roundOf(e.target.value);
  let minValue = document.querySelector("#min-price").value;
  if (minValue < 250) {
    minValue = 250;
  }
  document.querySelector("#max-price option").innerHTML = maxValue;
  let filterArr = product.filter((el) => {
    return el.price >= minValue && el.price <= maxValue;
  });
  addProducts(filterArr);
});

// ----------------------display fliter element -----------------

let filter_categories = document.querySelectorAll(".filter-category-head");
filter_categories.forEach((ele) => {
  ele.addEventListener("toggle", (e) => {
    let parent = e.target.parentNode;
    let article = parent.querySelector("article");
    article.toggleAttribute("hidden");
  });
});

//!sign up and sign in pages js

// for data for signUp and signIn page functionality
let userName = document.querySelector(".userName");
let email = document.querySelectorAll(".email");
let password = document.querySelectorAll(".password");
let warning = document.querySelectorAll(".warning");
let profileBtn = document.querySelector(".profile-button");
let navSignUpBtn = document.querySelector(".login-button");
let signUpContainer = document.querySelector("#signupMainContainer");
let signInContainer = document.querySelector("#signinMainContainer");
let mainsignUpsignInConatiner = document.querySelector(
  ".signup_signin_container"
);
let mainBodyContainer = document.querySelector(".main-body-container");

// click sign up in navbar
navSignUpBtn.addEventListener("click", (e) => {
  signUpContainer.style.display = "flex";
  signInContainer.style.display = "none";
  mainBodyContainer.style.display = "none";
  mainsignUpsignInConatiner.style.display = "flex";
});

// click sign up pags's sign in button to show sign in page
document.querySelector("#signup_left_signin").addEventListener("click", (e) => {
  signUpContainer.style.display = "none";
  signInContainer.style.display = "flex";
  mainBodyContainer.style.display = "none";
  mainsignUpsignInConatiner.style.display = "flex";
});

// click sign in pags's sign up  button to show sign up page
document.querySelector("#signup_right_signin").addEventListener("click", (e) => {
  signUpContainer.style.display = "flex";
  signInContainer.style.display = "none";
  mainBodyContainer.style.display = "none";
  mainsignUpsignInConatiner.style.display = "flex";
});

// sign up => add user data
let i = 0;
let dataArr = [];
document.querySelector("#signUpBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let userDataObj = {
    userName: userName.value,
    email: email[0].value,
    password: password[0].value,
  };
  dataArr.push(userDataObj);
  localStorage.setItem(`data`, JSON.stringify(dataArr));

  // condition for all input
  if (userName.value == "" || email[0].value == "" || password[0].value == "") {
    warning[0].style.display = "block";
  } else {
    // add profile button on nav
    document.querySelector(".login-button").style.display = "none";
    document.querySelector(".profile-button p").style.diplay = "block";
    document.querySelector(
      ".profile-button p"
    ).innerHTML = `${userDataObj.userName}`;
    console.log(dataArr);

    // only show sign up page
    warning[0].style.display = "none";
    mainsignUpsignInConatiner.style.display = "none";
    profileBtn.style.display = "flex";
    mainBodyContainer.style.display = "flex";
  }

  userName.value="";
  email[0].value="";
  password[0].value="";
});

console.log(dataArr);
// sign in => add user data
document.querySelector("#signInBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.length > 0) {
    let storeData = JSON.parse(localStorage.getItem("data"));

    // condition for all input
    if (
      email[1].value == "" ||
      password[1].value == ""
    ) {
      warning[1].style.display = "block";
    } else {
      warning[1].style.display = "none";
      storeData.forEach((item) => {
        if (
          email[1].value == item.email &&
          password[1].value == item.password
        ) {
          // add profile button on nav
          document.querySelector(".login-button").style.display = "none";
          document.querySelector(".profile-button p").style.diplay = "block";
          document.querySelector(
            ".profile-button p"
          ).innerHTML = "Profile";

          // only show sign in page
          warning[1].style.display = "none";
          mainsignUpsignInConatiner.style.display = "none";
          profileBtn.style.display = "flex";
          mainBodyContainer.style.display = "flex";
          document.querySelector(".userNotFound").style.display = "none";
        }else{
          document.querySelector(".userNotFound").style.display = "block";
        }
      });
    }
  }
});
