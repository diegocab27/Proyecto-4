![banner](https://github.com/diegocab27/proyecto1/assets/162330383/d1251c1c-916c-4b7c-b57b-cab573e44281)

# PROYECTO 3: Landing de Negocio

En este proyecto se realiza una landing page para un negocio de una tienda ficticia, implementando HTML y CSS.


## Autor
- Diego Cabrera Carrasco  [@diegocab27](https://www.github.com/diegocab27)

## Planteamiento

El objetivo principal de este proyecto es construir una aplicacion de servicios CRUD para la industria hotelera,específicamente para la gestión de reservas.Además, le proporcionaremos un sistema de búsqueda.


#### End Points

| Descripción                                    | Método | Endpoint                            
| ---------------------------------------------- | ------ | --------------------------
| Realizar la creacion de una reserva en especifico | POST    | api/reservas                    |
| Mostrar lista de reservas creadas | GET    |  api/reservas                   |
| Mostrar una reserva en especifico con el id      | GET | /api/reservas/:id                     |
| Actualizar una reserva especifica               | PUT   | /api/reservas/:id |
|Eliminar una reserva especifica                  | DEL   | /api/reservas/:id | 
|Filtrar reserva por nombre de hotel              | GET    | /reservas/search?nameHotel=nameHotel | 
|Filtrar reserva por fecha de ingreso y salida     | GET    | /api/reservas/search?arrivalDate=arrivalDate&departureDate=departureDate| 
|Filtrar reserva por estado de pago              | GET    | /api/reservas/search?paymentStatus=paymentStatus| 
|Filtrar reserva por tipo de habitacion             | GET    | /api/reservas/search?typeRoom=typeRoom| 
|Filtrar reserva por numero de huespedes           | GET    | /api/reservas/search?passengers=passengers| 



