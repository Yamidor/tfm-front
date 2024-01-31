import { http } from './http'


export const authService = {
    postLogin: async (user, password) => {
      const data= {
        "user": user,
        "password": password
      }
      return await http.post<any>('http://localhost:3000/api/v1/usuarios', JSON.stringify(data))
    }
  }