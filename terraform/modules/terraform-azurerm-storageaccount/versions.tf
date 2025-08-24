# INTENTIONALLY MISCONFIGURED VERSION CONSTRAINTS FOR DEMO PURPOSES

terraform {
  # SECURITY ISSUE: No minimum Terraform version specified
  # required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      # SECURITY ISSUE: Using older version with known vulnerabilities
      version = "~> 2.0"
    }
    
    # SECURITY ISSUE: Using random provider without version constraint
    random = {
      source = "hashicorp/random"
      # No version specified
    }
    
    # SECURITY ISSUE: Using unofficial provider
    local = {
      source = "hashicorp/local"
      version = "~> 1.0"  # SECURITY ISSUE: Very old version
    }
  }
  
  # SECURITY ISSUE: No backend configuration - state stored locally
  # backend "azurerm" {
  #   resource_group_name  = "terraform-state-rg"
  #   storage_account_name = "terraformstate"
  #   container_name       = "tfstate"
  #   key                  = "terraform.tfstate"
  # }
}
