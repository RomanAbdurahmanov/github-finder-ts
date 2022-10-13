import { createContext, useReducer, useContext } from 'react'
import { UserType } from '../../components/users/UserResults'
import githubReducer, { ActionKind } from './GithubReducer'

export interface GithubContextInterface {
  users: UserType[]
  loading: boolean
  fetchUsers: () => void
}

const GithubContext = createContext<GithubContextInterface | undefined>(
  undefined
)

// const GITHUB_URL = process.env.REACT_APP_GUTHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GUTHUB_TOKEN

interface Children {
  children: React.ReactNode
}

export const GithubProvider = ({ children }: Children) => {
  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data: UserType[] = await response.json()
    console.log(data)

    dispatch({
      type: ActionKind.GET_USERS,
      payload: data,
    })
  }

  return (
    <GithubContext.Provider
      value={{
        loading: state.loading,
        users: state.users,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGithubContext = (): GithubContextInterface => {
  const githubContext = useContext(GithubContext)
  if (!githubContext)
    throw new Error(
      'No GithubContext.Provider found when calling useGithubContext.'
    )
  return githubContext
}

export default GithubContext
