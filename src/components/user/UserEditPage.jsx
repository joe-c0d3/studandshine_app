import { useEffect, useState } from 'react'
import UserInfo from './UserInfo'
import EditUser from './EditUser'
import api from '../../api'
import Spinner from '../ui/Spinner'

const UserEditPage = () => {


  const [userInfo, setUserInfo] = useState({})
  const [orderitems, setOrderitems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function(){
    setLoading(true)
    api.get("user_info")
    .then(res => {
      console.log(res.data)
      setUserInfo(res.data)
      setOrderitems(res.data.items)
      setLoading(false)
    })

    .catch(err => {
      console.log(err.message)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Spinner Loading={loading} />
  }

  return (
    <div className="container my-5">
        {/* {Profile Header} */}
        <EditUser userInfo={userInfo}/>
    </div>
  )
}

export default UserEditPage