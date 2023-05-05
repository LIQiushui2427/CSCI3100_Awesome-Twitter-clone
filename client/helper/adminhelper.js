import client from '../config'


/*
    This function sends DELETE request to /admin/deleteUser and performs delete operation on the user.
*/
export async function deleteUser(username){
    try {
        //get the token
        const token = localStorage.getItem('token');
        //send the request with proper header
        const {data,status} = await client.delete('/admin/deleteUser',/* {username},*/ { headers : { "Authorization" : `Bearer ${token}`},data:{username:username}});
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Fail to delete user!"})
    }
}
