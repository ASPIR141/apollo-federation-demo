const lookupUser = () => ({
    id: 1,
    firstName: 'Jake',
    lastName: 'Dawkins',
    address: 'everywhere',
});

const resolvers = {
    Query: {
        user: () => lookupUser(),
    },
    User: {
        __resolveReference(object) {
            return lookupUser();
        },
    },
    Reservation: {
        user: ({ userId }) => {
            /**
             * The old stitched resolvers called the Query.user resolver to lookup
             * a user, but since we're in this service, we can just use whatever we
             * need to lookup a user.
             */
            return lookupUser();
        },
    },
};

export default resolvers;
