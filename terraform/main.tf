terraform {
  backend local {
    path = "terraform.tfstate"
  }
}

provider google {
  project = var.gcp_project
  zone    = "${var.gcp_region}-a"
}


##--------------------------------------------------------------
##  GCP managed PostgreSQL instance

resource google_sql_database_instance postgres {
  name             = var.unique_name
  region           = var.gcp_region
  database_version = "POSTGRES_14"

  root_password = random_password.postgres_admin.result

  deletion_protection = false

  settings {
    tier = "db-f1-micro"

    ip_configuration {
      authorized_networks {
        value = "0.0.0.0/0"
      }
    }
  }
}

resource random_password postgres_admin {
  length      = 16
  min_lower   = 2
  min_numeric = 2
  min_special = 2
  min_upper   = 2
}

##--------------------------------------------------------------
##  PostgreSQL database

resource google_sql_database app {
  instance = google_sql_database_instance.postgres.name
  name     = google_sql_user.app.name
}

resource google_sql_user app {
  instance = google_sql_database_instance.postgres.name
  name     = var.unique_name
  password = random_password.postgres_app.result
}

resource random_password postgres_app {
  length      = 16
  min_lower   = 2
  min_numeric = 2
  min_special = 2
  min_upper   = 2
}
