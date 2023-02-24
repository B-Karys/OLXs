const UI_ELEMENTS = {

    AUTHORIZATION: {
        PAGE: document.querySelector('.authorization-container'),
        SWITCH_SIGN_IN_BUTTON: document.querySelector('#auth-first-sign-in-btn'),
        SWITCH_REGISTER_BUTTON: document.querySelector('#auth-first-register-btn'),
    },

    SIGN_IN: {
        AUTH_PAGE: document.querySelector('.auth-body'),
        SIGN_IN_FORM: document.querySelector('#auth-sign-in-form'),
        EMAIL: document.querySelector('#auth-sign-in-input'),
        PASSWORD: document.querySelector('#auth-sign-in-password-input'),
    },

    REGISTER: {
        REGISTER_PAGE: document.querySelector('.register-body'),
        REGISTER_FORM: document.querySelector('#auth-register-form'),
        NAME: document.querySelector('#auth-register-input-name'),
        EMAIL: document.querySelector('#auth-register-input'),
        PASSWORD: document.querySelector('#auth-register-password-input'),
    },

    VERIFY: {
        FORM: document.querySelector('#verify-form'),
        CODE: document.querySelector('#auth-register-code-input'),
    },

    CREATE_POST: {
        SWITCH_TO_PAGE_BUTTON: document.querySelector('#navigation-post-btn'),
        PAGE: document.querySelector('#create-post-page'),
        FORM: document.querySelector('#create-post-form'),
        NAME: document.querySelector('#create-post-name-input'),
        TAG: document.querySelector('#create-post-tag-input'),
        IMG: document.querySelector('#create-post-img-input'),
        DESCRIPTION: document.querySelector('#create-post-description-input'),
        SELLER: document.querySelector('#create-post-price-input'),
        PUBLISH_BUTTON: document.querySelector('#post-publish-button'),
    },

    POSTS: {
        FIND_FORM: document.querySelector('#find-posts-form'),
        PRODUCT: document.querySelector('#search-product-input'),
        TEMPLATE: document.querySelector('#single-post-template'),
        POSTS_LIST: document.querySelector('.post-page-products-list'),
        DELETE_FORM: document.querySelector('#delete-post-form'),
        PRODUCT_DELETE: document.querySelector('#delete-product-input'),
        SHOW_ALL_BUTTON: document.querySelector('#show-all-products-button'),
    },

    UPDATE_POST: {
        FORM: document.querySelector('#update-post-form'),
        ID: document.querySelector('#update-id'),
        NAME: document.querySelector('#update-name'),
        DESCRIPTION: document.querySelector('#update-description'),
        IAMGE: document.querySelector('#update-image'),
        SELLER: document.querySelector('#update-seller'),
        CATEGORIES: document.querySelector('#update-categories'),
    },

    PROFILE: {
        PROFILE_BUTTON: document.querySelector('#profile-button'),
        PROFILE_PAGE: document.querySelector('#profile-page'),
        DELETE: document.querySelector('#delete-me-button'),
        UPDATE_FORM: document.querySelector('#update-user-form'),
        UPDATE_NAME: document.querySelector('#update-user-name'),
        UPDATE_EMAIL: document.querySelector('#update-user-email'),
        CHANGE_FORM: document.querySelector('#change-password-form'),
        CHANGE_EMAIL: document.querySelector('#change-password-email'),
        CHANGE_PASWORD: document.querySelector('#change-password-password'),
        CHANGE_NEW: document.querySelector('#change-password-new'),
    },
}

export { UI_ELEMENTS }