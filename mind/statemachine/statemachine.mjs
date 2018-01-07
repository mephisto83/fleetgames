export const STATES = {
    INIT: 'INIT',
    LOAD_RESOURCES_ASYNC: 'LOAD_RESOURCES_ASYNC',
    LOADING_RESOURCES_ASYNC: 'LOADING_RESOURCES_ASYNC',
    LOADING_RESOURCES_FAILED: 'LOADING_RESOURCES_FAILED',
    RETRY_LOAD_RESOURCE_ASYNC: 'RETRY_LOAD_RESOURCE_ASYNC',
    LOADING_RESOURCES_SUCCESS: 'LOADING_RESOURCES_SUCCESS',
    SELECT_PROFILE: 'SELECT_PROFILE',
    SELECT_MACHINE_PROFILE: 'SELECT_MACHINE_PROFILE',
    CHECK_IF_MACHINE_HAS_PROFILE: 'CHECK_IF_MACHINE_HAS_PROFILE',
    CHECKING_IF_MACHINE_HAS_PROFILE: 'CHECKING_IF_MACHINE_HAS_PROFILE',
    CHECKING_IF_MACHINE_HAS_PROFILE_FAILED: 'CHECKING_IF_MACHINE_HAS_PROFILE_FAILED',
    CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS: 'CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS',
    READY: 'READY'
}

export const GAMESTATES = {
    INIT: 'GAME_INIT',
    READY: 'GAME_READY',
    CHOOSE_FARM_ACTIVITY: 'CHOOSE_FARM_ACTIVITY',
    PERFORM_ACTIVITY: 'PERFORM_ACTIVITY',
    ENDING_ACTIVITY: 'ENDING_ACTIVITY',
    END_ACTIVITY: 'END_ACTIVITY',
    ENDING_ACTIVITY_FAILED: 'ENDING_ACTIVITY_FAILED',
    ENDING_ACTIVITY_SUCCESS: 'ENDING_ACTIVITY_SUCCESS',
    CHOOSING_FARM_ACTIVITY: 'CHOOSING_FARM_ACTIVITY',
    CHOOSING_FARM_ACTIVITY_FAILED: 'CHOOSING_FARM_ACTIVITY_FAILED',
    CHOOSING_FARM_ACTIVITY_SUCCESS: 'CHOOSING_FARM_ACTIVITY_SUCCESS',
    CANCEL_CHOOSE_FARM_ACTIVITY: 'CANCEL_CHOOSE_FARM_ACTIVITY',
    GO_TO_STORE: 'GO_TO_STORE',
    AT_THE_STORE: 'AT_THE_STORE',
    GOING_TO_STORE: 'GOING_TO_STORE',
    GO_TO_STORE_SUCCESS: 'GO_TO_STORE_SUCCESS',
    GOING_TO_STORE_FAILED: 'GOING_TO_STORE_FAILED',
    VIEW_ITEM: 'VIEW_ITEM',
    VIEWING_ITEM: 'VIEWING_ITEM',
    VIEW_ITEM_SUCCESS: 'VIEW_ITEM_SUCCESS',
    VIEW_ITEM_FAILED: 'VIEW_ITEM_FAILED',
    SEARCH_FOR_ITEM: 'SEARCH_FOR_ITEM',
    SEARCHING_FOR_ITEM: 'SEARCHING_FOR_ITEM',
    SEARCH_FOR_ITEM_FAILED: 'SEARCH_FOR_ITEM_FAILED',
    SEARCH_FOR_ITEM_SUCCESS: 'SEARCH_FOR_ITEM_SUCCESS',
    PURCHASE_ITEM: 'PURCHASE_ITEM',
    PURCHASING_ITEM: 'PURCHASING_ITEM',
    PURCHASE_ITEM_SUCCESS: 'PURCHASE_ITEM_SUCCESS',
    PURCHASE_ITEM_FAILED: 'PURCHASE_ITEM_FAILED',
    VIEW_INVENTORY: 'VIEW_INVENTORY',
    UPDATE_INVENTORY: 'UPDATE_INVENTORY',
    UPDATING_INVENTORY: 'UPDATING_INVENTORY',
    UPDATE_INVENTORY_ITEM: 'UPDATE_INVENTORY_ITEM',
    UPDATING_INVENTORY_ITEM: 'UPDATING_INVENTORY_ITEM',
    UPDATE_INVENTORY_ITEM_SUCCESS: 'UPDATE_INVENTORY_ITEM_SUCCESS',
    UPDATE_INVENTORY_ITEM_FAILED: 'UPDATE_INVENTORY_ITEM_FAILED',
    UPDATE_INVENTORY_SUCCESS: 'UPDATE_INVENTORY_SUCCESS',
    UPDATE_INVENTORY_FAILED: 'UPDATE_INVENTORY_FAILED',

    INVENTORY_HISTORY: 'INVENTORY_HISTORY',
    INVENTORY_VIEWING_HISTORY: 'INVENTORY_VIEWING_HISTORY',
    INVENTORY_HISTORY_SUCCESS: 'INVENTORY_HISTORY_SUCCESS',
    INVENTORY_HISTORY_FAILED: 'INVENTORY_HISTORY_FAILED',

    INVENTORY_HISTORY_ITEM: 'INVENTORY_HISTORY_ITEM',
    INVENTORY_VIEWING_HISTORY_ITEM: 'INVENTORY_VIEWING_HISTORY_ITEM',
    INVENTORY_HISTORY_ITEM_SUCCESS: 'INVENTORY_HISTORY_ITEM_SUCCESS',
    INVENTORY_HISTORY_ITEM_FAILED: 'INVENTORY_HISTORY_ITEM_FAILED',

    VENDOR_STORE: 'VENDOR_STORE',
    VIEWING_INVENTORY: 'VIEWING_INVENTORY',
    VIEW_INVENTORY_FAILED: 'VIEW_INVENTORY_FAILED',
    VIEW_INVENTORY_SUCCESS: 'VIEW_INVENTORY_SUCCESS'
}

