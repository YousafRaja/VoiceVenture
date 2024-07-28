# Voiceventure CI/CD Pipeline

This repository demonstrates how to build a CI/CD pipeline using GitHub Actions for deploying a Node.js application to Amazon Elastic Kubernetes Service (EKS), with HTTPS support. Note that HTTPS support requires ownership of a registered domain.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- AWS CLI installed and configured.
- eksctl for managing EKS clusters.
- kubectl for debugging with Kubernetes (optional).
- npm for running tests locally (optional).

## Setup Instructions

### 1. Create an ECR Repository

To store Docker images, you will need to create an ECR repository in AWS:

1. Navigate to **Amazon ECR** > Private registry > Repositories > Create repository.
3. For the Repository name, use **voiceventure**.

### 2. Create an EKS Cluster

Use the following command to create an EKS cluster named `voiceventure` in `us-east-2`. 

```bash
eksctl create cluster --name voiceventure --region us-east-2 --nodegroup-name linux-nodes --node-type t2.micro --nodes 2
```

### 3. Setup Github Repo
1. Create a new empty github repo (public or private)
2. From your repo's homepage navigate to Settings > Secrets and Variables > Actions > New repository secret
3. Enter ```AWS_ACCESS_KEY_ID``` for the Name, enter the corresponding value in Secret* and click Add secret.
4. Repeat the above instructions for ```AWS_SECRET_ACCESS_KEY```.
5. Clone your repo locally
6. Copy the files in this repo to your locally
7. In deployment.yaml, replace `472829450908` with your AWS Account Id.

### 4. Deploy Load Balancer
1. Checkout a new branch, i.e git checkout -b voiceventure-initial-setup
2. Commit the files that were added in the previous step and create a new pull request 
3. Navigate to your PR in github and create a draft PR
4. Under the Actions tab, you should see the deployment of your changes

### 5. Set Up SSL/TLS Certificates
Register a domain name 
1. Route53 > Dashboard > Register domain

Create a Certificate and Route53 Records
1. Certificate Manager > Request a certificate > Request public certificate > Next
2. Under Fully qualified domain name, enter the registered domain name, click Request
4. Certificate Manager > Your requested certificate > Create record in Route53. You should see the Route53 record from the previous step appear in the search.
5. Click Create records, this will add the CNAME record to your Route53 record.
6. It will take some time for Pending validation to complete.
7. Navigate to Route53 > Hosted zones > Created hosted zone > Create record
8. Enable Alias, pick the following options in the dropdown
- Alias to Application and Classic Load Balancer.
- US East (Ohio)
- The load balancer you created in the previous step





### 6. Configure Load Balancer Listeners 
1. EC2 > Load balancers > Select the deployed load balancer
2. Click Managed listeners
3. Add a new listener with the following properties
- Listener protocol : HTTPS
- Port : 443
- Instance Protocol: HTTP
- Instance port : <Use the same instance port number as the exciting listener on TCP Port 80>
- Security policy : ELBSecurityPolicy-2016-08
- Default SSL/TLS certificate : Attach the certificate created in the previous step
4. Click Save changes

### 7. Update Load Balancer Security groups
1. EC2 > Load balancers > Select the deployed load balancer
2. Under the Security tab select the single Security Group then click Edit inbound rules
3. Remove the existing rule which allows traffic on TCP port 80. Add a rule to allow traffic on type HTTPS, Protocol TCP and Port 443, Source custom, 0.0.0.0/0. Click Save rules.

### Warning
- When registering a domain on Route53, a Hosted zone and Route53 record will automatically be created with the name servers for your domain. Do not delete this record and attempt to re-create it as this will result in a new set of name servers on Route53 while the internet will still expect the original set.
 
# Ideas for improvement
### Deploy to non-production environments  
- A seperate AWS Account should be created for the non-production environments. Github actions can be configured to deploy to each account as needed.
### Seperate Deployment and Testing
- Currently the pipeline automatically deploys if all tests pass which is okay for production but these steps should not be coupled for non-production.
### Branch Protection 
- Directly pushing to main should not be allowed. All changes should be merged from PR approved branches.
### Code Linting 
- Autoformatted code speeds up development and PR reviews.
### Monitoring 
There are several options here, I would pick one of the below.
Monitoring with AWS:
- Pros: Typically easier to get started as it's integrated with the other services.
- Cons: Vendor lock-in. Will require using additional AWS services which will make it harder to switch to a different solution in the future.
Monitoring with Datadog:
- Pros: Significantly better UI and overall experience compared to AWS which makes it easier to debug.
- Cons: Requires more upfront time investment to setup. 

 


