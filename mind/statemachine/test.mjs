import { StateMachine, STATES, PROFILETYPES, GAMESTATES } from './statemachine';
console.log("imported state machine");
function assert(val, message) {
    if (!val) throw new Error(message || 'Is not true');
}
var stateMachine = new StateMachine();
stateMachine.debug = true;

console.log(stateMachine);


var currentState = stateMachine.getCurrentState();



stateMachine.init();
currentState = stateMachine.getCurrentState();


currentState = stateMachine.updateState(STATES.INIT);
assert(currentState === STATES.INIT);

currentState = stateMachine.updateState(STATES.SELECT_PROFILE)
assert(currentState === STATES.SELECT_PROFILE, `state is not SELECT_PROFILE`);


//Operate from a single machine.
currentState = stateMachine.updateState(STATES.SELECT_MACHINE_PROFILE);
assert(currentState === STATES.SELECT_MACHINE_PROFILE, `state is not SELECT_MACHINE_PROFILE`);


currentState = stateMachine.updateState(STATES.CHECK_IF_MACHINE_HAS_PROFILE);
assert(currentState === STATES.CHECK_IF_MACHINE_HAS_PROFILE, `state is not CHECK_IF_MACHINE_HAS_PROFILE`);


currentState = stateMachine.updateState(STATES.CHECKING_IF_MACHINE_HAS_PROFILE);
assert(currentState === STATES.CHECKING_IF_MACHINE_HAS_PROFILE, `state is not CHECKING_IF_MACHINE_HAS_PROFILE`);


currentState = stateMachine.updateState(STATES.CHECKING_IF_MACHINE_HAS_PROFILE_FAILED);
assert(currentState === STATES.CHECKING_IF_MACHINE_HAS_PROFILE_FAILED, `state is not CHECKING_IF_MACHINE_HAS_PROFILE_FAILED`);

assert(stateMachine.getProfileType() == PROFILETYPES.UNKNOWN);

currentState = stateMachine.updateState(STATES.SELECT_PROFILE);
assert(currentState === STATES.SELECT_PROFILE, `state is not SELECT_PROFILE`);


///FORWARD THROUGH STATES;
currentState = stateMachine.updateState(STATES.SELECT_MACHINE_PROFILE);
currentState = stateMachine.updateState(STATES.CHECK_IF_MACHINE_HAS_PROFILE);
currentState = stateMachine.updateState(STATES.CHECKING_IF_MACHINE_HAS_PROFILE);
currentState = stateMachine.updateState(STATES.CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS);
assert(currentState === STATES.CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS, `state is not CHECKING_IF_MACHINE_HAS_PROFILE_SUCCESS`);

assert(stateMachine.getProfileType() == PROFILETYPES.MACHINE, 'stateMachine.getProfileType() !== PROFILETYPES.MACHINE');

currentState = stateMachine.updateState(STATES.LOAD_RESOURCES_ASYNC)
assert(currentState === STATES.LOAD_RESOURCES_ASYNC, `state is not LOAD_RESOURCES_ASYNC`);


currentState = stateMachine.updateState(STATES.LOADING_RESOURCES_ASYNC)
assert(currentState === STATES.LOADING_RESOURCES_ASYNC, `state is not LOADING_RESOURCES_ASYNC`);


currentState = stateMachine.updateState(STATES.LOADING_RESOURCES_FAILED)
assert(currentState === STATES.LOADING_RESOURCES_FAILED, `state is not LOADING_RESOURCES_FAILED`);



currentState = stateMachine.updateState(STATES.RETRY_LOAD_RESOURCE_ASYNC)
assert(currentState === STATES.RETRY_LOAD_RESOURCE_ASYNC, `state is not RETRY_LOAD_RESOURCE_ASYNC`);


currentState = stateMachine.updateState(STATES.RETRY_LOAD_RESOURCE_ASYNC)
assert(currentState === STATES.RETRY_LOAD_RESOURCE_ASYNC, `state is not RETRY_LOAD_RESOURCE_ASYNC`);


currentState = stateMachine.updateState(STATES.LOAD_RESOURCES_ASYNC)
assert(currentState === STATES.LOAD_RESOURCES_ASYNC, `state is not LOAD_RESOURCES_ASYNC`);

currentState = stateMachine.updateState(STATES.LOADING_RESOURCES_ASYNC)
assert(currentState === STATES.LOADING_RESOURCES_ASYNC, `state is not LOADING_RESOURCES_ASYNC`);


