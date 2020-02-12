const lookupReservation = () => {
    return {
        id: 1,
        userId: 1,
        reservationDate: 'today',
        status: 'good',
    };
};

const resolvers = {
    Query: {
        reservations: () => [lookupReservation(), lookupReservation()],
        reservation: () => lookupReservation(),
    },
    User: {
        reservations: () => [lookupReservation()],
    },
    Reservation: {
        __resolveReference: obj => lookupReservation(),
        userId: res => {
            console.log(res);
            return res.userId;
        },
    }
};

export default resolvers;
