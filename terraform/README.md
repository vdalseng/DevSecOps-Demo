# Intentionally Misconfigured Terraform Azure Setup

⚠️ **WARNING: This is an intentionally insecure Terraform configuration for educational and demonstration purposes. DO NOT use this in production environments.**

## Overview

This directory contains a deliberately misconfigured Terraform module for Azure Resource Manager (AzureRM) that demonstrates common security vulnerabilities and misconfigurations found in infrastructure-as-code deployments.

## Security Issues Demonstrated

### 1. Provider Configuration Issues
- No subscription_id or tenant_id specified
- Using default authentication methods
- Outdated provider versions with known vulnerabilities

### 2. Storage Account Misconfigurations
- ❌ Public network access enabled
- ❌ HTTPS traffic not enforced
- ❌ Using older TLS versions (TLS 1.0)
- ❌ Infrastructure encryption disabled
- ❌ No customer-managed keys
- ❌ Blob versioning disabled
- ❌ Very short retention periods (1 day)
- ❌ Public container access enabled

### 3. Network Security Issues
- ❌ Network Security Group allows all traffic (0.0.0.0/0)
- ❌ No network access restrictions
- ❌ Overly permissive firewall rules

### 4. Database Security Problems
- ❌ SQL authentication with weak passwords
- ❌ Hardcoded passwords in configuration
- ❌ Public network access enabled
- ❌ No threat detection policy
- ❌ No transparent data encryption
- ❌ No backup configuration

### 5. Key Vault Misconfigurations
- ❌ Using standard tier instead of premium
- ❌ Soft delete disabled
- ❌ Purge protection disabled
- ❌ Public network access enabled
- ❌ Overly permissive access policies

### 6. Secrets Management Issues
- ❌ Sensitive outputs not marked as sensitive
- ❌ Access keys exposed in outputs
- ❌ Connection strings in plain text
- ❌ Admin credentials exposed
- ❌ Hardcoded secrets in variables

### 7. State Management Problems
- ❌ No remote backend configured
- ❌ State file stored locally with sensitive data
- ❌ No state encryption

### 8. Governance and Compliance Issues
- ❌ No resource tagging for governance
- ❌ No cost center or ownership tags
- ❌ No environment classification
- ❌ No naming convention validation

### 9. Monitoring and Logging
- ❌ Diagnostic logging disabled by default
- ❌ No monitoring configuration
- ❌ No alerting setup
- ❌ No audit trail configuration

### 10. Version Management
- ❌ No minimum Terraform version specified
- ❌ Using outdated provider versions
- ❌ No version pinning for dependencies

## Files Structure

```
terraform/
├── main.tf                           # Example usage with security issues
├── terraform.tfvars.example         # Insecure variable examples
└── modules/
    └── terraform-azurerm-storageaccount/
        ├── main.tf                   # Main resource definitions with vulnerabilities
        ├── variables.tf              # Variables with insecure defaults
        ├── outputs.tf               # Outputs exposing sensitive information
        └── versions.tf              # Outdated version constraints
```

## Common Terraform Security Best Practices (NOT followed here)

### ✅ What SHOULD be done instead:

1. **Provider Security**
   - Pin provider versions to specific, up-to-date versions
   - Use managed identity or service principals with minimal permissions
   - Specify subscription_id and tenant_id explicitly

2. **Storage Security**
   - Enable HTTPS traffic only
   - Use minimum TLS 1.2
   - Enable infrastructure encryption
   - Use customer-managed keys
   - Configure proper network access rules
   - Enable logging and monitoring

3. **Network Security**
   - Implement least-privilege network access
   - Use specific IP ranges instead of 0.0.0.0/0
   - Configure proper NSG rules

4. **Secrets Management**
   - Mark sensitive outputs as sensitive
   - Use Azure Key Vault for secrets
   - Never hardcode credentials
   - Use managed identities where possible

5. **State Management**
   - Use remote backend (Azure Storage with encryption)
   - Enable state locking
   - Restrict access to state files

6. **Governance**
   - Implement consistent tagging strategy
   - Use naming conventions
   - Add resource validation rules

## How to Use This Demo

This configuration is designed to be scanned by security tools like:
- Terraform security scanners (tfsec, Checkov, Terrascan)
- Azure Security Center
- Custom policy engines

### Example Commands

```bash
# Initialize Terraform (will show version warnings)
terraform init

# Plan deployment (will show security warnings if tools are configured)
terraform plan

# Run security scan with tfsec
tfsec .

# Run security scan with Checkov
checkov -f main.tf
```

## Educational Value

This misconfigured setup helps demonstrate:
- How easy it is to accidentally introduce security vulnerabilities
- The importance of security scanning in CI/CD pipelines
- Common misconfigurations found in real-world deployments
- The need for security policies and governance frameworks

## Remediation Examples

For each security issue identified, you should:
1. Update the configuration to follow security best practices
2. Implement proper access controls
3. Enable monitoring and logging
4. Use infrastructure scanning tools
5. Implement policy-as-code frameworks

Remember: **Security is a shared responsibility** - infrastructure code should be treated with the same security rigor as application code.
