output postgres {
  value = google_sql_database_instance.postgres.public_ip_address
}

output postgres_admin_password {
  value     = random_password.postgres_admin.result
  sensitive = true
}

output postgres_app_password {
  value     = random_password.postgres_app.result
  sensitive = true
}
