// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import { Response } from 'superagent';
// import { MatchsMock } from './mocks/matchsMock';

// import Matchs from '../database/models/Matchs';


// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Testing /matchs', () => {

//   let chaiHttpResponse: Response;

//   describe('1.Successfully list all matchs', async () => {

//     beforeEach(async () => {
//       sinon.stub(Matchs, 'findAll').callsFake(MatchsMock.findAll)
//     })
  
//     afterEach(async () => {
//       (Matchs.findAll as sinon.SinonStub).restore();
//     })
    
//     it('You get 200 status', async () => {
//       chaiHttpResponse = await chai.request(app)
//           .get('/matchs')
          
        
//       expect(chaiHttpResponse).to.have.status(200);
//     })

//     it('You get all matchs', async () => {
//       chaiHttpResponse = await chai.request(app)
//           .get('/matchs')
          
        
//       expect(chaiHttpResponse.body).to.have.length(48);
//     })
//   });

//   describe('2.Search for matches by filtering by in progress', async () => {

    
//     describe('Filtering for matches with false in progress', async () => {

//       beforeEach(async () => {
//         sinon.stub(Matchs, 'findAll').callsFake(MatchsMock.findByProgressFalse)
//       })
    
//       afterEach(async () => {
//         (Matchs.findAll as sinon.SinonStub).restore();
//       })

//       it('You get status 200 and all matchs', async () => {
//         chaiHttpResponse = await chai.request(app)
//             .get('/matchs?inProgress=false')
            
//         expect(chaiHttpResponse).to.have.status(200);
//       })

//       it('You get receive all matchs with false in Progress', async () => {
//         chaiHttpResponse = await chai.request(app)
//             .get('/matchs?inProgress=false')
            
//         expect(chaiHttpResponse.body.length).to.eq(40);
//       })
//     })

//     describe('Filtering for matches with true in progress', async () => {

//       beforeEach(async () => {
//         sinon.stub(Matchs, 'findAll').callsFake(MatchsMock.findByProgressTrue)
//       })
    
//       afterEach(async () => {
//         (Matchs.findAll as sinon.SinonStub).restore();
//       })

//       it('You get status 200 and all matchs', async () => {
//         chaiHttpResponse = await chai.request(app)
//             .get('/matchs?inProgress=true')
        
        
//         expect(chaiHttpResponse).to.have.status(200);
//       })

//       it('You get receive all matchs with true in Progress', async () => {
//         chaiHttpResponse = await chai.request(app)
//             .get('/matchs?inProgress=true')
            
//         expect(chaiHttpResponse.body.length).to.eq(8);
//       })
//     })
//   });
  
//   describe('3.You successfully create the match', async () => {
//     let loginResponse: Response;
//       it('You get a 201 status with the match created', async () => {
//         loginResponse = await chai.request(app)
//         .post('/login')
//         .send({
//           email: 'admin@admin.com',
//           password: 'secret_admin'
//         });
//         const { token } = loginResponse.body;
//         chaiHttpResponse = await chai.request(app)
//         .post('/matchs')
//         .set('authorization', token)
//         .send({
//           "homeTeam": 16, 
//           "awayTeam": 8,
//           "homeTeamGoals": 2,
//           "awayTeamGoals": 2,
//           "inProgress": true  
//         })
        
//       expect(chaiHttpResponse).to.have.status(201);
//       expect(chaiHttpResponse.body).to.be.an('object');
//     });
//   })

//   describe("4.You don't succeed", async () => {

//     it("If you try to enter a match with a team that doesn't exist", async () => {
//       let loginResponse = await chai.request(app)
//         .post('/login')
//         .send({
//           email: 'admin@admin.com',
//           password: 'secret_admin'
//         });
//       const { token } = loginResponse.body;
//       let chaiHttpResponse = await chai.request(app)
//         .post('/matchs')
//         .set('authorization', token)
//         .send({
//           "homeTeam": 687,
//           "awayTeam": 16,
//           "homeTeamGoals": 2,
//           "awayTeamGoals": 2,
//           "inProgress": true
//         });
//         expect(chaiHttpResponse).to.have.status(401);
//         expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
//     })

//     it("If you try to enter a match with teams that doesn't exist", async () => {
//       let loginResponse = await chai.request(app)
//         .post('/login')
//         .send({
//           email: 'admin@admin.com',
//           password: 'secret_admin'
//         }) 
    
//       const { token } = loginResponse.body;

//       chaiHttpResponse = await chai.request(app)
//           .post('/matchs')
//           .set('authorization', token)
//           .send({
//             "homeTeam": 567, 
//             "awayTeam": 878,
//             "homeTeamGoals": 2,
//             "awayTeamGoals": 2,
//             "inProgress": true 
//           }) 
        
//       const { body, status } = chaiHttpResponse;
//       expect(status).to.equal(401);
//       expect(body.message).to.equal('There is no team with such id!');
//     })

//     it("If you try to insert two equal teams in a match", async () => {
//       let loginResponse = await chai.request(app)
//         .post('/login')
//         .send({
//           email: 'admin@admin.com',
//           password: 'secret_admin'
//         }) 
    
//       const { token } = loginResponse.body;

//       chaiHttpResponse = await chai.request(app)
//           .post('/matchs')
//           .set('authorization', token)
//           .send({
//             "homeTeam": 8, 
//             "awayTeam": 8,
//             "homeTeamGoals": 2,
//             "awayTeamGoals": 2,
//             "inProgress": true 
//           }) 
        
//       const { body, status } = chaiHttpResponse;
//       expect(status).to.equal(401);
//       expect(body.message).to.equal('It is not possible to create a match with two equal teams');
//     })
//   });

//   describe('5.Updating a finished game', async () => {
//     it('Successfully updating', async () => {
//       chaiHttpResponse = await chai.request(app)
//           .patch('/matchs/46/finish')
          
//       const { body, status } = chaiHttpResponse;
//       expect(status).to.equal(200);
//       expect(body.id).to.equal(46);
//       expect(body.homeTeam).to.equal(4);
//       expect(body.homeTeamGoals).to.equal(1);
//       expect(body.awayTeam).to.equal(12);
//       expect(body.awayTeamGoals).to.equal(1);
//       expect(body.inProgress).to.equal(0);
//     })

//   })

//   describe('6.Updating goals', async () => {
//     it('Successfully updating', async () => {
//       chaiHttpResponse = await chai.request(app)
//           .patch('/matchs/4')
//           .send({
//             "homeTeamGoals": 3,
//             "awayTeamGoals": 1
//           })
          
//       const { body, status } = chaiHttpResponse;
//       expect(status).to.equal(200);
//       expect(body.id).to.equal(4);
//       expect(body.homeTeam).to.equal(3);
//       expect(body.homeTeamGoals).to.equal(3);
//       expect(body.awayTeam).to.equal(2);
//       expect(body.awayTeamGoals).to.equal(1);
//       expect(body.inProgress).to.equal(0);
//     })
//   });
// });
