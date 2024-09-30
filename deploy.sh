#!/bin/bash
# This script aims to generate a deployment to this package, serving as a shortctut to deno run -A instructions.ts <VERSION>

# Check if the version is passed as an argument
if [ -z "$1" ]
then
    echo "A version must be provided (e.g. 1.0.0)"
    exit 1
fi

# Check if the version is a valid semantic-version
if ! [[ "$1" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]
then
    echo "Version must comply with the semantic versioning format (e.g. 1.0.0)"
    exit 1
fi

# Generate the deployment
deno run -A instructions.ts $1