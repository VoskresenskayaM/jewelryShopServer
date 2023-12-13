const request = require("supertest");

it("should return Hello Test", function(done){
     
    request(app)
        .get("/")
        .expect("Hello Test")
        .end(done);
});