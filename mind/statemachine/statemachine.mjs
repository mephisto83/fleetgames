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
    VIEW_INVENTORY_SUCCESS: 'VIEW_INVENTORY_SUCCESS',

    GO_TO_BATTLE_FIELD: 'GO_TO_BATTLE_FIELD',
    GOING_TO_BATTLE_FIELD: 'GOING_TO_BATTLE_FIELD',
    GO_TO_BATTLE_FIELD_FAILED: 'GO_TO_BATTLE_FIELD_FAILED',
    GO_TO_BATTLE_FIELD_SUCCESS: 'GO_TO_BATTLE_FIELD_SUCCESS',
    AT_BATTLE_FIELD: 'AT_BATTLE_FIELD',


    ISSUE_CHALLENGE: 'ISSUE_CHALLENGE',
    ISSUING_CHALLENGE: 'ISSUING_CHALLENGE',
    ISSUING_CHALLENGE_FAILED: 'ISSUING_CHALLENGE_FAILED',
    ISSUING_CHALLENGE_SUCCESS: 'ISSUING_CHALLENGE_SUCCESS',
    SELECT_METHOD_OF_CHALLENGE: 'SELECT_METHOD_OF_CHALLENGE',
    DEPLOY_CHALLENGE: 'DEPLOY_CHALLENGE',
    DEPLOY_CHALLENGE_SUCCESS: 'DEPLOY_CHALLENGE_SUCCESS',
    DEPLOY_CHALLENGE_FAILED: 'DEPLOY_CHALLENGE_FAILED',
    DEPLOYING_CHALLENGE: 'DEPLOYING_CHALLENGE',
    WAIT_FOR_CHALLENGE_DECISION: 'WAIT_FOR_CHALLENGE_DECISION',
    WAITING_FOR_CHALLENGE_DECISION: 'WAITING_FOR_CHALLENGE_DECISION',
    WAIT_FOR_CHALLENGE_DECISION_FAILED: 'WAIT_FOR_CHALLENGE_DECISION_FAILED',
    WAIT_FOR_CHALLENGE_DECISION_SUCCESS: 'WAIT_FOR_CHALLENGE_DECISION_SUCCESS',
    CHALLENGE_REPLY_RECEIVED: 'CHALLENGE_REPLY_RECEIVED',
    CHALLENGE_REJECTED: 'CHALLENGE_REJECTED',
    CHALLENGE_ACCEPTED: 'CHALLENGE_ACCEPTED',

    PREPARE_FOR_BATTLE: 'PREPARE_FOR_BATTLE',
    PREPARING_FOR_BATTLE: 'PREPARING_FOR_BATTLE',
    PREPARE_FOR_BATTLE_SUCCESS: 'PREPARE_FOR_BATTLE_SUCCESS',
    PREPARE_FOR_BATTLE_FAILED: 'PREPARE_FOR_BATTLE_FAILED',

    SELECT_BATTLE_RESOURCES: 'SELECT_BATTLE_RESOURCES',
    SELECTING_BATTLE_RESOURCES: 'SELECTING_BATTLE_RESOURCES',
    SELECT_BATTLE_RESOURCES_FAILED: 'SELECT_BATTLE_RESOURCES_FAILED',
    SELECT_BATTLE_RESOURCES_SUCCESS: 'SELECT_BATTLE_RESOURCES_SUCCESS',

    CONFIRM_BATTLE_RESOURCES: 'CONFIRM_BATTLE_RESOURCES',
    DEPLOY_BATTLE_RESOURCES: 'DEPLOY_BATTLE_RESOURCES',
    DEPLOYING_BATTLE_RESOURCES: 'DEPLOYING_BATTLE_RESOURCES',
    DEPLOY_BATTLE_RESOURCES_FAILED: 'DEPLOY_BATTLE_RESOURCES_FAILED',
    DEPLOY_BATTLE_RESOURCES_SUCCESS: 'DEPLOY_BATTLE_RESOURCES_SUCCESS',

    DECLARE_READYNESS: 'DECLARE_READYNESS',
    DECLARING_READYNESS: 'DECLARING_READYNESS',
    DECLARE_READYNESS_SUCCESS: 'DECLARE_READYNESS_SUCCESS',
    DECLARE_READYNESS_FAILED: 'DECLARE_READYNESS_FAILED',

    WAIT_FOR_OPPONENTS: 'WAIT_FOR_OPPONENTS',
    WAITING_FOR_OPPONENTS: 'WAITING_FOR_OPPONENTS',
    WAIT_FOR_OPPONENTS_FAILED: 'WAIT_FOR_OPPONENTS_FAILED',
    WAIT_FOR_OPPONENTS_SUCCESS: 'WAIT_FOR_OPPONENTS_SUCCESS',

    SET_MOVES: 'SET_MOVES',
    SETTING_MOVES: 'SETTING_MOVES',
    SET_MOVES_FAILED: 'SET_MOVES_FAILED',
    SET_MOVES_SUCCESS: 'SET_MOVES_SUCCESS',

    SYNCHRONIZE_MOVES_AND_RESULT: 'SYNCHRONIZE_MOVES_AND_RESULT',
    SYNCHRONIZE_MOVES_AND_RESULT_SUCCESS: 'SYNCHRONIZE_MOVES_AND_RESULT_SUCCESS',
    SYNCHRONIZE_MOVES_AND_RESULT_FAILED: 'SYNCHRONIZE_MOVES_AND_RESULT_FAILED',
    SYNCHRONIZING_MOVES_AND_RESULT: 'SYNCHRONIZING_MOVES_AND_RESULT',

    CHECK_GAME_OVER: 'CHECK_GAME_OVER',
    CHECK_GAME_OVER_FAILED: 'CHECK_GAME_OVER_FAILED',
    CHECK_GAME_OVER_SUCCESS: 'CHECK_GAME_OVER_SUCCESS',
    CHECK_GAME_OVER_FAILED: 'CHECK_GAME_OVER_FAILED',

    CHECKING_GAME_OVER: 'CHECKING_GAME_OVER',

    GET_GAME_RESULT: 'GET_GAME_RESULT',
    GETTING_GAME_RESULT: 'GETTING_GAME_RESULT',
    GET_GAME_RESULT_FAILED: 'GET_GAME_RESULT_FAILED',
    GET_GAME_RESULT_SUCCESS: 'GET_GAME_RESULT_SUCCESS',

    SELECT_METHOD_OF_CHALLENGE: 'SELECT_METHOD_OF_CHALLENGE',

    FORFIT: 'FORFIT',
    FORFITTING: 'FORFITTING',
    FORFIT_FAILED: 'FORFIT_FAILED',
    FORFIT_SUCCESS: 'FORFIT_SUCCESS',
}

