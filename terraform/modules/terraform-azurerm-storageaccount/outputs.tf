# INTENTIONALLY MISCONFIGURED OUTPUTS FOR DEMO PURPOSES
# These outputs expose sensitive information

output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.demo.name
}

output "storage_account_id" {
  description = "ID of the storage account"
  value       = azurerm_storage_account.demo.id
}

# SECURITY ISSUE: Exposing primary access key in output
output "storage_account_primary_access_key" {
  description = "Primary access key for the storage account"
  value       = azurerm_storage_account.demo.primary_access_key
  # SECURITY ISSUE: Not marked as sensitive
}

# SECURITY ISSUE: Exposing secondary access key in output
output "storage_account_secondary_access_key" {
  description = "Secondary access key for the storage account"
  value       = azurerm_storage_account.demo.secondary_access_key
  # SECURITY ISSUE: Not marked as sensitive
}

# SECURITY ISSUE: Exposing connection string
output "storage_account_primary_connection_string" {
  description = "Primary connection string for the storage account"
  value       = azurerm_storage_account.demo.primary_connection_string
  # SECURITY ISSUE: Not marked as sensitive
}

# SECURITY ISSUE: Exposing blob endpoint
output "storage_account_primary_blob_endpoint" {
  description = "Primary blob endpoint"
  value       = azurerm_storage_account.demo.primary_blob_endpoint
}

# SECURITY ISSUE: Exposing SQL Server admin credentials
output "sql_server_fqdn" {
  description = "Fully qualified domain name of the SQL server"
  value       = azurerm_mssql_server.demo.fully_qualified_domain_name
}

output "sql_server_admin_login" {
  description = "SQL Server administrator login"
  value       = azurerm_mssql_server.demo.administrator_login
  # SECURITY ISSUE: Exposing admin username
}

# SECURITY ISSUE: Exposing Key Vault URI
output "key_vault_uri" {
  description = "URI of the Key Vault"
  value       = azurerm_key_vault.demo.vault_uri
}

# SECURITY ISSUE: Exposing resource group information
output "resource_group_id" {
  description = "ID of the resource group"
  value       = azurerm_resource_group.demo.id
}

output "resource_group_location" {
  description = "Location of the resource group"
  value       = azurerm_resource_group.demo.location
}

# SECURITY ISSUE: Exposing container access information
output "storage_container_name" {
  description = "Name of the storage container"
  value       = azurerm_storage_container.demo.name
}

output "storage_container_access_type" {
  description = "Access type of the storage container"
  value       = azurerm_storage_container.demo.container_access_type
}

# SECURITY ISSUE: No output descriptions for some sensitive outputs
output "all_storage_keys" {
  value = {
    primary_key   = azurerm_storage_account.demo.primary_access_key
    secondary_key = azurerm_storage_account.demo.secondary_access_key
  }
}
