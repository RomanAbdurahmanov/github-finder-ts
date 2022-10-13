import React from 'react'
import { UserType } from '../../components/users/UserResults'

export enum ActionKind {
  GET_USERS = 'GET_USERS',
}

interface Action {
  type: ActionKind
  payload: UserType[]
}

interface GithubReducerState {
  users: UserType[]
  loading: boolean
}

const githubReducer = (state: GithubReducerState, action: Action) => {
  switch (action.type) {
    case ActionKind.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default githubReducer
