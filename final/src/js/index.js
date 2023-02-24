import { UI_ELEMENTS } from "./views.js";
import Cookies from 'js-cookie';

import {
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
 from "./server.js";

UI_ELEMENTS.AUTHORIZATION.SWITCH_SIGN_IN_BUTTON.addEventListener('click', function(event) {
    event.preventDefault();
    switchToSignInPage();
})
UI_ELEMENTS.AUTHORIZATION.SWITCH_REGISTER_BUTTON.addEventListener('click', function(event)  {
    event.preventDefault();
    switchToRegsiterPage();
})
UI_ELEMENTS.REGISTER.REGISTER_FORM.addEventListener('submit', function(event)   {
    event.preventDefault();
    sendRegsiterData();
})
UI_ELEMENTS.SIGN_IN.SIGN_IN_FORM.addEventListener('submit', function(event) {
    event.preventDefault();
    sendLoginData();
})
UI_ELEMENTS.VERIFY.FORM.addEventListener('submit', function(event)  {
    event.preventDefault();
    sendVerificationToken()
})
UI_ELEMENTS.CREATE_POST.SWITCH_TO_PAGE_BUTTON.addEventListener('click', function(event) {
    event.preventDefault();
    openCreatePostPage();
})
UI_ELEMENTS.CREATE_POST.FORM.addEventListener('submit', function(event) {
    event.preventDefault();
    sendCreatePostData();
})
UI_ELEMENTS.POSTS.FIND_FORM.addEventListener('submit', function(event)  {
    event.preventDefault();
    searchProductById();
})
UI_ELEMENTS.POSTS.DELETE_FORM.addEventListener('submit', function(event)    {
    event.preventDefault();
    sendDeletedData();
})
UI_ELEMENTS.POSTS.SHOW_ALL_BUTTON.addEventListener('click', function()  {
    getProductsList();
})
UI_ELEMENTS.PROFILE.PROFILE_BUTTON.addEventListener('click', function() {
    switchToProfilePage();
})
UI_ELEMENTS.PROFILE.DELETE.addEventListener('click', function() {
    deleteUser();
    window.location.reload();
})
UI_ELEMENTS.PROFILE.UPDATE_FORM.addEventListener('submit', function(event)   {
    event.preventDefault();
    sendUpdateData();
})
UI_ELEMENTS.PROFILE.CHANGE_FORM.addEventListener('submit', function(event) {
    event.preventDefault();
    sendChangeData();
})
UI_ELEMENTS.UPDATE_POST.FORM.addEventListener('submit', function(event) {
    event.preventDefault();
    sendUpdatePostData();
})

async function sendUpdatePostData() {
    try{
        let id = UI_ELEMENTS.UPDATE_POST.ID.value;
        let post = {
            name: UI_ELEMENTS.UPDATE_POST.NAME.value,
            description: UI_ELEMENTS.UPDATE_POST.DESCRIPTION.value,
            imageURL: UI_ELEMENTS.UPDATE_POST.IAMGE.value,
            seller: UI_ELEMENTS.UPDATE_POST.SELLER.value,
            categories: [UI_ELEMENTS.UPDATE_POST.CATEGORIES.value],
        }
        let result = updateProduct(id, post);
        console.log(result);
        alert('Successfully');

    }catch(err){
        alert('Wrong');
        console.log(err)
    }
}

async function sendChangeData() {
    try{
        let user = {
            email: UI_ELEMENTS.PROFILE.CHANGE_EMAIL.value,
            password: UI_ELEMENTS.PROFILE.CHANGE_PASWORD.value,
            newPassword: UI_ELEMENTS.PROFILE.CHANGE_NEW.value,
        }
        changePassword(user);
        alert('Changed successfully!');
    }catch(err){    
        console.log(err);
        alert('Wrong!');
    }
}

async function sendUpdateData() {
    try{
        let user = {
            name: UI_ELEMENTS.PROFILE.UPDATE_NAME.value,
            email: UI_ELEMENTS.PROFILE.UPDATE_EMAIL.value,
            password: 'mypass123',
        }
        updateUser(user);
        alert('Updated successfully!')

    }catch(err){
        alert('Wrong');
        console.log(err)
    }
}

try{
    healthcheck();
}catch(err){
    return HttpNotFound();
}

function switchToProfilePage()  {
    if(UI_ELEMENTS.PROFILE.PROFILE_BUTTON.value === 'OFF')    {
        UI_ELEMENTS.PROFILE.PROFILE_PAGE.classList.remove('hider');
        UI_ELEMENTS.PROFILE.PROFILE_BUTTON.value = 'ON';
    }else{
        UI_ELEMENTS.PROFILE.PROFILE_PAGE.classList.add('hider');
        UI_ELEMENTS.PROFILE.PROFILE_BUTTON.value = 'OFF';
    }
}

async function sendDeletedData()    {
    try{
        let id = UI_ELEMENTS.POSTS.PRODUCT_DELETE.value;
        let result = await deleteSingleProductById(id);
        alert(`${result.message}`);
    }catch(err){
        alert('Not found');
    }
}

async function searchProductById()  {

    try{
        let id = UI_ELEMENTS.POSTS.PRODUCT.value;
        console.log(id)
        let post = await getSingleProductById(id);
        console.log(post);
        startRenderPosts(post);
    }catch(err){
        console.log(err);
        alert('Product not found');
    }

}

async function getProductsList()    {
    createPostsContainer();
    for(let i = 1; i < 15; i++){
        try{
            let post = await getSingleProductById(i);
            renderPosts(post);
        }catch(err){}
        
    }
}



function startRenderPosts(post)     {
    createPostsContainer();
    renderPosts(post);
} 

function renderPosts(post)  {
    let clon = UI_ELEMENTS.POSTS.TEMPLATE.content.cloneNode(true);

    clon.querySelector('.product-info-title').textContent = post.product.name;
    clon.querySelector('.product-info-price').textContent = post.product.seller;
    clon.querySelector('.product-info-date-location').textContent = post.product.description;
    clon.querySelector('.product-categories').textContent = post.product.categories[0];
    clon.querySelector('.prouct-img').setAttribute('src', post.product.imageURL);

    UI_ELEMENTS.POSTS.POSTS_LIST?.querySelector('.posts-container-generated')?.append(clon);
}

async function sendCreatePostData() {
    try{
        let post = {
            name: UI_ELEMENTS.CREATE_POST.NAME.value,
            description: UI_ELEMENTS.CREATE_POST.DESCRIPTION.value,
            imageURL: UI_ELEMENTS.CREATE_POST.IMG.value,
            seller: UI_ELEMENTS.CREATE_POST.SELLER.value,
            categories: [UI_ELEMENTS.CREATE_POST.TAG.value],
        }
        let result = await createPost(post)
        console.log(result)
    }catch(err){
        console.log(err);
        alert('Wrong data!');
    }
}

async function openCreatePostPage()     {
    try{
        let result = await getUserById();
        if(result.user.activated === true)    {
            switchToCreatePostPage();
        }else{
            alert('Verify your email!');
            UI_ELEMENTS.AUTHORIZATION.PAGE.classList.remove('hider');
            switchToRegsiterPage();
            UI_ELEMENTS.VERIFY.FORM.classList.remove('hider');
            return 0;
        }
    }catch(err){
        console.log(err);
    }
}

function createPostsContainer()     {

    try{
        document.querySelector('.posts-container-generated').remove();
    }catch{}
    

    let div = document.createElement('div');
    div.classList.add('posts-container-generated');
    UI_ELEMENTS.POSTS.POSTS_LIST.append(div);
}

function switchToCreatePostPage()   {
    if(UI_ELEMENTS.CREATE_POST.SWITCH_TO_PAGE_BUTTON.value === 'OFF')    {

        UI_ELEMENTS.CREATE_POST.PAGE.classList.remove('hider');
        UI_ELEMENTS.CREATE_POST.SWITCH_TO_PAGE_BUTTON.value = 'ON';
    }else{
        UI_ELEMENTS.CREATE_POST.PAGE.classList.add('hider');
        UI_ELEMENTS.CREATE_POST.SWITCH_TO_PAGE_BUTTON.value = 'OFF';
    }
}

async function sendVerificationToken()  {
    try{
        let token = {
            token: UI_ELEMENTS.VERIFY.CODE.value,
        };
    
        let result = await activateUserAccount(token);
        console.log(result);

        alert('Verification passed');

    }catch(error){
        alert('Incorrect token');
    }
}

async function sendRegsiterData()     {
    try{
        let user = {
            name: UI_ELEMENTS.REGISTER.NAME.value,
            email: UI_ELEMENTS.REGISTER.EMAIL.value,
            password: UI_ELEMENTS.REGISTER.PASSWORD.value,
        }
        let result = await register(user);
        Cookies.set('id', result.user.id)

        alert('Email sent. Complete verification.')
        UI_ELEMENTS.VERIFY.FORM.classList.remove('hider');

    }catch(err){
        alert('Incorrect data')
    }   
}

async function sendLoginData()    {
    try{
        let user = {
            email: UI_ELEMENTS.SIGN_IN.EMAIL.value,
            password: UI_ELEMENTS.SIGN_IN.PASSWORD.value,
        }
        let result = await login(user);
        Cookies.set('token', result.authentication_token.token);
        switchToSite();
        getProductsList();

    }catch(err){
        console.log('Incorrect email or password! Try again:)');
    }
}

function switchToSite()     {
    UI_ELEMENTS.AUTHORIZATION.PAGE.classList.add('hider');
}

function switchToSignInPage()   {
    UI_ELEMENTS.SIGN_IN.AUTH_PAGE.classList.remove('hider');
    UI_ELEMENTS.REGISTER.REGISTER_PAGE.classList.add('hider');
}

function switchToRegsiterPage()     {
    UI_ELEMENTS.REGISTER.REGISTER_PAGE.classList.remove('hider');
    UI_ELEMENTS.SIGN_IN.AUTH_PAGE.classList.add('hider');
}