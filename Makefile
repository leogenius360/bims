.DEFAULT_GOAL := help
SHELL := /bin/bash

PROJECT_NAME := brainbox-frontend
PROJECT_DIR=$(shell pwd)

.PHONY: clean help install test shell

help: ## Display all callable targets.
	@echo =========================================================================
	@echo "Project name: $(PROJECT_NAME)" 
	@echo =========================================================================
	@echo
	@echo "Commands		Description"
	@echo =========================================================================
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo =========================================================================


setup: ## Set up your developement environment
	code --uninstall-extension glenn2223.live-sass


install: ## Install dependencies
	npm install

build: ## Build the project
	npm run build

clean: ## Clean files
	npm cache clean --force

deep-clean: ## Delete all node_modules and re-install them
	npm cache clean --force
	rm -rf node_modules
	npm install
