# DevSecOps-Demo
A small demo project to showcase a very simple CI/CD pipeline, along with some security tools, GitHub Actions and Docker.

# Prerequisits
To run this project locally, you will need:

1. Trivy - Click [here](/Trivy.md) for a detailed guide.
2. A GitHub Account - [GitHub Login](https://github.com/login)
3. Docker Desktop - [Windows Install](https://docs.docker.com/desktop/setup/install/windows-install/) | [MacOs Install](https://docs.docker.com/desktop/setup/install/mac-install/)

**PS**: Podman Desktop also works as an alternativ to Docker Desktop.

## Running the App
```bash
cd .\MyDemoApp\
npm install
npm run dev
```

## Running Trivy manually from the terminal
Runs a trivy command called `scan`. You can find it in the [package.json](/MyDemoApp/package.json) file under scripts.
```bash
cd .\MyDemoApp\
npm run scan
```