# Local GitOps Monorepo (KinD + Flux CD + Kustomize + MongoDB)

This repository is a fully self-contained Monorepo demonstrating end-to-end GitOps delivery for a Node.js + MongoDB application across `dev` and `prod` local KinD clusters.

## Architecture

- **Monorepo Structure:** App source code, Docker configs, KinD cluster manifests, and Flux GitOps declarations reside in the same repository.
- **Clusters:**
  - `dev-cluster`: 1 Control Plane + 3 Workers | 1 App Replica | Exposed at `http://localhost:8081`
  - `prod-cluster`: 1 Control Plane + 3 Workers | 3 App Replicas | Exposed at `http://localhost:8082`
- **Data Persistence:** MongoDB StatefulSet retains state on host machine (`$HOME/kind-storage/...`), persisting data across cluster teardowns.

## Prerequisites

- [Docker Desktop](https://www.docker.com/)
- [KinD](https://kind.sigs.k8s.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Flux CLI](https://fluxcd.io/flux/installation/)

## Quick Start Guide

### 1. Create Persistent Host Mount Directories
```bash
mkdir -p $HOME/kind-storage/dev-mongo$HOME/kind-storage/prod-mongo
chmod 777 $HOME/kind-storage/dev-mongo$HOME/kind-storage/prod-mongo
```

# Create clusters

```bash
kind create cluster --config kind/dev-cluster.yaml
kind create cluster --config kind/prod-cluster.yaml
```

# Sideload image into KinD nodes
```bash
kind load docker-image node-app:latest --name dev-cluster
kind load docker-image node-app:latest --name prod-cluster
```