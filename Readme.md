## How to deploy

1. copy `env` file and rename it to the `.env`
2. add the primary key of your wallet `PRIVATE_KEY=...`
3. add SUBZERO_TOKEN address - This is used for deploing 4M initial tokens
4. install node_modules using `yarn install`
5. yarn deploy-avalanche (deploy to the avax main net)
6. yarn avax-test (deploy to the avax test net, if you want)

After deploying it you can findout the deployed address in console log.
You can referene below screenshot
![Code_bbqnIO0OjK](https://user-images.githubusercontent.com/94333672/175842143-f6f5a351-3f12-4d28-bb39-8897d13f436f.png)

This is the deployed address.

Now let's move foraward to verifying...

## How to verify

`npx hardhat verify --network avalancheTest <DEPLOYED-ADDRESS>`

![Code_BL61Ql67Wa](https://user-images.githubusercontent.com/94333672/175842534-d070d957-af35-4025-9562-49b44ded34dd.png)
