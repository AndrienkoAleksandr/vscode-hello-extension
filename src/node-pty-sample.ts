import  * as os from 'os';
import * as pty from 'node-pty';
import * as vscode from 'vscode';

var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

export function PtyLS(channel: vscode.OutputChannel): void {
    var ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    //   env: process.env
    });

    ptyProcess.on('data', function(data) {
        process.stdout.write(data);
        channel.append(data);
    });

    ptyProcess.on('exit', () => {
        process.stdout.write('Done.');
    })

    ptyProcess.write('ls\r');
    ptyProcess.resize(100, 40);
    ptyProcess.write('ls\r');
}
