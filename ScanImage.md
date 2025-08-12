# Scanning a Dockerfile locally

## Creating a Docker Image

```bash
docker build -t mydemoapp:latest .
```

## Scan Image with Trivy

```bash
trivy image <image-name>
```

Example:
```bash
trivy image mydemoapp:latest
```

or

```bash
trivy image --severity HIGH,CRITICAL --format table mydemoapp:latest
```