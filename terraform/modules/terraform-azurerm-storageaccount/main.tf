resource "azurerm_storage_account" "storage_account" {
  name                     = "${var.storage_account_name}${var.environment}"
  resource_group_name      = var.resource_group.name
  location                 = var.resource_group.location
  account_tier             = var.account_tier
  account_replication_type = var.account_replication_type
  
  public_network_access_enabled = var.public_network_access_enabled
  
  # Security settings
  min_tls_version                 = "TLS1_2"
  allow_nested_items_to_be_public = false
  shared_access_key_enabled       = true
  
  # Enable blob encryption
  blob_properties {
    versioning_enabled = true
    delete_retention_policy {
      days = 7
    }
  }
  
  tags = var.tags
}