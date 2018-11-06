import * as helpers from '../roles/helpers'

const initialState = {
    stories: [
        {
            key: 'inProgress',
            title: 'In Progress',
            palette: 'palette-yellow',
            default: true,
        },
        {
            key: 'complete',
            title: 'Complete',
            palette: 'palette-blue',
            default: true,
        },
        {
            key: 'live',
            title: 'Live',
            palette: 'palette-green',
            default: true,
        }
    ],

    storyData: {
        inProgress: [],
        complete: [],
        live: [],
    }
}

const REORDER_BOARD = 'story/reorder-board'
const REORDER_ITEM = 'story/reorder-item'
const RELOCATE_ITEM = 'story/relocate-item'

const ADD_NEW_STORY = 'story/add-new-story'
const ADD_ROLE_TO_STORY = 'story/add-role-to-story'

export function reorderBoard(items) {
    return (dispatch) => {
        dispatch({
            type: REORDER_BOARD,
            payload: items
        })
    }
}

export function reorderItem(key, items) {
    return (dispatch) => {
        dispatch({
            type: REORDER_ITEM,
            payload: {
                key,
                items
            }
        })
    }
}

export function relocateItem(result) {
    return (dispatch, getState) => {
        const { story } = getState()
        let storyClone = {
            ...story.storyData,
            ...result
        }
        
        dispatch({
            type: RELOCATE_ITEM,
            payload: storyClone
        })
    } 
}

export function addNewStory(text) {
    return (dispatch, getState) => {
        const { storyData } = getState().story
        let textNoSpace = text.replace(/\s/g, '').toLowerCase()
        let textUID = helpers.genUID(textNoSpace)

        while(storyData[textUID]) {
            textUID = helpers.genUID(textNoSpace)
        }

        let story = {
            key: textUID,
            title: text,
            palette: 'light-grey',
            default: false,
        }

        dispatch({
            type: ADD_NEW_STORY,
            payload: {
                uid: textUID,
                story,
            }
        })
    }
}

export function addRoleToStory(roleId, storyKey) {
    return (dispatch, getState) => {
        let storyClone = getState().story.storyData[storyKey]
        
        storyClone.unshift(roleId)

        dispatch({
            type: ADD_ROLE_TO_STORY,
            payload: {
                storyKey,
                storyClone
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case REORDER_BOARD:
            return { ...state, stories: action.payload }
        case REORDER_ITEM:
            return { ...state, storyData: { ...state.storyData, [action.payload.key]: action.payload.items } }
        case RELOCATE_ITEM:
            return { ...state, storyData: action.payload }

        case ADD_NEW_STORY:
            return { ...state, stories: [ ...state.stories, action.payload.story ],
                storyData: { ...state.storyData, [action.payload.uid]: [] } }
        case ADD_ROLE_TO_STORY:
            return { ...state, storyData: { ...state.storyData, [action.payload.storyKey]: action.payload.storyClone }}
        default:
            return state;
    }
}