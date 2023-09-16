const axios = require('axios');
const api = axios.create({
    baseURL:'http://localhost:3000/blogs',
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
//read my blogs

// exports.Read_myBlog = async (author) => {
//     try {
//       const response = await api.get(`?author=${author}`);
//       console.log("response sent "+ response.data);
//       return response;
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//       return null;
//     }
//   };



// author => api.get(`?author=${author}`)