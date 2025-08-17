# 🛡️ Install Trivy

## 🍎 MacOS/Linux Install
```bash
$ brew update
$ brew install trivy
$ trivy --version
```

Expected output:
```bash
Version: 0.65.0
Vulnerability DB:
  Version: 2
```

## 🖥️ Windows Install

### 📥 Step 1: Download Trivy
**Option A:** Use the included version: [tools/trivy_0.65.0_Windows-64bit.zip](/tools/trivy_0.65.0_Windows-64bit.zip)  
**Option B:** Download from [Trivy Releases page](https://github.com/aquasecurity/trivy/releases/)

### 📂 Step 2: Extract to a folder
Extract zip to a folder of your choosing (E.g `C:\Program Files\Trivy`)

### ⚙️ Step 3: Add Trivy to Environment Variables
1. Press `Win + R` → type `SystemPropertiesAdvanced` → Enter
2. Click **Environment Variables**
3. Under **System variables**, find and edit **Path**
4. Add: `C:\Program Files\Trivy`
5. **Restart your PC** for changes to take effect

### ✅ Step 4: Verify Installation
```bash
trivy --version
```

Expected output:
```
Version: 0.65.0
Vulnerability DB:
  Version: 2
```

# 🚀 Running Trivy Locally
## ⚡ Quick Start
```bash
# Navigate to project folder
cd .\MyDemoApp\

# Run security scan
npm run scan
```

## 🔧 Manual Trivy Commands

### 📊 Basic Scan (Table Output)
```bash
trivy fs --scanners vuln,misconfig,secret,license --severity UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL --ignore-unfixed=false --format table .
```

### 📄 Generate Report File
```bash
trivy fs --scanners vuln,misconfig,secret,license --severity UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL --ignore-unfixed=false --format sarif -o trivy.sarif .
```

### 🎯 Focus on Critical Issues Only
```bash
trivy fs --scanners vuln,misconfig,secret,license --severity HIGH,CRITICAL --format table .
```

## 🔍 Scanner Types Explained
| Scanner | Purpose | Example Findings |
|---------|---------|------------------|
| 🐛 `vuln` | Vulnerabilities in dependencies | Outdated npm packages with known CVEs |
| ⚙️ `misconfig` | Configuration issues | Insecure Dockerfile settings |
| 🔑 `secret` | Hardcoded secrets | API keys, passwords in code |
| 📜 `license` | License compliance | GPL vs MIT license conflicts |

## 📋 Output Formats
- 📊 `table` - Human-readable console output
- 🔧 `json` - Machine-readable for CI/CD
- 🔗 `sarif` - For GitHub Security tab integration