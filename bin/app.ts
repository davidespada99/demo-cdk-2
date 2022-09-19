#!/usr/bin/env node
import "source-map-support/register";
import { App, Stack, Tags } from "aws-cdk-lib";
import { BuildConfig, getConfig } from "../lib/common/build-config";
import { NetworkStack } from "../lib/network";
import { NetworkImportStack } from "../lib/network-import";

const app = new App();
const buildConfig: BuildConfig = getConfig(app);
const envDetails = {
	account: buildConfig.account,
	region: buildConfig.region,
};

const prefix = `${buildConfig.environment}-${buildConfig.project}`;

// Network
const networkStackName = `${prefix}-network-stack`;
const networkStack = new NetworkStack(app, networkStackName, buildConfig, {
	stackName: networkStackName,
	env: envDetails,
});
addTagsToStack(networkStack);

// Network Import
const networkImportStackName = `${prefix}-network-import-stack`;
const networkImportStack = new NetworkImportStack(app, networkImportStackName, buildConfig, {
	stackName: networkImportStackName,
	env: envDetails,
});
addTagsToStack(networkImportStack);

/*********************************

TODO: Aggiungere altri servizi

*********************************/

function addTagsToStack(stack: Stack): void {
	Tags.of(stack).add("ManagedBy", "CDK");
	Tags.of(stack).add("Environment", buildConfig.environment);
}
