export const corsOptions = {

    origin: [

        "http://localhost:3000",

        "http://localhost:5173"

    ],

    credentials: true,

    methods: [

        "GET",

        "POST",

        "PUT",

        "PATCH",

        "DELETE"

    ],

    allowedHeaders: [

        "Content-Type",

        "Authorization"

    ]

};