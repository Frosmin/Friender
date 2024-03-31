import { apiSlice } from "../api/apiSlice";

const solicitudApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    enviarSolicitud : builder.mutation({
        query : (data) => ({
          url: "/solicitud",
          method : "POST",
          body: data,
        })
      }),
    getSolicitudes : builder.query({
      query : (id_cliente) => `/cliente/solicitudes/${id_cliente}` 
    })
  }),
});

export const { useEnviarSolicitudMutation, useGetSolicitudesQuery} =
  solicitudApi;