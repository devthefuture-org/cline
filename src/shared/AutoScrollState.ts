import * as vscode from 'vscode';

export class AutoScrollState {
    private static readonly KEY = 'cline.autoScroll';
    private static state: boolean = true;

    static initialize(context: vscode.ExtensionContext) {
        this.state = context.globalState.get(this.KEY, true);
    }

    static get(): boolean {
        return this.state;
    }

    static async set(value: boolean, context: vscode.ExtensionContext) {
        this.state = value;
        await context.globalState.update(this.KEY, value);
        // Notify webview of state change
        vscode.commands.executeCommand('cline.updateAutoScroll', value);
    }
}
