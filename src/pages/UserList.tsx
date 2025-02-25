import { useEffect, useState } from 'react'
import { UserService } from '../services/userService'

interface User{
  id: number
  name: string
  surname: string
  role: string
  course: string
  email: string
  active: boolean
  accepNotifications: boolean
}
function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function call(){
      try{
        const userList = await UserService.getAll()
        setUsers(userList)      
      }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        setMessage(msg)
      }finally{
        setLoading(false)
      }
    }
    call()
  },[])

  if(loading)    return <div>Loading...</div>
  

  return (


    <div className="relative overflow-x-auto">
      {message}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Apellido
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Rol
            </th>
            <th scope="col" className="px-6 py-3">
              Curso
            </th>
          </tr>
        </thead>
        <tbody>
        { users.map( user => 
          <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {user.name}
            </th>
            <td className="px-6 py-4">
              {user.surname}
            </td>
            <td className="px-6 py-4">
              {user.email}
            </td>
            <td className="px-6 py-4">
              {user.role}
            </td>
            <td className="px-6 py-4">
              {user.course}
            </td>
          </tr>
        )}

        </tbody>
      </table>
    </div>

  )
}

export default UserList