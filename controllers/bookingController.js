const {Booking} = require("../models/booking");



let bookings = []


exports.createBooking=(req,res)=>{
    const newBooking = req.body;
    newBooking.id = bookings.length + 1;
    bookings.push(newBooking);
    res.send({ ok: true, description: 'Reserva creada' });

};

exports.findAll=(req,res)=>{
    res.send(bookings);

};

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

        if(booking.nameHotel === req.query.nameHotel){
            return true 
        }

        

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


        if(booking.typeRoom === req.query.typeRoom){
            return true 
        }
        if(booking.paymentStatus === req.query.paymentStatus){
            return true 
        }
        if(booking.passengers === parseInt(req.query.passengers)){
            return true 
        }        
    
    })
    

    if (filteredBooking.length === 0) { 
        return res.status(404).send({ ok: false, description: `Busqueda no encontrada`})
    }

    res.send({ ok: true, description: `Busqueda de filtro encontrada `,filteredBooking});
}

