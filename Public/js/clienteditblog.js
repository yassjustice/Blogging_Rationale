// //declaring
// const save = document.querySelector(".save");

// //saving button
// save.addEventListener('click', (s) => {
//     s.preventDefault();
//     const id = window.location.pathname.split('/').pop();
//     console.log(id);
//     const formData = new FormData();  // Create a FormData object

//     // Assuming you have input elements with the 'name' attribute for title, desc, and image
//     formData.append('title', document.querySelector('[name="title"]').value);
//     formData.append('desc', document.querySelector('[name="desc"]').value);
//     formData.append('image', document.querySelector('[name="image"]').files[0]);  // Assuming it's an input type file
//     formData.append('author', document.querySelector('[name="author"]').value);  // Assuming it's an input type file


//     // fetch(`http://localhost:7500/editblog/${id}`, {
//     //     method: 'PUT',
//     //     body: formData  // Set the body of the request to the FormData object
//     // }).then(data => {
//     //     console.log('Success:', data);
//     //     window.location.href = '/myblogs';
//     // })
//     // .catch(error => {
//     //     console.error('Error:', error);
//     // });
// });

