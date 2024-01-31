import { http } from './http'


export const actividadService = {
    getAll: async () => {
        return await http.get<any>('http://localhost:3000/api/v1/actividades')
    }
}