const vendoractions = [GAMESTATES.VENDOR_STORE, GAMESTATES.VIEW_INVENTORY, GAMESTATES.UPDATE_INVENTORY, GAMESTATES.INVENTORY_HISTORY];
const storeactions = [GAMESTATES.AT_THE_STORE, GAMESTATES.PURCHASE_ITEM, GAMESTATES.VIEW_ITEM, GAMESTATES.SEARCH_FOR_ITEM];

export const PROFILETYPES = {
    UNKNOWN: 'UNKNOWN',
    MACHINE: 'MACHINE'
}

export class StateMachine {
    constructor() {
        this.state = null;
        this.gameStack = [];
        this.gameState = GAMESTATES.INIT;
        this.profileType = PROFILETYPES.UNKNOWN;
    }
    init() {
        this.state = STATES.INIT;
    }
    getCurrentState() {
        return this.state;
    }
    getProfileType() {
        return this.profileType;
    }
    setProfileType(type) {
        this.profileType = type;
    }
    updateProfileType() {
        switch (this.state) {
            case STATES.CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS:
                this.setProfileType(PROFILETYPES.MACHINE);
                break;
        }
    }
    updateState(nextState) {
        var ok = false;
        switch (this.state) {
            case STATES.INIT:
                ok = ([STATES.SELECT_PROFILE].indexOf(nextState) !== -1);
                break;
            case STATES.SELECT_PROFILE:
                ok = ([STATES.SELECT_MACHINE_PROFILE].indexOf(nextState) !== -1);
                break;
            case STATES.SELECT_MACHINE_PROFILE:
                ok = ([STATES.CHECK_IF_MACHINE_HAS_PROFILE].indexOf(nextState) !== -1);
                break;
            case STATES.CHECK_IF_MACHINE_HAS_PROFILE:
                ok = ([STATES.CHECKING_IF_MACHINE_HAS_PROFILE].indexOf(nextState) !== -1);
                break;
            case STATES.CHECKING_IF_MACHINE_HAS_PROFILE:
                ok = ([STATES.CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS, STATES.CHECKING_IF_MACHINE_HAS_PROFILE_FAILED].indexOf(nextState) !== -1);
                break;
            case STATES.CHECKING_IF_MACHINE_HAS_PROFILE_FAILED:
                ok = ([STATES.SELECT_PROFILE].indexOf(nextState) !== -1);
                break;
            case STATES.CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS:
                ok = ([STATES.LOAD_RESOURCES_ASYNC].indexOf(nextState) !== -1);
                break;
            case STATES.LOAD_RESOURCES_ASYNC:
                ok = ([STATES.LOADING_RESOURCES_ASYNC].indexOf(nextState) !== -1);
                break;
            case STATES.LOADING_RESOURCES_ASYNC:
                ok = ([STATES.LOADING_RESOURCES_SUCCESS, STATES.LOADING_RESOURCES_FAILED].indexOf(nextState) !== -1);
                break;
            case STATES.LOADING_RESOURCES_FAILED:
                ok = ([STATES.RETRY_LOAD_RESOURCE_ASYNC].indexOf(nextState) !== -1);
                break;
            case STATES.RETRY_LOAD_RESOURCE_ASYNC:
                ok = ([STATES.LOAD_RESOURCES_ASYNC].indexOf(nextState) !== -1);
                break;
            case STATES.LOADING_RESOURCES_SUCCESS:
                ok = ([STATES.READY].indexOf(nextState) !== -1);
                break;
            case STATES.READY:
                break;
        }

        if (ok && nextState) {
            this.state = nextState;
            this.updateProfileType();
        }
        else {
            this.updateGameState(nextState);
        }
        if (this.debug)
            console.log(`currentState  : ${this.state}`);
        return this.state;
    }