currentState = stateMachine.updateState(STATES.LOADING_RESOURCES_SUCCESS)
assert(currentState === STATES.LOADING_RESOURCES_SUCCESS, `state is not LOADING_RESOURCES_SUCCESS`);

assert(stateMachine.gameState === GAMESTATES.INIT, `game state is not INIT`);

currentState = stateMachine.updateState(STATES.READY)
currentState = stateMachine.updateState(GAMESTATES.READY);
assert(stateMachine.gameState === GAMESTATES.READY, `game state is not READY`);

assert(currentState === STATES.READY, `state is not READY`);

currentState = stateMachine.updateState(GAMESTATES.CHOOSE_FARM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.CHOOSE_FARM_ACTIVITY, `game state is not CHOOSE_FARM_ACTIVITY`);

currentState = stateMachine.updateState(GAMESTATES.CHOOSING_FARM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.CHOOSING_FARM_ACTIVITY, `game state is not CHOOSING_FARM_ACTIVITY`);

currentState = stateMachine.updateState(GAMESTATES.CHOOSING_FARM_ACTIVITY_FAILED);
assert(stateMachine.gameState === GAMESTATES.CHOOSING_FARM_ACTIVITY_FAILED, `game state is not CHOOSING_FARM_ACTIVITY_FAILED`);

currentState = stateMachine.updateState(GAMESTATES.READY);
assert(stateMachine.gameState === GAMESTATES.READY, `game state is not CHOOSE_FARM_ACTIVITY`);

currentState = stateMachine.updateState(GAMESTATES.CHOOSE_FARM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.CHOOSE_FARM_ACTIVITY, `game state is not CHOOSE_FARM_ACTIVITY`);

currentState = stateMachine.updateState(GAMESTATES.CHOOSING_FARM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.CHOOSING_FARM_ACTIVITY, `game state is not CHOOSING_FARM_ACTIVITY`);

currentState = stateMachine.updateState(GAMESTATES.CHOOSING_FARM_ACTIVITY_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.CHOOSING_FARM_ACTIVITY_SUCCESS, `game state is not CHOOSING_FARM_ACTIVITY_SUCCESS`);

currentState = stateMachine.updateState(GAMESTATES.PERFORM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.PERFORM_ACTIVITY, `game state is not PERFORM_ACTIVITY`);

stateMachine.updateState(GAMESTATES.END_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.END_ACTIVITY, `game state is not END_ACTIVITY`);

stateMachine.updateState(GAMESTATES.ENDING_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.ENDING_ACTIVITY, `game state is not ENDING_ACTIVITY`);


stateMachine.updateState(GAMESTATES.ENDING_ACTIVITY_FAILED);
assert(stateMachine.gameState === GAMESTATES.ENDING_ACTIVITY_FAILED, `game state is not ENDING_ACTIVITY_FAILED`);


stateMachine.updateState(GAMESTATES.END_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.END_ACTIVITY, `game state is not END_ACTIVITY`);

stateMachine.updateState(GAMESTATES.ENDING_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.ENDING_ACTIVITY, `game state is not ENDING_ACTIVITY`);

stateMachine.updateState(GAMESTATES.ENDING_ACTIVITY_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.ENDING_ACTIVITY_SUCCESS, `game state is not ENDING_ACTIVITY_SUCCESS`);

stateMachine.updateState(GAMESTATES.CHOOSE_FARM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.CHOOSE_FARM_ACTIVITY, `game state is not CHOOSE_FARM_ACTIVITY`);


stateMachine.updateState(GAMESTATES.CANCEL_CHOOSE_FARM_ACTIVITY);
assert(stateMachine.gameState === GAMESTATES.CANCEL_CHOOSE_FARM_ACTIVITY, `game state is not CANCEL_CHOOSE_FARM_ACTIVITY`);

stateMachine.updateState(GAMESTATES.READY);
assert(stateMachine.gameState === GAMESTATES.READY, `game state is not READY`);

stateMachine.updateState(GAMESTATES.GO_TO_STORE);
assert(stateMachine.gameState === GAMESTATES.GO_TO_STORE, `game state is not GO_TO_STORE`);

stateMachine.updateState(GAMESTATES.GOING_TO_STORE);
assert(stateMachine.gameState === GAMESTATES.GOING_TO_STORE, `game state is not GOING_TO_STORE`);