const gameplay = [GAMESTATES.FORFIT, GAMESTATES.AT_BATTLE_FIELD];
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
                ok = ([GAMESTATES.CHOOSE_FARM_ACTIVITY, GAMESTATES.GO_TO_STORE, GAMESTATES.GO_TO_BATTLE_FIELD].indexOf(nextState) !== -1);
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
            case GAMESTATES.GO_TO_BATTLE_FIELD:
                ok = ([GAMESTATES.GOING_TO_BATTLE_FIELD].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GOING_TO_BATTLE_FIELD:
                ok = ([GAMESTATES.GO_TO_BATTLE_FIELD_FAILED, GAMESTATES.GO_TO_BATTLE_FIELD_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GO_TO_BATTLE_FIELD_FAILED:
                ok = ([GAMESTATES.GO_TO_BATTLE_FIELD].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GO_TO_BATTLE_FIELD_SUCCESS:
                ok = ([GAMESTATES.AT_BATTLE_FIELD].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.AT_BATTLE_FIELD:
                ok = ([GAMESTATES.ISSUE_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ISSUE_CHALLENGE:
                ok = ([GAMESTATES.ISSUING_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ISSUING_CHALLENGE:
                ok = ([GAMESTATES.ISSUING_CHALLENGE_SUCCESS, GAMESTATES.ISSUING_CHALLENGE_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ISSUING_CHALLENGE_FAILED:
                ok = ([GAMESTATES.ISSUING_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.ISSUING_CHALLENGE_SUCCESS:
                ok = ([GAMESTATES.SELECT_METHOD_OF_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SELECT_METHOD_OF_CHALLENGE:
                ok = ([GAMESTATES.DEPLOY_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOY_CHALLENGE:
                ok = ([GAMESTATES.DEPLOYING_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOYING_CHALLENGE:
                ok = ([GAMESTATES.DEPLOY_CHALLENGE_SUCCESS, GAMESTATES.DEPLOY_CHALLENGE_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOY_CHALLENGE_FAILED:
                ok = ([GAMESTATES.DEPLOY_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOY_CHALLENGE_SUCCESS:
                ok = ([GAMESTATES.WAIT_FOR_CHALLENGE_DECISION].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAIT_FOR_CHALLENGE_DECISION:
                ok = ([...gameplay, GAMESTATES.WAITING_FOR_CHALLENGE_DECISION].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAITING_FOR_CHALLENGE_DECISION:
                ok = ([GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_FAILED, GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_FAILED:
                ok = ([GAMESTATES.WAIT_FOR_CHALLENGE_DECISION].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_SUCCESS:
                ok = ([GAMESTATES.CHALLENGE_REPLY_RECEIVED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHALLENGE_REPLY_RECEIVED:
                ok = ([...gameplay, GAMESTATES.CHALLENGE_REJECTED, GAMESTATES.CHALLENGE_ACCEPTED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHALLENGE_REJECTED:
                ok = ([GAMESTATES.SELECT_METHOD_OF_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHALLENGE_ACCEPTED:
                ok = ([GAMESTATES.PREPARE_FOR_BATTLE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PREPARE_FOR_BATTLE:
                ok = ([...gameplay, GAMESTATES.PREPARING_FOR_BATTLE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PREPARING_FOR_BATTLE:
                ok = ([GAMESTATES.PREPARE_FOR_BATTLE_SUCCESS, GAMESTATES.PREPARE_FOR_BATTLE_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PREPARE_FOR_BATTLE_SUCCESS:
                ok = ([GAMESTATES.SELECT_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.PREPARE_FOR_BATTLE_FAILED:
                ok = ([GAMESTATES.PREPARE_FOR_BATTLE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SELECT_BATTLE_RESOURCES:
                ok = ([...gameplay, GAMESTATES.SELECTING_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SELECTING_BATTLE_RESOURCES:
                ok = ([GAMESTATES.SELECT_BATTLE_RESOURCES_SUCCESS, GAMESTATES.SELECT_BATTLE_RESOURCES_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SELECT_BATTLE_RESOURCES_SUCCESS:
                ok = ([GAMESTATES.CONFIRM_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SELECT_BATTLE_RESOURCES_FAILED:
                ok = ([GAMESTATES.SELECT_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CONFIRM_BATTLE_RESOURCES:
                ok = ([...gameplay, GAMESTATES.DEPLOY_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOY_BATTLE_RESOURCES:
                ok = ([...gameplay, GAMESTATES.DEPLOYING_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOYING_BATTLE_RESOURCES:
                ok = ([GAMESTATES.DEPLOY_BATTLE_RESOURCES_FAILED, GAMESTATES.DEPLOY_BATTLE_RESOURCES_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOY_BATTLE_RESOURCES_FAILED:
                ok = ([GAMESTATES.DEPLOY_BATTLE_RESOURCES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DEPLOY_BATTLE_RESOURCES_SUCCESS:
                ok = ([GAMESTATES.DECLARE_READYNESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DECLARE_READYNESS:
                ok = ([...gameplay, GAMESTATES.DECLARING_READYNESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DECLARING_READYNESS:
                ok = ([GAMESTATES.DECLARE_READYNESS_FAILED, GAMESTATES.DECLARE_READYNESS_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DECLARE_READYNESS_FAILED:
                ok = ([GAMESTATES.DECLARE_READYNESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.DECLARE_READYNESS_SUCCESS:
                ok = ([GAMESTATES.WAIT_FOR_OPPONENTS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAIT_FOR_OPPONENTS:
                ok = ([...gameplay, GAMESTATES.WAITING_FOR_OPPONENTS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAITING_FOR_OPPONENTS:
                ok = ([GAMESTATES.WAIT_FOR_OPPONENTS_SUCCESS, GAMESTATES.WAIT_FOR_OPPONENTS_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAIT_FOR_OPPONENTS_FAILED:
                ok = ([GAMESTATES.WAIT_FOR_OPPONENTS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.WAIT_FOR_OPPONENTS_SUCCESS:
                ok = ([GAMESTATES.CHECK_GAME_OVER].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHECK_GAME_OVER:
                ok = ([...gameplay, GAMESTATES.CHECKING_GAME_OVER].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHECKING_GAME_OVER:
                ok = ([GAMESTATES.CHECK_GAME_OVER_FAILED, GAMESTATES.CHECK_GAME_OVER_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHECK_GAME_OVER_FAILED:
                ok = ([GAMESTATES.CHECK_GAME_OVER].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.CHECK_GAME_OVER_SUCCESS:
                ok = ([GAMESTATES.SET_MOVES, GAMESTATES.GET_GAME_RESULT].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SET_MOVES:
                ok = ([...gameplay, GAMESTATES.SETTING_MOVES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SETTING_MOVES:
                ok = ([GAMESTATES.SET_MOVES_FAILED, GAMESTATES.SET_MOVES_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SET_MOVES_FAILED:
                ok = ([GAMESTATES.SET_MOVES].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SET_MOVES_SUCCESS:
                ok = ([GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT:
                ok = ([...gameplay, GAMESTATES.SYNCHRONIZING_MOVES_AND_RESULT].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SYNCHRONIZING_MOVES_AND_RESULT:
                ok = ([GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_SUCCESS, GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_SUCCESS:
                ok = ([GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_FAILED:
                ok = ([GAMESTATES.CHECK_GAME_OVER].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GET_GAME_RESULT:
                ok = ([...gameplay, GAMESTATES.GETTING_GAME_RESULT].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GETTING_GAME_RESULT:
                ok = ([GAMESTATES.GET_GAME_RESULT_SUCCESS, GAMESTATES.GET_GAME_RESULT_FAILED].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GET_GAME_RESULT_FAILED:
                ok = ([GAMESTATES.GET_GAME_RESULT].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.GET_GAME_RESULT_SUCCESS:
                ok = ([GAMESTATES.SELECT_METHOD_OF_CHALLENGE].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.FORFIT:
                ok = ([GAMESTATES.FORFITTING].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.FORFITTING:
                ok = ([GAMESTATES.FORFIT_FAILED, GAMESTATES.FORFIT_SUCCESS].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.FORFIT_FAILED:
                ok = ([GAMESTATES.FORFIT].indexOf(nextState) !== -1);
                break;
            case GAMESTATES.FORFIT_SUCCESS:
                ok = ([GAMESTATES.SELECT_METHOD_OF_CHALLENGE].indexOf(nextState) !== -1);
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