    updateGameState(nextState) {
        var ok = false;
        switch (this.gameState) {
            case GAMESTATES.INIT:
                ok = ([GAMESTATES.READY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.READY:
                ok = ([GAMESTATES.CHOOSE_FARM_ACTIVITY, GAMESTATES.GO_TO_STORE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHOOSE_FARM_ACTIVITY:
                ok = ([GAMESTATES.CHOOSING_FARM_ACTIVITY, GAMESTATES.CANCEL_CHOOSE_FARM_ACTIVITY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHOOSING_FARM_ACTIVITY:
                ok = ([GAMESTATES.CHOOSING_FARM_ACTIVITY_FAILED, GAMESTATES.CHOOSING_FARM_ACTIVITY_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHOOSING_FARM_ACTIVITY_FAILED:
                ok = ([GAMESTATES.READY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHOOSING_FARM_ACTIVITY_SUCCESS:
                ok = ([GAMESTATES.PERFORM_ACTIVITY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PERFORM_ACTIVITY:
                ok = ([GAMESTATES.END_ACTIVITY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.END_ACTIVITY:
                ok = ([GAMESTATES.ENDING_ACTIVITY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ENDING_ACTIVITY:
                ok = ([GAMESTATES.ENDING_ACTIVITY_FAILED, GAMESTATES.ENDING_ACTIVITY_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ENDING_ACTIVITY_FAILED:
                ok = ([GAMESTATES.END_ACTIVITY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ENDING_ACTIVITY_SUCCESS:
                ok = ([GAMESTATES.CHOOSE_FARM_ACTIVITY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CANCEL_CHOOSE_FARM_ACTIVITY:
                ok = ([GAMESTATES.READY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GOING_TO_STORE:
                ok = ([GAMESTATES.GOING_TO_STORE_FAILED, GAMESTATES.GO_TO_STORE_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GOING_TO_STORE_FAILED:
                ok = ([GAMESTATES.READY].indexOf(nextState) !== -1);
                break
            case GAMESTATES.GO_TO_STORE:
                ok = ([GAMESTATES.GOING_TO_STORE, GAMESTATES.VIEW_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.AT_THE_STORE:
                ok = ([...storeactions, ...vendoractions, GAMESTATES.READY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GO_TO_STORE_SUCCESS:
                ok = ([GAMESTATES.AT_THE_STORE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEWING_ITEM:
                ok = ([GAMESTATES.VIEW_ITEM_SUCCESS, GAMESTATES.VIEW_ITEM_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEW_ITEM_SUCCESS:
                ok = ([GAMESTATES.VIEW_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEW_ITEM:
                ok = ([...storeactions, GAMESTATES.VIEWING_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEW_ITEM_FAILED:
                ok = ([GAMESTATES.VIEW_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SEARCH_FOR_ITEM:
                ok = ([...storeactions, GAMESTATES.SEARCHING_FOR_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SEARCHING_FOR_ITEM:
                ok = ([GAMESTATES.SEARCH_FOR_ITEM_SUCCESS, GAMESTATES.SEARCH_FOR_ITEM_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SEARCH_FOR_ITEM_SUCCESS:
                ok = ([GAMESTATES.VIEW_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SEARCH_FOR_ITEM_FAILED:
                ok = ([GAMESTATES.SEARCH_FOR_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PURCHASE_ITEM:
                ok = ([...storeactions, GAMESTATES.PURCHASING_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PURCHASING_ITEM:
                ok = ([GAMESTATES.PURCHASE_ITEM_FAILED, GAMESTATES.PURCHASE_ITEM_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PURCHASE_ITEM_FAILED:
                ok = ([GAMESTATES.PURCHASE_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PURCHASE_ITEM_SUCCESS:
                ok = ([GAMESTATES.PURCHASE_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VENDOR_STORE:
                ok = ([...vendoractions, GAMESTATES.AT_THE_STORE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEW_INVENTORY:
                ok = ([...vendoractions, GAMESTATES.VIEWING_INVENTORY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEWING_INVENTORY:
                ok = ([GAMESTATES.VIEW_INVENTORY_SUCCESS, GAMESTATES.VIEW_INVENTORY_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.VIEW_INVENTORY_SUCCESS:
            case GAMESTATES.VIEW_INVENTORY_FAILED:
                ok = ([GAMESTATES.VIEW_INVENTORY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.UPDATE_INVENTORY:
                ok = ([...vendoractions, GAMESTATES.UPDATING_INVENTORY, GAMESTATES.UPDATE_INVENTORY_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.UPDATING_INVENTORY:
                ok = ([GAMESTATES.UPDATE_INVENTORY_FAILED, GAMESTATES.UPDATE_INVENTORY_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.UPDATE_INVENTORY_SUCCESS:
            case GAMESTATES.UPDATE_INVENTORY_FAILED:
                ok = ([GAMESTATES.UPDATE_INVENTORY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.UPDATE_INVENTORY_ITEM:
                ok = ([GAMESTATES.UPDATING_INVENTORY_ITEM, GAMESTATES.UPDATE_INVENTORY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.UPDATING_INVENTORY_ITEM:
                ok = ([GAMESTATES.UPDATE_INVENTORY_ITEM_FAILED, GAMESTATES.UPDATE_INVENTORY_ITEM_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.UPDATE_INVENTORY_ITEM_SUCCESS:
            case GAMESTATES.UPDATE_INVENTORY_ITEM_FAILED:
                ok = ([GAMESTATES.UPDATE_INVENTORY_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.INVENTORY_HISTORY:
                ok = ([...vendoractions, GAMESTATES.INVENTORY_VIEWING_HISTORY, GAMESTATES.INVENTORY_HISTORY_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.INVENTORY_VIEWING_HISTORY:
                ok = ([GAMESTATES.INVENTORY_HISTORY_SUCCESS, GAMESTATES.INVENTORY_HISTORY_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.INVENTORY_HISTORY_SUCCESS:
            case GAMESTATES.INVENTORY_HISTORY_FAILED:
                ok = ([GAMESTATES.INVENTORY_HISTORY].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.INVENTORY_VIEWING_HISTORY_ITEM:
                ok = ([GAMESTATES.INVENTORY_HISTORY_ITEM_SUCCESS, GAMESTATES.INVENTORY_HISTORY_ITEM_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.INVENTORY_HISTORY_ITEM_SUCCESS:
            case GAMESTATES.INVENTORY_HISTORY_ITEM_FAILED:
                ok = ([GAMESTATES.INVENTORY_HISTORY_ITEM].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.INVENTORY_HISTORY_ITEM:
                ok = ([GAMESTATES.INVENTORY_HISTORY, GAMESTATES.INVENTORY_VIEWING_HISTORY_ITEM].indexOf(nextState) !== -1);
                break;
        }

        if (ok && nextState) {
            this.gameState = nextState;
        }

        if (this.debug)
            console.log(`current gameState  : ${this.gameState}`);
        return this.gameState;
    }
}