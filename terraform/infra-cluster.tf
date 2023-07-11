terraform {
  required_providers {
    kind = {
      source  = "kyma-incubator/kind"
      version = "~> 0.0.11"
    }
  }
}

provider "kind" {}

resource "kind_cluster" "infra" {
  name = "infra-cluster"
  node_image = "kindest/node:v1.21.1"
}

