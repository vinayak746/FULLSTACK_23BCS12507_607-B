# AWS Full Stack App Deployment

## Overview
This project demonstrates deploying a full-stack application on AWS using various AWS services including EC2, S3, RDS, and Elastic Beanstalk.

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js (v14 or higher)
- Git
- Basic knowledge of React, Node.js, and AWS services

## Architecture
```
Client (React) → S3 + CloudFront
         ↓
    API Gateway → Lambda/EC2 (Node.js Backend)
         ↓
    RDS (PostgreSQL/MySQL)
```

## Project Structure
```
1_AWS_FullStack_APP/
├── frontend/           # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/            # Node.js/Express API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── infrastructure/     # AWS CloudFormation/Terraform
└── README.md
```

## Setup Instructions

### 1. Frontend Setup (React)
```bash
cd frontend
npm install
npm run build
```

### 2. Backend Setup (Node.js)
```bash
cd backend
npm install
node server.js
```

### 3. AWS Configuration

#### S3 Bucket for Frontend
```bash
# Create S3 bucket
aws s3 mb s3://your-app-name-frontend

# Upload build files
aws s3 sync build/ s3://your-app-name-frontend

# Enable static website hosting
aws s3 website s3://your-app-name-frontend --index-document index.html
```

#### EC2 Instance for Backend
```bash
# Launch EC2 instance (Ubuntu)
aws ec2 run-instances --image-id ami-xxxxxxxxx --instance-type t2.micro --key-name your-key

# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js and deploy
sudo apt update
sudo apt install nodejs npm -y
```

#### RDS Database Setup
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier mydb \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password yourpassword \
  --allocated-storage 20
```

## Code Scaffolding

### Backend Server (server.js)
```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.get('/api/data', (req, res) => {
  res.json({ data: 'Sample data from AWS backend' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Frontend API Service (api.js)
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
```

### Database Connection (db.js)
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

## Environment Variables

Create `.env` file in backend:
```
PORT=5000
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=5432
DB_NAME=mydb
DB_USER=admin
DB_PASSWORD=yourpassword
AWS_REGION=us-east-1
```

## Deployment Steps

1. **Deploy Frontend to S3**
   ```bash
   npm run build
   aws s3 sync build/ s3://your-bucket-name
   ```

2. **Deploy Backend to EC2/Elastic Beanstalk**
   ```bash
   eb init
   eb create production-env
   eb deploy
   ```

3. **Configure CloudFront** (Optional)
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure SSL certificate

## Security Considerations
- Use IAM roles with least privilege
- Enable HTTPS/SSL certificates
- Configure Security Groups properly
- Use AWS Secrets Manager for sensitive data
- Enable CloudWatch logging

## Monitoring
- CloudWatch for logs and metrics
- AWS X-Ray for tracing
- Set up alarms for critical metrics

## Cost Optimization
- Use t2.micro instances (free tier)
- Configure auto-scaling
- Use S3 lifecycle policies
- Monitor and optimize RDS usage

## Troubleshooting
- Check CloudWatch logs
- Verify Security Group rules
- Ensure environment variables are set
- Test database connectivity

## Resources
- [AWS Documentation](https://docs.aws.amazon.com/)
- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)

## License
MIT

## Contributors
Your Name - Full Stack Developer
