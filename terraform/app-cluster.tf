resource "kind_cluster" "app" {
  name = "app-cluster"
  node_image = "kindest/node:v1.21.1"
}