stateMachine.updateState(GAMESTATES.GOING_TO_STORE_FAILED);
assert(stateMachine.gameState === GAMESTATES.GOING_TO_STORE_FAILED, `game state is not GOING_TO_STORE_FAILED`);

stateMachine.updateState(GAMESTATES.READY);
assert(stateMachine.gameState === GAMESTATES.READY, `game state is not GO_TO_STORE`);

stateMachine.updateState(GAMESTATES.GO_TO_STORE);
assert(stateMachine.gameState === GAMESTATES.GO_TO_STORE, `game state is not GO_TO_STORE`);

stateMachine.updateState(GAMESTATES.GOING_TO_STORE);
assert(stateMachine.gameState === GAMESTATES.GOING_TO_STORE, `game state is not GOING_TO_STORE`);

stateMachine.updateState(GAMESTATES.GO_TO_STORE_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.GO_TO_STORE_SUCCESS, `game state is not GO_TO_STORE_SUCCESS`);

stateMachine.updateState(GAMESTATES.AT_THE_STORE);
assert(stateMachine.gameState === GAMESTATES.AT_THE_STORE, `game state is not GO_TO_STORE`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.VIEWING_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEWING_ITEM, `game state is not VIEWING_ITEM`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM_FAILED);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM_FAILED, `game state is not VIEW_ITEM_FAILED`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.VIEWING_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEWING_ITEM, `game state is not VIEWING_ITEM`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM_SUCCESS, `game state is not VIEW_ITEM_SUCCESS`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.AT_THE_STORE);
assert(stateMachine.gameState === GAMESTATES.AT_THE_STORE, `game state is not AT_THE_STORE`);

stateMachine.updateState(GAMESTATES.SEARCH_FOR_ITEM);
assert(stateMachine.gameState === GAMESTATES.SEARCH_FOR_ITEM, `game state is not SEARCH_FOR_ITEM`);

stateMachine.updateState(GAMESTATES.SEARCHING_FOR_ITEM);
assert(stateMachine.gameState === GAMESTATES.SEARCHING_FOR_ITEM, `game state is not SEARCHING_FOR_ITEM`);

stateMachine.updateState(GAMESTATES.SEARCH_FOR_ITEM_FAILED);
assert(stateMachine.gameState === GAMESTATES.SEARCH_FOR_ITEM_FAILED, `game state is not SEARCH_FOR_ITEM_FAILED`);

stateMachine.updateState(GAMESTATES.SEARCH_FOR_ITEM);
assert(stateMachine.gameState === GAMESTATES.SEARCH_FOR_ITEM, `game state is not SEARCH_FOR_ITEM`);

stateMachine.updateState(GAMESTATES.SEARCHING_FOR_ITEM);
assert(stateMachine.gameState === GAMESTATES.SEARCHING_FOR_ITEM, `game state is not SEARCHING_FOR_ITEM`);

stateMachine.updateState(GAMESTATES.SEARCH_FOR_ITEM_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.SEARCH_FOR_ITEM_SUCCESS, `game state is not SEARCH_FOR_ITEM_SUCCESS`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.SEARCH_FOR_ITEM);
assert(stateMachine.gameState === GAMESTATES.SEARCH_FOR_ITEM, `game state is not SEARCH_FOR_ITEM`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.VIEWING_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEWING_ITEM, `game state is not VIEWING_ITEM`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM_SUCCESS, `game state is not VIEW_ITEM_SUCCESS`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.PURCHASE_ITEM);
assert(stateMachine.gameState === GAMESTATES.PURCHASE_ITEM, `game state is not PURCHASE_ITEM`);

stateMachine.updateState(GAMESTATES.PURCHASING_ITEM);
assert(stateMachine.gameState === GAMESTATES.PURCHASING_ITEM, `game state is not PURCHASING_ITEM`);

stateMachine.updateState(GAMESTATES.PURCHASE_ITEM_FAILED);
assert(stateMachine.gameState === GAMESTATES.PURCHASE_ITEM_FAILED, `game state is not PURCHASE_ITEM_FAILED`);

stateMachine.updateState(GAMESTATES.PURCHASE_ITEM);
assert(stateMachine.gameState === GAMESTATES.PURCHASE_ITEM, `game state is not PURCHASE_ITEM`);

