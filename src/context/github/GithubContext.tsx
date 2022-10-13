import { createContext, useState, useContext } from 'react'
import { UserType } from '../../components/users/UserResults'

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
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()
    console.log(data)

    setUsers(data)
    setLoading(false)
  }

  return (
    <GithubContext.Provider
      value={{
        loading,
        users,
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
