import { http } from './http'


export const asignacionService = {
    create: async (data) => {
        return await http.post<any>('http://localhost:3000/api/v1/asignaciones', JSON.stringify(data))
    },
    getActivitesByUserId: async (id) => {
        return await http.get<any>('http://localhost:3000/api/v1/asignaciones/'+id)
    },
    getActivitesByRevisar: async () => {
        return await http.get<any>('http://localhost:3000/api/v1/asignaciones')
    },
    getAll: async () => {
        return await http.get<any>('http://localhost:3000/api/v1/asignacionesAll')
    },
    updateAsignacionById: async (id, estado, contenido) => {
        const data= {
            "estado": estado,
            "contenido": contenido
          }
        console.log(data)
        return await http.patch<any>('http://localhost:3000/api/v1/asignaciones/'+id, data)
    },
    updateFeedbackById: async (id, feedback) => {
        const data= {
            "feedback": feedback
          }
        console.log(data)
        return await http.patch<any>('http://localhost:3000/api/v1/asignacionesFeedback/'+id, data)
    },
    getCalificacionesByUser: async (id) => {
        return await http.get<any>('http://localhost:3000/api/v1/calificaciones/'+id)
    }

}