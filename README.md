# Hotel Engine Code Challenge

## A simple frontend app to fetch repo data from github api

### Instructions

Run `yarn` to install modules, and then you can:

#### Run development mode*
- `yarn dev`

#### Run producuction build*
- `yarn build`
- `yarn start`

#### Run tests
In making this app, I wrote tests for a few of the files to demonstrate that I understand how to use jest.
Because of this, note that `yarn test` runs coverage, and will fail given that I didn't try to get full app coverage.
So to verify that the tests I wrote pass, run:
- `yarn jest`

#### *Note that you may get rate limited by the github api interacting with the app
If you have a personal access token you would like to use, that is fine. I will also provide one via email when submitting this.
You will want to create a file in the root directory: `.env.local`, the contents of which should be:
`NEXT_PUBLIC_GITHUB_ACCESS_TOKEN=<your_access_token>`
The app will still work without this provided, but the rate limiting is pretty strict.
