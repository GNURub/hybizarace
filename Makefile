NAME := hybizarace
TAG ?= $(shell git describe --tags --abbrev=0 --always 2>/dev/null)

default:
	make prod

prod:
	make ENV=production dockerize
	make ENV=production publish

dockerize:
	@echo "Building in $(ENV) environment"
	docker buildx build --load --build-arg ENV=$(ENV) -t registry.traefy.com/$(NAME):$(TAG)-$(ENV) .

publish:
	docker tag registry.traefy.com/$(NAME):$(TAG)-$(ENV) registry.traefy.com/$(NAME):latest
	docker push registry.traefy.com/$(NAME):$(TAG)-$(ENV)
	docker push registry.traefy.com/$(NAME):latest
