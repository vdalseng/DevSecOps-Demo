# Install Trivy

## MacOS/Linux Install
```bash
$ brew update
$ brew install trivy
$ trivy --version

Version: 0.65.0
Vulnerability DB:
  Version: 2
```

## Windows Install
https://github.com/aquasecurity/trivy/releases/

Extract zip folder to a folder of your choosing (`E.g C:\Program Files\Trivy`)

Add the same path where your files were extracted too to your Environment variables.

1. Click Win+R
2. Write `SystemPropertiesAdvanced`
3. Click on `Environment Variables`
4. Click on `System variables` and find the `Path` variable.
5. Paste the address to where you installed Trivy.

Restart your pc for the Environment variables to take effect:

In VSCode, CMD or Powershell, run the following command to verify the installation was successful:
```bash
$ trivy --version

Version: 0.65.0
Vulnerability DB:
  Version: 2
```

# Running Trivy
Open up any project in VSCode.

Open up a terminal in VSCode in PowerShell.

Type 
```bash
trivy fs --scanners vuln,misconfig,secret,license --severity UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL --ignore-unfixed=false --format table .
```

For textfile output, type:

```bash
trivy fs --scanners vuln,misconfig,secret,license --severity UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL --ignore-unfixed=false --format sarif -o trivy.sarif .
```

## Trivy Scan command explaination
Trivy scans your project for multiple security risks:
- **scanners** allows you to specify which vulnerabilities to look for.
  - **vuln**: Finds vulnerabilities in application dependencies (e.g., npm packages).
  - **misconfig**: Detects misconfigurations in files like Dockerfile and config files.
  - **secret**: Searches for hardcoded secrets (API keys, passwords) in your codebase.
  - **license**: Reports software licenses for dependencies to help with compliance.

You can filter results by severity using `--severity` (e.g., `--severity HIGH,CRITICAL`) to focus on important issues. 

Change the output format with `--format` (e.g., `table`, `json`, `sarif`).

Example:
```bash
trivy fs --scanners vuln,misconfig,secret,license --severity HIGH,CRITICAL --format table .
```
This scans for high and critical issues and displays them in a readable table format.
