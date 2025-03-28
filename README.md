<img src="https://github.com/user-attachments/assets/7042e29c-962e-46db-b520-1422cd983f5c" >
<img width="1417" alt="Screenshot 2025-03-28 at 3 53 24 PM" src="https://github.com/user-attachments/assets/1ad0df0d-1a34-4ef1-882e-644bb3c5fb5f" />


# md-coach-dashboard
https://www.masteringdiabetes.org

## Git Hooks

To setup local git hooks run the script `scripts/setup_git_hooks.sh`.
After running the script every git action for which a hook was created will
execute the hook at the set time.

### Installed Hooks

* pre-commit - will execute before committing code and run lint to make sure
  source is pretty.

### Disable Hooks

To disable hooks permanently delete their files from `.git/hooks/` (eg.
`.git/hooks/pre-commit`). Commit hooks (and possibly others) can be disabled
a single time using:

```bash
$ git commit -n / --no-verify
```

## OpenAPI

An OpenAPI specification is available in the `openapi` folder. A package manifest is also available to enable running a mock server easily which can be used for connecting APIs without an active backend.

To start the mock server, install dependencies in that folder and start it:

```bash
$ cd openapi
$ npm install
$ npm start
```

You can also start the mock server yourself if you wish to change execution flags:

```bash
$ npx prism mock -p 8000 ./spec.yaml
```

Available endpoints may change in the future. Check out the list of them when the mock server is started.

### Chat mocking

Note that the OpenAPI spec contains several chat tokens you can use (under the `/profile/chat` endpoint's example responses). You may uncomment any one of them that you wish to use.

## Continuous integration and deployment

Continuous integration and deployment are facilitated via Github actions -

* For every push or PR to one of the main branches the `test` action will be executed which should run static code analysis tools and the project tests.

* For every new tag in the form of `<env-name>-v<version-number>` (eg. `staging-v0.1.0`) which is pushed by an allowed user the `deploy` action will be executed which contains the same steps as the `test` action, plus it copies the build assets to S3 top a separate folder and to the deployed folder.

### `deploy` action configuration

The configuration for the `deploy` action is provided via a Github repository secret named `ENV_CONFIG_MAP` which should be a valid json dictionary in the form:

`{"<env-name>": {"role": "<cicd-assumed-aws-role-arn>", "region": "<aws-region-for-role-and-deployment>", "bucket": "<s3-bucket-name>", "distribution": "<cloudfront-distribution-id>", "base_url": "<backend-base-url>"}}`

For example:

`{"staging": {"role": "arn:aws:iam::123456789012:role/coach-dashboard-cicd-deploy", "region": "us-east-1", "bucket": "coach-dashboard-deploy", "distribution": "ABCDE12345FG67", "base_url": "https://base.url/"}}`