stateMachine.updateState(GAMESTATES.PURCHASING_ITEM);
assert(stateMachine.gameState === GAMESTATES.PURCHASING_ITEM, `game state is not PURCHASING_ITEM`);

stateMachine.updateState(GAMESTATES.PURCHASE_ITEM_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.PURCHASE_ITEM_SUCCESS, `game state is not PURCHASE_ITEM_SUCCESS`);

stateMachine.updateState(GAMESTATES.PURCHASE_ITEM);
assert(stateMachine.gameState === GAMESTATES.PURCHASE_ITEM, `game state is not PURCHASE_ITEM`);

stateMachine.updateState(GAMESTATES.VIEW_ITEM);
assert(stateMachine.gameState === GAMESTATES.VIEW_ITEM, `game state is not VIEW_ITEM`);

stateMachine.updateState(GAMESTATES.AT_THE_STORE);
assert(stateMachine.gameState === GAMESTATES.AT_THE_STORE, `game state is not AT_THE_STORE`);

stateMachine.updateState(GAMESTATES.VENDOR_STORE);
assert(stateMachine.gameState === GAMESTATES.VENDOR_STORE, `game state is not VENDOR_STORE`);

stateMachine.updateState(GAMESTATES.VIEW_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.VIEW_INVENTORY, `game state is not VIEW_INVENTORY`);

stateMachine.updateState(GAMESTATES.VIEWING_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.VIEWING_INVENTORY, `game state is not VIEWING_INVENTORY`);

stateMachine.updateState(GAMESTATES.VIEW_INVENTORY_FAILED);
assert(stateMachine.gameState === GAMESTATES.VIEW_INVENTORY_FAILED, `game state is not VIEW_INVENTORY_FAILED`);

stateMachine.updateState(GAMESTATES.VIEW_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.VIEW_INVENTORY, `game state is not VIEW_INVENTORY`);

stateMachine.updateState(GAMESTATES.VIEWING_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.VIEWING_INVENTORY, `game state is not VIEWING_INVENTORY`);

stateMachine.updateState(GAMESTATES.VIEW_INVENTORY_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.VIEW_INVENTORY_SUCCESS, `game state is not VIEW_INVENTORY_SUCCESS`);

stateMachine.updateState(GAMESTATES.VIEW_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.VIEW_INVENTORY, `game state is not VIEW_INVENTORY`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY, `game state is not UPDATE_INVENTORY`);

stateMachine.updateState(GAMESTATES.UPDATING_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.UPDATING_INVENTORY, `game state is not UPDATING_INVENTORY`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_FAILED);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_FAILED, `game state is not UPDATE_INVENTORY_FAILED`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY, `game state is not UPDATE_INVENTORY`);

stateMachine.updateState(GAMESTATES.UPDATING_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.UPDATING_INVENTORY, `game state is not UPDATING_INVENTORY`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_SUCCESS, `game state is not UPDATE_INVENTORY_SUCCESS`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY, `game state is not UPDATE_INVENTORY`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_ITEM, `game state is not UPDATE_INVENTORY_ITEM`);

stateMachine.updateState(GAMESTATES.UPDATING_INVENTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.UPDATING_INVENTORY_ITEM, `game state is not UPDATING_INVENTORY_ITEM`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_ITEM_FAILED);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_ITEM_FAILED, `game state is not UPDATE_INVENTORY_ITEM_FAILED`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_ITEM, `game state is not UPDATE_INVENTORY_ITEM`);

stateMachine.updateState(GAMESTATES.UPDATING_INVENTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.UPDATING_INVENTORY_ITEM, `game state is not UPDATING_INVENTORY_ITEM`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_ITEM_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_ITEM_SUCCESS, `game state is not UPDATE_INVENTORY_ITEM_SUCCESS`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY_ITEM, `game state is not UPDATE_INVENTORY_ITEM`);

stateMachine.updateState(GAMESTATES.UPDATE_INVENTORY);
assert(stateMachine.gameState === GAMESTATES.UPDATE_INVENTORY, `game state is not UPDATE_INVENTORY`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY, `game state is not INVENTORY_HISTORY`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY_ITEM, `game state is not INVENTORY_HISTORY_ITEM`);

