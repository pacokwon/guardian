# Guardian
This repository contains submodules of other repositories. Please refer to the [client](https://github.com/pacokwon/guardian-client) and [server](https://github.com/pacokwon/guardian-server) applications in their respective repositories.


## Getting Started
Since the sub applications are managed with git submodules, one must clone this repository recursively. Run the following commands after cloning the repository.
```bash
git submodule init
git submodule update
```

At the root level, a `docker-compose.yml` file is present. Run `docker-compose up` to run the two applications and a mysql database. This will enable the execution of three services with docker.
