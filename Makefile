NAME := hybizarace
TAG := latest

default:
	make prod

prod:
	make dockerize
	make publish

dockerize:
	@echo "Building"
	docker buildx build --load -t registry.traefy.com/$(NAME):$(TAG) .

publish:
	docker push registry.traefy.com/$(NAME):$(TAG)