stateMachine.updateState(GAMESTATES.INVENTORY_VIEWING_HISTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_VIEWING_HISTORY_ITEM, `game state is not INVENTORY_VIEWING_HISTORY_ITEM`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY_ITEM_FAILED);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY_ITEM_FAILED, `game state is not INVENTORY_HISTORY_ITEM_FAILED`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY_ITEM, `game state is not INVENTORY_HISTORY_ITEM`);

stateMachine.updateState(GAMESTATES.INVENTORY_VIEWING_HISTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_VIEWING_HISTORY_ITEM, `game state is not INVENTORY_VIEWING_HISTORY_ITEM`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY_ITEM_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY_ITEM_SUCCESS, `game state is not INVENTORY_HISTORY_ITEM_SUCCESS`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY_ITEM);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY_ITEM, `game state is not INVENTORY_HISTORY_ITEM`);

stateMachine.updateState(GAMESTATES.INVENTORY_HISTORY);
assert(stateMachine.gameState === GAMESTATES.INVENTORY_HISTORY, `game state is not INVENTORY_HISTORY`);

stateMachine.updateState(GAMESTATES.VENDOR_STORE);
assert(stateMachine.gameState === GAMESTATES.VENDOR_STORE, `game state is not VENDOR_STORE`);

stateMachine.updateState(GAMESTATES.AT_THE_STORE);
assert(stateMachine.gameState === GAMESTATES.AT_THE_STORE, `game state is not AT_THE_STORE`);

stateMachine.updateState(GAMESTATES.READY);
assert(stateMachine.gameState === GAMESTATES.READY, `game state is not READY`);

stateMachine.updateState(GAMESTATES.GO_TO_BATTLE_FIELD);
assert(stateMachine.gameState === GAMESTATES.GO_TO_BATTLE_FIELD, `game state is not GO_TO_BATTLE_FIELD`);

stateMachine.updateState(GAMESTATES.GOING_TO_BATTLE_FIELD);
assert(stateMachine.gameState === GAMESTATES.GOING_TO_BATTLE_FIELD, `game state is not GOING_TO_BATTLE_FIELD`);

stateMachine.updateState(GAMESTATES.GO_TO_BATTLE_FIELD_FAILED);
assert(stateMachine.gameState === GAMESTATES.GO_TO_BATTLE_FIELD_FAILED, `game state is not GO_TO_BATTLE_FIELD_FAILED`);

stateMachine.updateState(GAMESTATES.GO_TO_BATTLE_FIELD);
assert(stateMachine.gameState === GAMESTATES.GO_TO_BATTLE_FIELD, `game state is not GO_TO_BATTLE_FIELD`);

stateMachine.updateState(GAMESTATES.GOING_TO_BATTLE_FIELD);
assert(stateMachine.gameState === GAMESTATES.GOING_TO_BATTLE_FIELD, `game state is not GOING_TO_BATTLE_FIELD`);

stateMachine.updateState(GAMESTATES.GO_TO_BATTLE_FIELD_SUCCESS);
assert(stateMachine.gameState === GAMESTATES.GO_TO_BATTLE_FIELD_SUCCESS, `game state is not GO_TO_BATTLE_FIELD_SUCCESS`);

stateMachine.updateState(GAMESTATES.AT_BATTLE_FIELD);
assert(stateMachine.gameState === GAMESTATES.AT_BATTLE_FIELD, `game state is not AT_BATTLE_FIELD`);

stateMachine.updateState(GAMESTATES.ISSUE_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.ISSUE_CHALLENGE, `game state is not ISSUE_CHALLENGE`);

stateMachine.updateState(GAMESTATES.ISSUING_CHALLENGE);
stateMachine.updateState(GAMESTATES.ISSUING_CHALLENGE_FAILED);
stateMachine.updateState(GAMESTATES.ISSUE_CHALLENGE);
stateMachine.updateState(GAMESTATES.ISSUING_CHALLENGE);
stateMachine.updateState(GAMESTATES.ISSUING_CHALLENGE_SUCCESS);

stateMachine.updateState(GAMESTATES.SELECT_METHOD_OF_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.SELECT_METHOD_OF_CHALLENGE, `game state is not SELECT_METHOD_OF_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.DEPLOY_CHALLENGE, `game state is not DEPLOY_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_FAILED);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_SUCCESS);

stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
assert(stateMachine.gameState === GAMESTATES.WAIT_FOR_CHALLENGE_DECISION, `game state is not WAIT_FOR_CHALLENGE_DECISION`);

stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_FAILED);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_SUCCESS);



stateMachine.updateState(GAMESTATES.CHALLENGE_REPLY_RECEIVED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_REPLY_RECEIVED, `game state is not CHALLENGE_REPLY_RECEIVED`);

stateMachine.updateState(GAMESTATES.CHALLENGE_REJECTED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_REJECTED, `game state is not CHALLENGE_REJECTED`);

stateMachine.updateState(GAMESTATES.SELECT_METHOD_OF_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.SELECT_METHOD_OF_CHALLENGE, `game state is not SELECT_METHOD_OF_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.DEPLOY_CHALLENGE, `game state is not DEPLOY_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_FAILED);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_SUCCESS);


stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
assert(stateMachine.gameState === GAMESTATES.WAIT_FOR_CHALLENGE_DECISION, `game state is not WAIT_FOR_CHALLENGE_DECISION`);

stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_FAILED);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_SUCCESS);

stateMachine.updateState(GAMESTATES.CHALLENGE_REPLY_RECEIVED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_REPLY_RECEIVED, `game state is not CHALLENGE_REPLY_RECEIVED`);

stateMachine.updateState(GAMESTATES.CHALLENGE_ACCEPTED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_ACCEPTED, `game state is not CHALLENGE_ACCEPTED`);

stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE);
assert(stateMachine.gameState === GAMESTATES.PREPARE_FOR_BATTLE, `game state is not PREPARE_FOR_BATTLE`);

stateMachine.updateState(GAMESTATES.PREPARING_FOR_BATTLE);
stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE_FAILED);
stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE);
stateMachine.updateState(GAMESTATES.PREPARING_FOR_BATTLE);
stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE_SUCCESS);

stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES);
assert(stateMachine.gameState === GAMESTATES.SELECT_BATTLE_RESOURCES, `game state is not SELECT_BATTLE_RESOURCES`);

stateMachine.updateState(GAMESTATES.SELECTING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES_FAILED);
stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.SELECTING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES_SUCCESS);

stateMachine.updateState(GAMESTATES.CONFIRM_BATTLE_RESOURCES);
assert(stateMachine.gameState === GAMESTATES.CONFIRM_BATTLE_RESOURCES, `game state is not CONFIRM_BATTLE_RESOURCES`);

stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES);
assert(stateMachine.gameState === GAMESTATES.DEPLOY_BATTLE_RESOURCES, `game state is not DEPLOY_BATTLE_RESOURCES`);

stateMachine.updateState(GAMESTATES.DEPLOYING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES_FAILED);
stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.DEPLOYING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES_SUCCESS);

stateMachine.updateState(GAMESTATES.DECLARE_READYNESS);
assert(stateMachine.gameState === GAMESTATES.DECLARE_READYNESS, `game state is not DECLARE_READYNESS`);

stateMachine.updateState(GAMESTATES.DECLARING_READYNESS);
stateMachine.updateState(GAMESTATES.DECLARE_READYNESS_FAILED);
stateMachine.updateState(GAMESTATES.DECLARE_READYNESS);
stateMachine.updateState(GAMESTATES.DECLARING_READYNESS);
stateMachine.updateState(GAMESTATES.DECLARE_READYNESS_SUCCESS);

stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS);
assert(stateMachine.gameState === GAMESTATES.WAIT_FOR_OPPONENTS, `game state is not WAIT_FOR_OPPONENTS`);

stateMachine.updateState(GAMESTATES.WAITING_FOR_OPPONENTS);
stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS_FAILED);
stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS);
stateMachine.updateState(GAMESTATES.WAITING_FOR_OPPONENTS);
stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS_SUCCESS);

stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
assert(stateMachine.gameState === GAMESTATES.CHECK_GAME_OVER, `game state is not CHECK_GAME_OVER`);

stateMachine.updateState(GAMESTATES.CHECKING_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER_FAILED);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECKING_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER_SUCCESS);


stateMachine.updateState(GAMESTATES.SET_MOVES);
assert(stateMachine.gameState === GAMESTATES.SET_MOVES, `game state is not SET_MOVES`);

stateMachine.updateState(GAMESTATES.SETTING_MOVES);
stateMachine.updateState(GAMESTATES.SET_MOVES_FAILED);
stateMachine.updateState(GAMESTATES.SET_MOVES);
stateMachine.updateState(GAMESTATES.SETTING_MOVES);
stateMachine.updateState(GAMESTATES.SET_MOVES_SUCCESS);


stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT);
assert(stateMachine.gameState === GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT, `game state is not SYNCHRONIZE_MOVES_AND_RESULT`);

stateMachine.updateState(GAMESTATES.SYNCHRONIZING_MOVES_AND_RESULT);
stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_FAILED);
stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT);
stateMachine.updateState(GAMESTATES.SYNCHRONIZING_MOVES_AND_RESULT);
stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_SUCCESS);


stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
assert(stateMachine.gameState === GAMESTATES.CHECK_GAME_OVER, `game state is not CHECK_GAME_OVER`);

stateMachine.updateState(GAMESTATES.CHECKING_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER_FAILED);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECKING_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER_SUCCESS);


stateMachine.updateState(GAMESTATES.GET_GAME_RESULT);
assert(stateMachine.gameState === GAMESTATES.GET_GAME_RESULT, `game state is not GET_GAME_RESULT`);

stateMachine.updateState(GAMESTATES.GETTING_GAME_RESULT);
stateMachine.updateState(GAMESTATES.GET_GAME_RESULT_FAILED);
stateMachine.updateState(GAMESTATES.GET_GAME_RESULT);
stateMachine.updateState(GAMESTATES.GETTING_GAME_RESULT);
stateMachine.updateState(GAMESTATES.GET_GAME_RESULT_SUCCESS);

stateMachine.updateState(GAMESTATES.SELECT_METHOD_OF_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.SELECT_METHOD_OF_CHALLENGE, `game state is not SELECT_METHOD_OF_CHALLENGE`);


stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.DEPLOY_CHALLENGE, `game state is not DEPLOY_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_FAILED);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_SUCCESS);

stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
assert(stateMachine.gameState === GAMESTATES.WAIT_FOR_CHALLENGE_DECISION, `game state is not WAIT_FOR_CHALLENGE_DECISION`);

stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_FAILED);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_SUCCESS);



stateMachine.updateState(GAMESTATES.CHALLENGE_REPLY_RECEIVED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_REPLY_RECEIVED, `game state is not CHALLENGE_REPLY_RECEIVED`);

stateMachine.updateState(GAMESTATES.CHALLENGE_REJECTED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_REJECTED, `game state is not CHALLENGE_REJECTED`);

stateMachine.updateState(GAMESTATES.SELECT_METHOD_OF_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.SELECT_METHOD_OF_CHALLENGE, `game state is not SELECT_METHOD_OF_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.DEPLOY_CHALLENGE, `game state is not DEPLOY_CHALLENGE`);

stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_FAILED);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOYING_CHALLENGE);
stateMachine.updateState(GAMESTATES.DEPLOY_CHALLENGE_SUCCESS);


stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
assert(stateMachine.gameState === GAMESTATES.WAIT_FOR_CHALLENGE_DECISION, `game state is not WAIT_FOR_CHALLENGE_DECISION`);

stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_FAILED);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAITING_FOR_CHALLENGE_DECISION);
stateMachine.updateState(GAMESTATES.WAIT_FOR_CHALLENGE_DECISION_SUCCESS);

stateMachine.updateState(GAMESTATES.CHALLENGE_REPLY_RECEIVED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_REPLY_RECEIVED, `game state is not CHALLENGE_REPLY_RECEIVED`);

stateMachine.updateState(GAMESTATES.CHALLENGE_ACCEPTED);
assert(stateMachine.gameState === GAMESTATES.CHALLENGE_ACCEPTED, `game state is not CHALLENGE_ACCEPTED`);

stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE);
assert(stateMachine.gameState === GAMESTATES.PREPARE_FOR_BATTLE, `game state is not PREPARE_FOR_BATTLE`);

stateMachine.updateState(GAMESTATES.PREPARING_FOR_BATTLE);
stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE_FAILED);
stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE);
stateMachine.updateState(GAMESTATES.PREPARING_FOR_BATTLE);
stateMachine.updateState(GAMESTATES.PREPARE_FOR_BATTLE_SUCCESS);

stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES);
assert(stateMachine.gameState === GAMESTATES.SELECT_BATTLE_RESOURCES, `game state is not SELECT_BATTLE_RESOURCES`);

