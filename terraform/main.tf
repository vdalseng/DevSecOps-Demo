# EXAMPLE USAGE OF MISCONFIGURED TERRAFORM MODULE
# This demonstrates how the insecure module might be used

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  # SECURITY ISSUE: No subscription_id, tenant_id specified
  # SECURITY ISSUE: Using default authentication which might use service principal
}

# Using the misconfigured storage account module
module "insecure_storage" {
  source = "./modules/terraform-azurerm-storageaccount"
  
  resource_group_name    = "demo-insecure-rg"
  location              = "East US"
  storage_account_name  = "insecurestorage123"
  environment           = "demo"
  
  # SECURITY ISSUE: Using insecure defaults
  admin_password         = "WeakPassword123!"
  allowed_ips           = ["0.0.0.0/0"]  # Allow all IPs
  enable_logging        = false
  backup_retention_days = 1
  public_access_enabled = true
  https_only           = false
  
  # SECURITY ISSUE: No tags for governance
  tags = {}
}

# SECURITY ISSUE: Outputting sensitive information
output "storage_keys" {
  value = {
    primary   = module.insecure_storage.storage_account_primary_access_key
    secondary = module.insecure_storage.storage_account_secondary_access_key
  }
  # SECURITY ISSUE: Not marked as sensitive
}

output "connection_string" {
  value = module.insecure_storage.storage_account_primary_connection_string
  # SECURITY ISSUE: Not marked as sensitive
}

# SECURITY ISSUE: Local state file (no remote backend configured)
# The terraform.tfstate file will contain all sensitive values in plain text
