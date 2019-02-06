import { FETCH_FEEDS_SUCCESS, FETCH_FEED_SUCCESS } from './types'

export default (state = {}, action: any) => {
  switch (action.type) {
    case FETCH_FEEDS_SUCCESS:
      return {
        feeds: action.payload,
      }
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        feed: action.payload.feed,
        activeId: action.payload.activeId,
      }
    default:
      return state
  }
}
