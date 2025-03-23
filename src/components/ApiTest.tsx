import React, { useEffect } from 'react'
import axios from 'axios';
export const ApiTest = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiN2QyMzE0NDItYTI4Ny00ZDViLThiM2QtNjc1YjFlMGY5MTc0IiwiZXhwIjoxNzQyNTk5MzQ0LCJpYXQiOjE3NDI1OTc1NDR9.XLx7bc5chni4mMdTJGu90_JFWfilXcsl6BkRPXefFd8";
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    type User = {
        id: string;
        first_name: string;
        last_name: string;
        login: string;
        password: string;
      };
    useEffect(() => {
       const fetchData = async () => {
        setLoading(true);
        const response = await axios.get<User>(`${import.meta.env.VITE_API_URL}/users/me/get`, {
            headers: { Authorization: `Bearer ${token}` },
          });

            setUser(response.data);
            setLoading(false);
       }
         fetchData();
    },[])

  if(loading)
    return (
    <div>ApiTest</div>
  )

  if(!loading)
    return (
    <div>
        <h1>{user?.first_name}</h1>
        <h1>{user?.last_name}</h1>
        <h1>{user?.login}</h1>
        <h1>{user?.password}</h1>
    </div>
  )
}
