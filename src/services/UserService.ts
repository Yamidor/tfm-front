import { http } from './http'


export const userService = {
    getStudents: async () => {
        return await http.get<any>('http://localhost:3000/api/v1/estudiantes')
    },
    postStudent: async (data) => {
        return await http.post<any>('http://localhost:3000/api/v1/estudiantes', JSON.stringify(data))
    }

}