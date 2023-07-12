# JW Scaler Application

This repository contains the code for JW Scaler, a cloud-native application that leverages Kubernetes and MinIO object storage server for scalable image fetching.

## Table of Contents
- [Installation](#installation)
- [Running the Application](#running-the-application)


## Installation

To install and run the JW Scaler, you'll need to have [Docker](https://www.docker.com/get-started), [Kubernetes](https://kubernetes.io/docs/home/), [Helm](https://helm.sh/docs/intro/install/), and [MinIO](https://docs.min.io/docs/minio-quickstart-guide.html) installed on your machine.

1. **Clone the repository**

git clone https://github.com/franciscodiego64/sre-challenge.git


2. **Switch to the app-cluster context in Kubernetes**

kubectl config use-context kind-app-cluster


3. **Install MinIO server in the app-cluster**

Add the MinIO Helm chart to your Helm repositories.

helm repo add minio https://helm.min.io/

Install the MinIO server using Helm.

helm install --namespace minio-ns --create-namespace minio minio/minio


4. **Create a bucket named 'postersv2' in the MinIO server**

5. **Upload images to the 'postersv2' bucket**

6. **Build the Docker image and push it to your Docker Hub account**

Replace `franciscodiego64/jw-scaler` with your Docker Hub account and image name.

docker build -t franciscodiego64/jw-scaler .
docker push franciscodiego64/jw-scaler


7. **Update the Kubernetes manifest files**

Replace the image name in the deployment.yaml with your Docker image.

8. **Deploy the application to the app-cluster**

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml


## Running the Application

1. **Expose the application to your local machine**

kubectl port-forward service/jw-scaler-service 3000:3000


2. **Access the images**

Open your browser and navigate to http://localhost:3000/[imageName] where [imageName] is the name of the image file in the 'postersv2' bucket.





