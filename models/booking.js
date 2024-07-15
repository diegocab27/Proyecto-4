class Booking {
    constructor(name,email,paymentStatus,arrivalDate,departureDate,nameHotel,typeRoom,passengers){
        this.name = name;
        this.email=email;
        this.paymentStatus=paymentStatus;
        this.arrivalDate=arrivalDate;
        this.departureDate=departureDate;
        this.nameHotel=nameHotel;
        this.typeRoom=typeRoom;
        this.passengers=passengers;
    }
}

module.exports={Booking};