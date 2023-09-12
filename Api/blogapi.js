const axios = require('axios');
const api = axios.create({
    baseURL:'http://localhost:7500/blogs',
    Headers:{
        'Content-Type': 'application/json'
    }

}

)
//CRUD SENT FROM API
//ADD BLOG
exports.Add_Blog = blog => api.post('/',blog);
//Delete BLOG BY ID
exports.Delete_Blog = id => api.delete(`/${id}`);
//Update BLOG BY ID
exports.Update_Blog = (id, updatedBlog) => api.put(`/${id}`, updatedBlog);
//READ BLOG BY ID
exports.Read_Blog = id => api.get(`/${id}`);