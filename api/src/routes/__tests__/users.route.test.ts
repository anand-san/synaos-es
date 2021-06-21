import supertest from "supertest"
import app from "../../app"
import dotenv from 'dotenv';
const mongoose = require("mongoose");

dotenv.config({
    path: '.env'
});

jest.setTimeout(15000)

beforeAll((done) => {
    mongoose.connect(process.env.MONGO_JEST_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () => done())
});

afterAll((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

describe("users.service", () => {

    const userPayload = {
        "phone": 1234567890,
        "uuid": "9182391"
    }

    const userPayload2 = {
        "phone": 1234567890,
        "uuid": "09348503948",
        "name": "John",
        "gender": "Others",
        "dob": new Date().toISOString(),
        "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZtuYPx8ZEvpGPtoKr_JS6LPi-eWQZtWeJQ&usqp=CAU"
    }

    describe("/getUsers", () => {
        it("should return empty array when no users are present", async () => {
            await supertest(app).get("/getUsers").expect(200)
                .then(response => {
                    expect(response.body.status).toBe("Success")
                    expect(response.body.message).toEqual([])
                })
        });
    })

    describe("/createUser", () => {
        it("throws error when required params are missing", async () => {
            await supertest(app).post("/createUser").send({}).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(500)
                    expect(response.body.status).toBe("Error")
                    expect(response.body.message).toEqual('User validation failed: phone: Path `phone` is required., uuid: Path `uuid` is required.')
                })
        })
        it("creates user when valid payload with required params is passed", async () => {
            await supertest(app).post("/createUser").send(userPayload).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(200)
                    expect(response.body.status).toBe("Success")
                    expect(response.body.message.uuid).toEqual(userPayload.uuid)
                    expect(response.body.message.phone).toEqual(userPayload.phone)
                })
        });

        it("throws error when duplicate uuid is passed", async () => {
            await supertest(app).post("/createUser").send(userPayload).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(500)
                    expect(response.body.status).toBe("Error")
                    expect(response.body.message).toEqual(`E11000 duplicate key error collection: jestDB.users index: uuid_1 dup key: { uuid: \"${userPayload.uuid}\" }`)
                })
        });

        it("creates user when valid payload with all parameters is passed", async () => {
            await supertest(app).post("/createUser").send(userPayload2).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(200)
                    expect(response.body.status).toBe("Success")
                    expect(response.body.message.uuid).toEqual(userPayload2.uuid)
                    expect(response.body.message.phone).toEqual(userPayload2.phone)
                    expect(response.body.message.name).toEqual(userPayload2.name)
                    expect(response.body.message.gender).toEqual(userPayload2.gender)
                    expect(response.body.message.dob).toEqual(userPayload2.dob)
                    expect(response.body.message.picture).toEqual(userPayload2.picture)
                })
        });

        it("gets created users", async () => {
            await supertest(app).get("/getUsers").expect(200)
                .then(response => {
                    expect(Array.isArray(response.body.message)).toBeTruthy();
                    expect(response.body.status).toBe("Success")
                    expect(response.body.message.length).toBe(2)
                })
        });
    })

    describe("/deleteUser", () => {
        it("throws error when uuid is not passed in payload", async () => {
            await supertest(app).post("/deleteUser").send({}).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(500)
                    expect(response.body.status).toBe("Error")
                    expect(response.body.message).toEqual("User's UUID is mandatory")
                })
        })
    
        it("deletes user when valid uuid is passed in payload", async () => {
            await supertest(app).post("/deleteUser").send({uuid: userPayload.uuid}).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(200)
                    expect(response.body.status).toBe("Success")
                })
        })

        it("gets remaining users in the system", async () => {
            await supertest(app).get("/getUsers").expect(200)
                .then(response => {
                    expect(response.body.status).toBe("Success")
                    expect(response.body.message.length).toEqual(1)
                })
        });
    })
    describe("/updateUser", () => {
        it("throws error when uuid is not passed in payload", async () => {
            await supertest(app).post("/updateUser").send({}).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(500)
                    expect(response.body.status).toBe("Error")
                    expect(response.body.message).toEqual("User's UUID is mandatory")
                })
        })

        it("updates user when valid uuid is passed in payload", async () => {
            let payload = userPayload2
            payload.name = "Doe"
            await supertest(app).post("/updateUser").send(payload).expect(200)
                .then(response => {
                    expect(response.body.statusCode).toBe(200)
                    expect(response.body.status).toBe("Success")
                })
        })

        it("checks the updated user details", async () => {
            await supertest(app).get("/getUsers").expect(200)
                .then(response => {
                    expect(response.body.status).toBe("Success")
                    expect(response.body.message.length).toEqual(1)
                    expect(response.body.message[0].uuid).toEqual(userPayload2.uuid)
                    expect(response.body.message[0].name).toEqual("Doe")
                })
        });

    })
})

