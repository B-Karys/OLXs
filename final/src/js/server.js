import Cookies from 'js-cookie';

const SERVER_DATA = {
    SERVER_URL : 'http://localhost:4000',
}

async function register(user)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function login(user)  {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/tokens/authentication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function getUserById()    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/users/${Cookies.get('id')}`, {
        method: 'GET',
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function activateUserAccount(token)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/users/activated`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(token)
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function createPost(post)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(post)
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function getSingleProductById(id)   {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/product/${id}`, {
        method: 'GET',
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function deleteSingleProductById(id)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/product/${id}`, {
        method: 'DELETE',
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function healthcheck()    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/healthcheck`, {
        method: 'GET',
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function deleteUser()    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/users/${Cookies.get('id')}`, {
        method: 'DELETE',
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function updateUser(user)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/users/${Cookies.get('id')}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function changePassword(user)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/changeUserPassword`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();
    console.log(result)
    return result;
}

async function updateProduct(id, product)    {
    let response = await fetch(`${SERVER_DATA.SERVER_URL}/v1/product/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(product)
    })

    let result = await response.json();
    console.log(result)
    return result;
}



export {
    register,
    login,
    getUserById,
    activateUserAccount,
    createPost,
    getSingleProductById,
    deleteSingleProductById,
    healthcheck,
    deleteUser,
    updateUser,
    changePassword,
    updateProduct,
 }