import  * as os from 'os';
import * as pty from 'node-pty';
import * as vscode from 'vscode';

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'sh';

export function PtyLS(): void {
    vscode.window.showInformationMessage('Let\'s start node-pty ls command! ');
    var ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        // env: process.env
    });

    ptyProcess.on('data', function(data) {
        process.stdout.write(data);
        vscode.window.showInformationMessage('Hello World! Data: ' + data);
    });

    ptyProcess.on('exit', () => {
        process.stdout.write('Done.');
    });

    ptyProcess.write('ls\n');
    ptyProcess.resize(100, 40);
    ptyProcess.write('ls\n');
}
