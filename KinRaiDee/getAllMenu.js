  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getFirestore , collection , getDocs , addDoc , deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
  const randomButton = document.getElementById("random");
  const firebaseConfig = {
    apiKey: "AIzaSyCVvum2e0tTFNzDcbrdYhrooxxNY7PgS2I",
    authDomain: "kinraidee-d5069.firebaseapp.com",
    projectId: "kinraidee-d5069",
    storageBucket: "kinraidee-d5069.appspot.com",
    messagingSenderId: "172084587459",
    appId: "1:172084587459:web:022050009563d7601ceb76",
    measurementId: "G-1WF8HLHJKP"
  };

  // Initialize Firebase
const getAllMenu = initializeApp(firebaseConfig);
const db = getFirestore(getAllMenu)
const table = document.getElementById("table")
const form = document.getElementById("addForm")

async function getFoods(db) {
   const foodsCol = collection(db,'foods')
   const foodSnapshot = await getDocs(foodsCol)
   return foodSnapshot
}

function showData(foods){
    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const  deleteCol = row.insertCell(1)
    nameCol.innerHTML = foods.data().name
    // console.log(JSON.stringify(foods));

    //delete button
    let btn = document.createElement('button')
    btn.textContent="delete"
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id',foods.id)
    //แทรกในคอลัม
    deleteCol.appendChild(btn)
    btn.addEventListener('click',(e)=>{
      let id = e.target.getAttribute('data-id');
      //doc define doc name and element id
      deleteDoc(doc(db,'foods',id))
      alert("Your menu deleted ! plz press f5")
    })

}
const FoodArray = [];
//get doc
const data = await getFoods(db)
// console.log("data"+ JSON.stringify(data))
data.forEach(foods => {
    // console.log(JSON.stringify(foods.data().name));
    showData(foods)
    FoodArray.push(foods.data().name);
});



function RandomFoods(){
  const randomValue = FoodArray[Math.floor(Math.random()*FoodArray.length)];
  console.log(randomValue)
//   alert(randomValue);
  form.name.value = randomValue;
}
// alert(randomValue);
const add = document.getElementById("add");
// get form
add.addEventListener('click',(e)=>{
  //ค้างค่าไว้ก่อน //check if nothing
  e.preventDefault()
  if (form.name.value != "") {
    addDoc(collection(db,'foods'),{
      name:form.name.value
    })
    alert("Your menu added ! plz press f5")
  } else {
    alert("Please type some food")
  }
  
  //reset form
  form.name.value=""

})

randomButton.addEventListener('click',RandomFoods);
