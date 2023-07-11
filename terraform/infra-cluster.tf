resource "kind_cluster" "infra" {
  name = "infra-cluster"
  node_image = "kindest/node:v1.21.1"
}

