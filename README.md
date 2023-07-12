# JW-Scaler App

This project provides a simple Express.js HTTP service, `jw-scaler`, that serves up movie poster images stored in a MinIO bucket. The app is deployed to a Kubernetes cluster using Terraform and Helm.

## Requirements
- Node.js
- Docker
- Kubernetes (kind)
- MinIO
- Terraform
- Helm

## Setup

1. **Install dependencies:** Run `npm install` in the `jw-scaler/app` directory.
2. **Build the Docker image:** Run `docker build -t yourusername/jw-scaler .` in the `jw-scaler` directory.
3. **Push the Docker image to DockerHub:** Run `docker push yourusername/jw-scaler`.

## Terraform Infrastructure Setup

We use Terraform to automate the setup of our Kubernetes clusters. The `terraform` directory contains the configuration files for setting up the infrastructure.

The `app-cluster.tf` file is used to create a new Kubernetes cluster named `app-cluster`, while `infra-cluster.tf` is used to set up the infrastructure cluster.

To initialize Terraform, navigate to the `terraform` directory and run `terraform init`.

To apply the Terraform configuration, run `terraform apply`.

## MinIO Setup

1. **Set up MinIO in the Kubernetes cluster:** Use Helm to install MinIO in the cluster. Update the `values.yaml` file in the `helm/minio` directory as needed.
2. **Create a bucket in MinIO:** Use the MinIO client (`mc`) to create a new bucket called `postersv2`.
3. **Upload movie poster images to the MinIO bucket:** Use the `mc` command to upload images to the `postersv2` bucket.

## Deploy the App

Update the `index.js` file in the `jw-scaler/app` directory with the correct MinIO service endpoint and credentials. Then, deploy the `jw-scaler` app to the Kubernetes cluster with the updated Docker image.

## Terraform in This Project

In this challenge, we use Terraform to set up our Kubernetes clusters and manage any associated resources. Our Terraform scripts define what resources are needed, and Terraform ensures that these resources exist and are configured correctly.

The `terraform` directory holds all our Terraform files. The `app-cluster.tf` and `infra-cluster.tf` files are used to create our application and infrastructure clusters, respectively. The `providers.tf` file is used for the provider configuration.

## Using the App

Once everything is set up, run it with `kubectl port-forward service/jw-scaler-service 3000:3000`

Then navigate to `http://localhost:3000/your-image-name.jpeg` in a web browser to fetch an image.

Replace `your-image-name.jpeg` with the name of an image file you uploaded to the `postersv2` MinIO bucket. For example, if you uploaded a file named `example.jpeg`, you would navigate to `http://localhost:3000/example.jpeg`.

## Monitoring

In a production environment, we would add monitoring tools to track the health and performance of the service. Some basic aspects to monitor might include:

- **HTTP response times:** This would allow us to identify any slowdowns in the service.
- **Error rates:** Monitoring for increases in 4xx and 5xx status codes would alert us to potential issues.
- **CPU and memory usage:** This would help us ensure the service is appropriately resourced and not under strain.
- **Logging:** Information to include in logs might be timestamps, endpoints hit, request/response size, request duration and any error or exception information.

Tools like Prometheus, Grafana and the Elastic Stack (Elasticsearch, Logstash, Kibana) are often used for these purposes.

## DDoS Protection

In the event of a DDoS attack, we could take several measures to protect our service:

- **Rate limiting:** Limit the number of requests a single client IP can make in a specific timeframe.
- **Traffic analysis:** Tools like Cloudflare can help identify and block traffic patterns typical of DDoS attacks.
- **Scaling up:** In some cases, it may be necessary to scale up our resources to handle the increase in traffic.
- **Content Delivery Network (CDN):** A CDN can absorb the increased traffic and also help distribute traffic effectively.

**Notes**
Ensure that you have the correct context selected in Kubernetes when applying the configurations. You can switch context using kubectl config use-context <context-name>. In this case the context are `kind-infra-cluster` and `kind-app-cluster`
Ensure that your MinIO service in the infrastructure cluster is exposed and accessible from the application cluster. (see `minio-service.yaml`)