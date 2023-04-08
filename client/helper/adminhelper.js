import client from '../config'

/** Make API Requests */

/** delete user */
export async function deleteUser(username){
    try {
        //alert("username:"+username);
        const token = localStorage.getItem('token');
        const {data,status} = await client.delete('/admin/deleteUser',/* {username},*/ { headers : { "Authorization" : `Bearer ${token}`},data:{username:username}});
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Fail to delete user!"})
    }
}
