const app = require("../app");
const request = require("supertest");
const db = require("../db");

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('GET user/:id', () => {
    test('It should get a user by id',  done => {
      agent
        .get('/user/62433ae35e20ec104fa9e95f')
        .expect(200);
        done();
    });
    test('It should return status code 500 if user not found',  done => {
        agent
          .get('/user/62433ae35e20ec104fa9e95g')
          .expect(500);
          done();
      });
});

describe('POST auth/login', () => {
    test("It should return status 200 on login", done => {
        agent
            .post("/auth/login")
            .send({email:"ak@gmail.com", password:"amitesh"})
            .expect(200);
        done();
    })
    test("It should return status 400 on login using incorrect password", done => {
        agent
            .post("/auth/login")
            .send({email:"ak@gmail.com", password:"amih"})
            .expect(400);
        done();
    })
    test("It should return status 404 if user is not found", done => {
        agent
            .post("/auth/login")
            .send({email:"akshay@gmail.com", password:"amih"})
            .expect(404);
        done();
    })
})

describe('POST auth/register', () => {
    test("It should return status 200 on register", done => {
        agent
            .post("/auth/register")
            .send({email:"ak@gmail.com", password:"amitesh"})
            .expect(200);
        done();
    })
    test("It should return status 400 on registering duplicate user", done => {
        agent
            .post("/auth/register")
            .send({email:"ak@gmail.com", password:"amitesh"})
            .expect(400);
        done();
    })
})

describe('POST user/:id/updateBio', () => {
    test("It should return status 200", done => {
        agent
            .post("/user/623f68cd908e8c8cbb256612/updateBio")
            .send({
                userId:"623f68cd908e8c8cbb256612",
                username:"THOR : GOD OF THUNDER",
                bio:"newer bio",
                education:"updated education",
                experience:"updated experience"
            })
            .expect(200);
        done();
    })
    test("It should return status 403", done => {
        agent
            .post("/user/623f68cd908e8c8cbb256612/updateBio")
            .send({
                userId:"623f68cd908e8c8cbb256613",
                username:"THOR : GOD OF THUNDER",
                bio:"newer bio",
                education:"updated education",
                experience:"updated experience"
            })
            .expect(403);
        done();
    })
})

describe('POST user/:id/follow', () => {
    test("It should return status 200", done => {
        agent
            .post("/user/623f68cd908e8c8cbb256612/follow")
            .send({userId:"623f68cd908e8c8cbb256612"})
            .expect(200);
        done();
    })
    test("It should return status 403", done => {
        agent
            .post("/user/623f68cd908e8c8cbb256612/follow")
            .send({userId:"623f68cd908e8c8cbb256613"})
            .expect(403);
        done();
    })
})

describe('GET user/search?username=', () => {
    test('It should return users by matching request query',  done => {
      agent
        .get('/user/search?username=amit')
        .expect(200);
        done();
    });
});

describe('GET user/friends/:id', () => {
    test('It should list of users followed by my user',  done => {
      agent
        .get('/user/friends/623f68cd908e8c8cbb256612')
        .expect(200);
        done();
    });
});

describe('GET posts/comment/:postId', () => {
    test('It should list the comments made on a post',  done => {
      agent
        .get('/posts/comment/62473f16fa43a5d9017d68f0')
        .expect(200);
        done();
    });
});

describe('POST posts/comment/:postId', () => {
    test("It should return status 200 on succesfully commenting", done => {
        agent
            .post("/posts/comment/62473f16fa43a5d9017d68f0")
            .send({
                "postId":"62473f16fa43a5d9017d68f0",
                "username":"Amit Kumar",
                "comment":"Excellent!"
            })
            .expect(200);
        done();
    })
})

describe('POST posts/:postId/like', () => {
    test("It should return status 200 on succesfully commenting", done => {
        agent
            .put("/posts/comment/62473f16fa43a5d9017d68f0")
            .expect(200);
        done();
    })
})