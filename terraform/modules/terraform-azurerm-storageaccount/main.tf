# INTENTIONALLY MISCONFIGURED TERRAFORM MODULE FOR DEMO PURPOSES
# This module contains multiple security vulnerabilities and misconfigurations

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

# Resource Group
resource "azurerm_resource_group" "demo" {
  name     = var.resource_group_name
  location = var.location
  
  # SECURITY ISSUE: No tags for governance and cost tracking
}

# Storage Account with multiple security issues
resource "azurerm_storage_account" "demo" {
  name                = var.storage_account_name
  resource_group_name = azurerm_resource_group.demo.name
  location            = azurerm_resource_group.demo.location
  
  # SECURITY ISSUE: Using Standard_LRS which doesn't provide geo-redundancy
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  # SECURITY ISSUE: Allowing public access to blobs
  public_network_access_enabled = true
  allow_nested_items_to_be_public = true
  
  # SECURITY ISSUE: Not enforcing HTTPS
  enable_https_traffic_only = false
  
  # SECURITY ISSUE: Using older TLS version
  min_tls_version = "TLS1_0"
  
  # SECURITY ISSUE: No network rules configured
  # network_rules block is missing
  
  # SECURITY ISSUE: Infrastructure encryption disabled
  infrastructure_encryption_enabled = false
  
  # SECURITY ISSUE: Customer managed keys not used
  # customer_managed_key block is missing
  
  # SECURITY ISSUE: No blob properties configured for security
  blob_properties {
    # SECURITY ISSUE: Versioning disabled
    versioning_enabled = false
    
    # SECURITY ISSUE: Change feed disabled  
    change_feed_enabled = false
    
    # SECURITY ISSUE: Point in time restore disabled
    last_access_time_enabled = false
    
    # SECURITY ISSUE: No retention policy
    delete_retention_policy {
      days = 1  # SECURITY ISSUE: Very short retention period
    }
    
    # SECURITY ISSUE: Container delete retention disabled
    container_delete_retention_policy {
      days = 1  # SECURITY ISSUE: Very short retention period
    }
  }
  
  # SECURITY ISSUE: No queue properties configured
  # SECURITY ISSUE: No share properties configured
  
  # SECURITY ISSUE: Identity not configured for managed identity
  # identity block is missing
}

# SECURITY ISSUE: Creating a container with public access
resource "azurerm_storage_container" "demo" {
  name                  = "public-container"
  storage_account_name  = azurerm_storage_account.demo.name
  
  # SECURITY ISSUE: Public access level set to blob
  container_access_type = "blob"
}

# SECURITY ISSUE: Storage account key exposed in outputs
resource "azurerm_storage_account_key" "demo" {
  storage_account_id = azurerm_storage_account.demo.id
  key_name          = "key1"
}

# SECURITY ISSUE: Creating a file share without encryption
resource "azurerm_storage_share" "demo" {
  name                 = "demo-share"
  storage_account_name = azurerm_storage_account.demo.name
  quota                = 5
  
  # SECURITY ISSUE: No access tier specified
  # SECURITY ISSUE: No metadata for governance
}

# SECURITY ISSUE: Network security group with overly permissive rules
resource "azurerm_network_security_group" "demo" {
  name                = "demo-nsg"
  location            = azurerm_resource_group.demo.location
  resource_group_name = azurerm_resource_group.demo.name

  # SECURITY ISSUE: Allow all inbound traffic
  security_rule {
    name                       = "AllowAll"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "*"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# SECURITY ISSUE: SQL Server with weak configuration
resource "azurerm_mssql_server" "demo" {
  name                         = "${var.storage_account_name}-sql"
  resource_group_name          = azurerm_resource_group.demo.name
  location                     = azurerm_resource_group.demo.location
  version                      = "12.0"
  
  # SECURITY ISSUE: SQL authentication enabled with weak password
  administrator_login          = "sqladmin"
  administrator_login_password = "Password123!"  # SECURITY ISSUE: Hardcoded weak password
  
  # SECURITY ISSUE: Public network access enabled
  public_network_access_enabled = true
  
  # SECURITY ISSUE: No identity configuration
  # SECURITY ISSUE: No extended auditing policy
}

# SECURITY ISSUE: SQL Database with minimal configuration
resource "azurerm_mssql_database" "demo" {
  name           = "demo-db"
  server_id      = azurerm_mssql_server.demo.id
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  max_size_gb    = 4
  sku_name       = "Basic"
  
  # SECURITY ISSUE: No threat detection policy
  # SECURITY ISSUE: No transparent data encryption
  # SECURITY ISSUE: No backup configuration
}

# SECURITY ISSUE: Key Vault with weak access policies
resource "azurerm_key_vault" "demo" {
  name                = "${var.storage_account_name}-kv"
  location            = azurerm_resource_group.demo.location
  resource_group_name = azurerm_resource_group.demo.name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  
  # SECURITY ISSUE: Using standard tier instead of premium
  sku_name = "standard"
  
  # SECURITY ISSUE: Soft delete disabled
  soft_delete_retention_days = 7
  
  # SECURITY ISSUE: Purge protection disabled
  purge_protection_enabled = false
  
  # SECURITY ISSUE: Public network access enabled
  public_network_access_enabled = true
  
  # SECURITY ISSUE: Overly permissive access policy
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get", "List", "Update", "Create", "Import", "Delete", "Recover", "Backup", "Restore"
    ]

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Recover", "Backup", "Restore"
    ]

    storage_permissions = [
      "Get", "List", "Update", "Set", "Delete", "Recover", "Backup", "Restore"
    ]
  }
}

data "azurerm_client_config" "current" {}
