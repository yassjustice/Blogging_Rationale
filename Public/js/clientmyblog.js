
//declarations
const editting = document.querySelectorAll(".edit");
const deleting = document.querySelectorAll(".delete");



//edit button
editting.forEach(blog => {
    blog.addEventListener('click', e =>{
        e.preventDefault()
        console.log(e.currentTarget.dataset.id);
        const id = e.currentTarget.dataset.id;
        fetch(`http://localhost:7500/editblog/${id}`);
        window.location.href = `/editblog/${id}`; 

    })
});


//delete button
deleting.forEach(blog => {
    blog.addEventListener('click', e =>{
        e.preventDefault()
        console.log(e.currentTarget.dataset.id);
        const id = e.currentTarget.dataset.id;
        fetch(`http://localhost:7500/delete/${id}`
        , {
            method: 'DELETE'
        }
        );
        window.location.href = '/myblogs'; 
        window.location.reload();
    })
});

