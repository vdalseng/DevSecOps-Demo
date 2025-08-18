variable "environment" {
  description = "Environment name (dev, test, prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "Norway East"
}

variable "storage_account_name" {
  description = "Base name for storage account (without environment suffix)"
  type        = string
  default     = "devsecops"
}

variable "storage_account_tier" {
  description = "Storage account performance tier"
  type        = string
  default     = "Standard"
}

variable "storage_replication_type" {
  description = "Storage account replication strategy"
  type        = string
  default     = "LRS"
}

variable "public_network_access_enabled" {
  description = "Allow public access to storage account"
  type        = bool
  default     = false
}
