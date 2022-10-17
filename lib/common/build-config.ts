import { App } from "aws-cdk-lib";

export interface BuildConfig {
	readonly account: string;
	readonly region: string;
	readonly project: string;
	readonly environment: string;
	readonly stacks: BuildStacks;
}

export interface BuildStacks {
	network: NetworkConfig;
}

export interface NetworkConfig {
	vpcCidr: string;
	privateSubnets: SubnetConfig[];
	publicSubnets: SubnetConfig[];
}
export interface SubnetConfig {
	zone: string;
	cidr: string;
	id: string;
}

export function getConfig(app: App): BuildConfig {
	let env: string = app.node.tryGetContext("config");

	if (env && env != "dev" && env != "prod") {
		throw new Error('Incorrect context variable on CDK command! Pass "config" parameter for example like "-c config=dev"');
	}

	const buildConfig: BuildConfig = app.node.tryGetContext(env);

	if (!buildConfig) throw new Error("Invalid context variable for BuildConfig! Check the compatibility with the interface");

	return buildConfig;
}
