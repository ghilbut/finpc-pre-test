#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username postgres --dbname postgres <<-EOSQL
	CREATE DATABASE grafana;

  CREATE TABLE "stocks" (
    "id" BIGSERIAL,
    "code" VARCHAR(3),
    "name" VARCHAR(255),
    "total_stock_count" INTEGER,
    UNIQUE ("code"),
    UNIQUE ("name"),
    PRIMARY KEY ("id")
  );

  CREATE INDEX stocks_code_index ON stocks (code);

  INSERT INTO stocks (code, name, total_stock_count) VALUES ('IMP', 'imp', 387000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('POL', 'polecat', 527000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('SAL', 'salmon', 46000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('DOB', 'doberman', 760000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('PAN', 'panther', 375000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('BUC', 'buck', 23000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('FOX', 'foxhound', 358000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('IBE', 'ibex', 211000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('URC', 'urchin', 618000000);
  INSERT INTO stocks (code, name, total_stock_count) VALUES ('DRA', 'drake', 374000000);
EOSQL
