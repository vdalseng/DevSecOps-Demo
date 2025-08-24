# INTENTIONALLY MISCONFIGURED VARIABLES FOR DEMO PURPOSES
# These variables contain insecure defaults and poor practices

variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "demo-rg"
  # SECURITY ISSUE: No validation on naming conventions
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
  # SECURITY ISSUE: No validation on allowed regions
}

variable "storage_account_name" {
  description = "Name of the storage account"
  type        = string
  default     = "demostorageacct123"
  # SECURITY ISSUE: Predictable naming pattern
  # SECURITY ISSUE: No validation on naming requirements
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
  # SECURITY ISSUE: No validation on allowed environments
}

variable "admin_password" {
  description = "Admin password for SQL Server"
  type        = string
  default     = "Password123!"
  # SECURITY ISSUE: Default password provided
  # SECURITY ISSUE: Not marked as sensitive
}

variable "allowed_ips" {
  description = "List of allowed IP addresses"
  type        = list(string)
  default     = ["0.0.0.0/0"]  # SECURITY ISSUE: Default allows all IPs
}

variable "enable_logging" {
  description = "Enable diagnostic logging"
  type        = bool
  default     = false  # SECURITY ISSUE: Logging disabled by default
}

variable "backup_retention_days" {
  description = "Number of days to retain backups"
  type        = number
  default     = 1  # SECURITY ISSUE: Very short retention period
}

variable "public_access_enabled" {
  description = "Enable public access to storage account"
  type        = bool
  default     = true  # SECURITY ISSUE: Public access enabled by default
}

variable "https_only" {
  description = "Enforce HTTPS traffic only"
  type        = bool
  default     = false  # SECURITY ISSUE: HTTPS not enforced by default
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}  # SECURITY ISSUE: No default tags for governance
}
