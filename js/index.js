

// // console.log(56);
// const loadPhone = async (ValueOfInput, isShowAll) => {
//     const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${ValueOfInput}`);
//     const data = await res.json();
//     const phones = data.data;
//     displayPhones(phones, isShowAll);
// }
// // function loadDisplay(pho)
// const displayPhones = (phones, isShowAll) =>{
//     // console.log(phones);
//     const PhoneDiv = document.getElementById('Phone-container');
//     PhoneDiv.textContent = '';
//     const ShowallContainer = document.getElementById('Show-all-container');
//     // Show All Buttton
//     if(phones.length > 12){
//       ShowallContainer.classList.remove('hidden');
//     }
//     else{
//       ShowallContainer.classList.add('hidden');
//     }
//     console.log('is Show all', isShowAll);
// // display Show all
//     if(!isShowAll){
//       phones = phones.slice(0, 12);
//     }

//     phones.forEach(phone => {
//         console.log(phone);
//         const phoneCard = document.createElement('div');
//         phoneCard.classList = `card card-compact w-96 bg-base-100 shadow-xl mt-6 p-9`;
//         phoneCard.innerHTML = `
//         <figure><img src="${phone.image}" alt="Shoes" /></figure>
//                     <div class="card-body">
//                       <h2 class="card-title">${phone.phone_name}</h2>
//                       <p>${phone.brand}</p>
//                       <p>${phone.slug}</p>
//                       <div class="card-actions justify-end">
//                         <button class="btn btn-primary">Buy Now</button>
//                       </div>
//                     </div>
//         `;
//         PhoneDiv.appendChild(phoneCard);
//     });
//     // hight Loading Spinner
//     toggleloading(false);
// }
// // button Search
// const searchhandel = (isShowAll) => {
//   toggleloading(true);
//   const searchValue = document.getElementById('input');
//   const ValueOfInput = searchValue.value;
//   searchValue.value = '';
//   loadPhone(ValueOfInput, isShowAll);
//   console.log(ValueOfInput);
// }

// // Ring
// const  toggleloading = (isloading) => {
//   const loadSpinner = document.getElementById('Ring');
//   // loadSpinner.classList.remove('hidden');
//   if(isloading){
//     loadSpinner.classList.remove('hidden');
//   }
//   else{
//     loadSpinner.classList.add('hidden');
//   }
// }
// // handleShowAll Button handle
// const handleShowAll = () =>{
//   searchhandel(true);

// }

const loadPhone = async (valueOfInput, isShowAll) => {
  try {
      const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${valueOfInput}`);
      const data = await res.json();
      const phones = data.data;
      displayPhones(phones, isShowAll);
  } catch (error) {
      console.error('Error loading phone data:', error);
      toggleloading(false); // Hide loading spinner in case of error
  }
}

const displayPhones = (phones, isShowAll) => {
  const phoneDiv = document.getElementById('Phone-container');
  phoneDiv.textContent = '';

  const showAllContainer = document.getElementById('Show-all-container');
  if (phones.length > 12) {
      showAllContainer.classList.remove('hidden');
  } else {
      showAllContainer.classList.add('hidden');
  }

  if (!isShowAll) {
      phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
      const phoneCard = document.createElement('div');
      phoneCard.classList = `card card-compact w-96 bg-base-100 shadow-xl mt-6 p-9`;
      phoneCard.innerHTML = `
          <figure><img src="${phone.image}" alt="Phone" /></figure>
          <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>${phone.brand}</p>
              <div class="card-actions justify-end">
                  <button onclick="viewDitels('${phone.slug}')" class="btn btn-primary">Show Details</button>
                 
              </div>
          </div>
      `;
      phoneDiv.appendChild(phoneCard);
  });

  toggleloading(false); // Hide loading spinner after displaying phones
}

const searchHandler = (isShowAll) => {
  toggleloading(true);
  const searchValue = document.getElementById('input').value;
  loadPhone(searchValue, isShowAll);
}

const toggleloading = (isLoading) => {
  const loadSpinner = document.getElementById('Ring');
  if (isLoading) {
      loadSpinner.classList.remove('hidden');
  } else {
      loadSpinner.classList.add('hidden');
  }
}
const viewDitels = async(id) => {
  console.log('click',id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const ditels = await res.json();
  // console.log(ditels);
  const phone = ditels.data;
  console.log(phone);
  showDitels(phone);

}
const showDitels = (phone) =>{
  // Show Phone
  const viewCard = document.getElementById('my_modal_4');
  const divCard = document.createElement('div');
  divCard.classList = `modal-box w-11/12 max-w-5xl`;
  divCard.innerHTML = `<h3 class="font-bold text-lg">${phone.brand}</h3>
  <img class="py-4" src="${phone.image}" alt="Shoes" />
  <div class="modal-action">
    <form method="dialog">
      <!-- if there is a button, it will close the modal -->
      <button class="btn">Close</button>
    </form>
  </div>`;
  viewCard.appendChild(divCard);

  my_modal_4.showModal();
}
const handleShowAll = () => {
  searchHandler(true);
}

