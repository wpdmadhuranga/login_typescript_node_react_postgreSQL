import request from 'supertest';
import app from '../src/app';

describe('API Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('message', 'Server is running');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('Authentication Endpoints', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should require all fields', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', '10005');
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'password123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', '10005');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should require email and password', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('statusCode', '10005');
    });
  });
});
