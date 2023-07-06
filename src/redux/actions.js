/*
 * action types
 */
export const BASE_URL = "http://10.211.55.4/";
export const BASE_URL_FRONT = "http://localhost:3000/"


//export const BASE_URL = "https://backends.kulpayng.com/"
export const stateKeys = {
    PAGE_CLASS: '__pageClass',
    SITE_NAME: '__siteName',
    SITE_DOMAIN: '__siteDomain',
    OPEN_DIALOG: '__openDialog',
    CLOSE_DIALOG: '__closeDialog',
    DIALOG_ACTION: '__dialogAction',
    DIALOG_TITLE: '__dialogTitle',
    DIALOG_CONTENT: '__dialogContent',
    DIALOG_ACTION_TEXT: '__dialogActionText',
    SHOW_ADD_TO_CART_MODAL: '__addToCartModal',
    ADD_TO_CART_MODAL_SERVICE: '__addToCartModalService',
    SERVICES: '__services',
    PRINT_ORDER: '__print_order',
    CART: '__cart',
    USER: '_IDENTITY_',
    TOAST: '__toast',
};
export const BUG_ADDED = "BUG_ADDED";
export const BUG_REMOVED = "BUG_REMOVED";
export const BUG_RESOLVED = "BUG_RESOLVED";


export const mapStateToProps = (state, oldProps) => {
    let props = {};
    for (let stateKeysKey in stateKeys) {
        props[stateKeys[stateKeysKey]] = typeof state[stateKeys[stateKeysKey]] !== 'undefined'
            ? state[stateKeys[stateKeysKey]]
            : null;
    }

    return props;
};

export const mapDispatchToProps = (dispatch) => {
    return {
        'setState': (value, key) => {
            dispatch({
                'type': key,
                'value': value
            });
        }
    }
};