stateMachine.updateState(GAMESTATES.SELECTING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES_FAILED);
stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.SELECTING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.SELECT_BATTLE_RESOURCES_SUCCESS);

stateMachine.updateState(GAMESTATES.CONFIRM_BATTLE_RESOURCES);
assert(stateMachine.gameState === GAMESTATES.CONFIRM_BATTLE_RESOURCES, `game state is not CONFIRM_BATTLE_RESOURCES`);

stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES);
assert(stateMachine.gameState === GAMESTATES.DEPLOY_BATTLE_RESOURCES, `game state is not DEPLOY_BATTLE_RESOURCES`);

stateMachine.updateState(GAMESTATES.DEPLOYING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES_FAILED);
stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.DEPLOYING_BATTLE_RESOURCES);
stateMachine.updateState(GAMESTATES.DEPLOY_BATTLE_RESOURCES_SUCCESS);

stateMachine.updateState(GAMESTATES.DECLARE_READYNESS);
assert(stateMachine.gameState === GAMESTATES.DECLARE_READYNESS, `game state is not DECLARE_READYNESS`);

stateMachine.updateState(GAMESTATES.DECLARING_READYNESS);
stateMachine.updateState(GAMESTATES.DECLARE_READYNESS_FAILED);
stateMachine.updateState(GAMESTATES.DECLARE_READYNESS);
stateMachine.updateState(GAMESTATES.DECLARING_READYNESS);
stateMachine.updateState(GAMESTATES.DECLARE_READYNESS_SUCCESS);

stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS);
assert(stateMachine.gameState === GAMESTATES.WAIT_FOR_OPPONENTS, `game state is not WAIT_FOR_OPPONENTS`);

stateMachine.updateState(GAMESTATES.WAITING_FOR_OPPONENTS);
stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS_FAILED);
stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS);
stateMachine.updateState(GAMESTATES.WAITING_FOR_OPPONENTS);
stateMachine.updateState(GAMESTATES.WAIT_FOR_OPPONENTS_SUCCESS);

stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
assert(stateMachine.gameState === GAMESTATES.CHECK_GAME_OVER, `game state is not CHECK_GAME_OVER`);

stateMachine.updateState(GAMESTATES.CHECKING_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER_FAILED);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECKING_GAME_OVER);
stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER_SUCCESS);


stateMachine.updateState(GAMESTATES.SET_MOVES);
assert(stateMachine.gameState === GAMESTATES.SET_MOVES, `game state is not SET_MOVES`);

stateMachine.updateState(GAMESTATES.SETTING_MOVES);
stateMachine.updateState(GAMESTATES.SET_MOVES_FAILED);
stateMachine.updateState(GAMESTATES.SET_MOVES);
stateMachine.updateState(GAMESTATES.SETTING_MOVES);
stateMachine.updateState(GAMESTATES.SET_MOVES_SUCCESS);


stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT);
assert(stateMachine.gameState === GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT, `game state is not SYNCHRONIZE_MOVES_AND_RESULT`);

stateMachine.updateState(GAMESTATES.SYNCHRONIZING_MOVES_AND_RESULT);
stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_FAILED);
stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT);
stateMachine.updateState(GAMESTATES.SYNCHRONIZING_MOVES_AND_RESULT);
stateMachine.updateState(GAMESTATES.SYNCHRONIZE_MOVES_AND_RESULT_SUCCESS);


stateMachine.updateState(GAMESTATES.CHECK_GAME_OVER);
assert(stateMachine.gameState === GAMESTATES.CHECK_GAME_OVER, `game state is not CHECK_GAME_OVER`);

stateMachine.updateState(GAMESTATES.FORFIT);
assert(stateMachine.gameState === GAMESTATES.FORFIT, `game state is not FORFIT`);

stateMachine.updateState(GAMESTATES.FORFITTING);
stateMachine.updateState(GAMESTATES.FORFIT_FAILED);
stateMachine.updateState(GAMESTATES.FORFIT);
stateMachine.updateState(GAMESTATES.FORFITTING);
stateMachine.updateState(GAMESTATES.FORFIT_SUCCESS);


stateMachine.updateState(GAMESTATES.SELECT_METHOD_OF_CHALLENGE);
assert(stateMachine.gameState === GAMESTATES.SELECT_METHOD_OF_CHALLENGE, `game state is not SELECT_METHOD_OF_CHALLENGE`);
