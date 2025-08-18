# Terraform configuration for DevSecOps Demo

# Resource Group
resource "azurerm_resource_group" "resource_group" {
  name     = "rg-devsecops-${var.environment}"
  location = var.location
  
  tags = {
    Environment = var.environment
    Project     = "DevSecOps-Demo"
    ManagedBy   = "Terraform"
  }
}

# Storage Account Module
module "storage_account" {
  source = "./terraform/modules/terraform-azurerm-storageaccount"
  
  storage_account_name    = var.storage_account_name
  environment            = var.environment
  resource_group = {
    name     = azurerm_resource_group.resource_group.name
    location = azurerm_resource_group.resource_group.location
  }
  account_tier          = var.storage_account_tier
  account_replication_type = var.storage_replication_type
  public_network_access_enabled = var.public_network_access_enabled
  
  tags = {
    Environment = var.environment
    Project     = "DevSecOps-Demo"
    Component   = "Storage"
  }
}
