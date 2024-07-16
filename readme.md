![banner](https://github.com/diegocab27/proyecto1/assets/162330383/d1251c1c-916c-4b7c-b57b-cab573e44281)

# PROYECTO 4: Reservas Hoteleras

El objetivo principal de este proyecto es construir una aplicacion de servicios CRUD para la industria hotelera,específicamente para la gestión de reservas.Además, le proporcionaremos un sistema de búsqueda.

## Autor
- Diego Cabrera Carrasco  [@diegocab27](https://www.github.com/diegocab27)

## Planteamiento

Construir una aplicación de servicios para la gestión de reservas en hoteles que involucre las 4 operaciones CRUD y otras 6 adicionales relacionadas con filtros, utilizando Node.js y Express.


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


#### Index.js

Configuracion del archivo principal de la aplicacion

```
const express = require("express");//Express.js para la creación del servido
const app = express();
const cors = require("cors");// CORS para permitir solicitudes de origen cruzado
require("dotenv").config();

const routes = require("./routes/bookingRouter");//Ruta de los endpoints


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(process.env.URL_BASE + "/", routes);//Direccion principal mas la ruta de endpoints





app.listen(process.env.PORT , () => {
    console.log(`listent in port ${process.env.PORT}`);
  });
  ```

#### Rutas

Se definen los diferentes endpoint para cada solicitud

```
const express = require("express")
const bookingController = require("../controllers/bookingController");

const router = express.Router();


router.post("/",bookingController.createBooking);//creacion de reserva

router.get("/",bookingController.findAll);//Mostrar listado de reservas

router.get("/search",bookingController.search);//Busqueda segun parametro

router.get("/:id",bookingController.findOne);//Encontrar reserva especifica

router.put("/:id",bookingController.update);//Actualizar reserva especifica

router.delete("/:id",bookingController.remove);//Eliminar reserva especifica

module.exports = router;

```

#### Controlador

Se crean las diferentes funciones para realizar las solicitudes de la aplicacion

```
const {Booking} = require("../models/booking");

let bookings = []


//Fucnion para crear reserva
exports.createBooking=(req,res)=>{
    const newBooking = req.body;
    newBooking.id = bookings.length + 1;
    bookings.push(newBooking);
    res.send({ ok: true, description: 'Reserva creada' });

};


//Funcion para mostrar el listado de reservas creadas
exports.findAll=(req,res)=>{
    res.send(bookings);

};


//Funcion para encoentrar reserva especifica
exports.findOne=(req,res)=>{
   
    const id = parseInt(req.params.id);
    console.log(id);
    const result = bookings.filter(p =>p.id == id);
    console.log(result);


    if(result.length===0){
        res.status(404).send({ ok: false, description: `Reserva no encontrada `})

    }

     res.send({ ok: true, description: `Reserva numero ${id} encontrada `,result});


};


//Funcion para la actualizacion de reservas
exports.update=(req,res)=>{
    const id = parseInt(req.params.id);
    console.log(id)
    const bookingIndex = bookings.findIndex(p=> p.id == id)
    if(bookingIndex === -1){
        res.status(404).send({ ok: false, description: `Reserva no encontrada `})
    }else{
        console.log(req.body);
        bookings[bookingIndex]={...bookings[bookingIndex],...req.body}
        res.send({ ok: true, description: `Reserva ${req.params.id} actualizada `,datos:bookings[bookingIndex]});
    }
  
};

//Funcion para elimiinar reserva
exports.remove=(req,res)=>{
    const id = parseInt(req.params.id);
    console.log(id)
    const bookingIndex = bookings.findIndex(p=> p.id == id)
    if(bookingIndex === -1){
        res.status(404).send({ ok: false, description: `Reserva no encontrada `})
    }else{
        bookings.splice(bookingIndex,1)
        res.send({ ok: true, description: `Reserva ${req.params.id} eliminada ` });

    }

};


exports.search= (req, res) => {

    const filteredBooking = bookings.filter((booking) =>{
        //Filtado de nombre de hotel
        if(booking.nameHotel === req.query.nameHotel){
            return true 
        }

        
        //Filtrado de fechas segun tramo de entrada y salida
        if(req.query.arrivalDate<=req.query.departureDate){
            if(booking.departureDate>=req.query.departureDate){
                if(booking.arrivalDate<=req.query.departureDate)
                return true
            }
            if(booking.arrivalDate<=req.query.arrivalDate){
                if(booking.departureDate>=req.query.arrivalDate)
                return true
            }

        }

        //Filtrado por tipo de habitacion
        if(booking.typeRoom === req.query.typeRoom){
            return true 
        }
        //Filtrado por estado de pago
        if(booking.paymentStatus === req.query.paymentStatus){
            return true 
        }
        //Filtrado por numero de pasajeros
        if(booking.passengers === parseInt(req.query.passengers)){
            return true 
        }        
    
    })
    
    //Si no encuentra la reserva envia mensaje de no encontrado
    if (filteredBooking.length === 0) { 
        return res.status(404).send({ ok: false, description: `Busqueda no encontrada`})
    }

    //Respuesta a la reserva encontrada
    res.send({ ok: true, description: `Busqueda de filtro encontrada `,filteredBooking});
}

```


#### Pruebas en Insomnia

-Creacion de reserva

![image](https://github.com/user-attachments/assets/f4af2aa3-204a-4002-bf7e-cf16b1b0059e)

-Lista de reservas
![image](https://github.com/user-attachments/assets/0f7c1f9f-e166-4df8-9105-1e29644ffccf)

-Busqueda por ID

![image](https://github.com/user-attachments/assets/9f2a47d9-7756-499d-ba01-071c898f18eb)

-Actualizacion de reserva

![image](https://github.com/user-attachments/assets/0fbf857b-eefb-4e02-a4b8-a91d0a7bd7e5)

-Eliminar reserva

![image](https://github.com/user-attachments/assets/5c7da241-4ba6-42e8-b01d-1189563fc241)

-Filtrado por Nombre de hotel

![image](https://github.com/user-attachments/assets/0d6b76e3-21bb-4524-8983-34c497f35ba7)

-Filtrado por rango de fecha

![image](https://github.com/user-attachments/assets/9bf3fc72-bc30-4a5b-ad06-383a4b78c960)

-Filtrado por estado de pago
![image](https://github.com/user-attachments/assets/8468d067-4166-427c-8582-caff4023ed5d)

-Filtrado por tipo de habitacion

![image](https://github.com/user-attachments/assets/ae61b7c7-9faf-4863-8289-138685dd0df0)

-Filtrado por cantidad de huepedes

![image](https://github.com/user-attachments/assets/633fe6f1-205b-433f-aafb-a15d6380fb43)












