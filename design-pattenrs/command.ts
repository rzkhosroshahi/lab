/**
 * The pattern has 4 key players:
 * Command – an interface with an execute() method
 * Concrete Command – implements the command, binds a receiver to an action
 * Receiver – the object that does the actual work
 * Invoker – asks the command to carry out the request (doesn't know the details)
 */
interface Command {
    execute(): void;
    undo(): void;
}

// Invokers are: Player, RoomLight, TemperatureDevice
class Player {
    play(musicName: string) {
        console.log(`Playing music ${musicName}...`);
    }
    pause() {
        console.log(`Pause music player...`);
    }
    setVolume(volume: number) {
        console.log('Set the music volume ...', volume);;
    }
}
class RoomLight {
    private on: boolean = false;

    lightsOn() {
        this.on = true;
        console.log('The light is now: ', this.on ? 'on' : 'off');
    }
    lightsOff() {
        this.on = false;
        console.log('The light is now: ', this.on ? 'on' : 'off');
    }
}
class TemperatureDevice {
    private temperature: number = 0;

    getTemperature() {
        return this.temperature;
    }
    setTemperature(temp: number) {
        this.temperature = temp;
        console.log('The temperature is : ', this.temperature, 'C');
    }
}

// concrete commands are: TurnOnLightCommand, SetTemperatureCommand, PlayMusicCommand
class TurnOnLightCommand implements Command {
    constructor(private room: RoomLight) {}
    execute(): void {
        this.room.lightsOn();
    }
    undo(): void {
        this.room.lightsOff();
    }
}
class SetTemperatureCommand implements Command {
    private previousTemperature: number = 0;

    constructor(private temperatureDevice: TemperatureDevice, private temperature: number) {}

    execute(): void {
        this.previousTemperature = this.temperatureDevice.getTemperature();
        this.temperatureDevice.setTemperature(this.temperature);
    }
    undo(): void {
        this.temperatureDevice.setTemperature(this.previousTemperature);
    }
}
class PlayMusicCommand implements Command {
    constructor(private player: Player, private musicName: string) {}

    execute(): void {
        this.player.play(this.musicName);
    }
    undo(): void {
        this.player.pause();
    }
}


// Invokers are RemoteControl, Scheduler
class RemoteControl {
    private commands: Map<string, Command> = new Map();
    
    setCommand(buttonName: string, command: Command) {
        this.commands.set(buttonName, command);
    }
    press(buttonName: string) {
        if (this.commands.has(buttonName)) {
            this.commands.get(buttonName)?.execute();
        }
    }
    undo(buttonName: string) {
        if (this.commands.has(buttonName)) {
            this.commands.get(buttonName)?.undo();
        }
    }
}

class Scheduler {
    private queue: Command[] = [];
    
    add(command: Command) {
        this.queue.push(command);
    }
    runAll() {
        for (let command of this.queue) {
            command.execute();
        }
    }
}

const livingRoomLight = new RoomLight();
const thermostat = new TemperatureDevice();
const player = new Player();
const remote = new RemoteControl();
const scheduler = new Scheduler();
remote.setCommand("button1", new TurnOnLightCommand(livingRoomLight))
remote.setCommand("button2", new SetTemperatureCommand(thermostat, 22))

// Pressing buttons
remote.press("button1")  // Lights on
remote.press("button2")  // Temperature set to 22

// // Undo last press
remote.undo("button1")   // Lights back off

// scheduler
scheduler.add(new TurnOnLightCommand(livingRoomLight))
scheduler.add(new SetTemperatureCommand(thermostat, 20))
scheduler.add(new PlayMusicCommand(player, "Jazz Playlist"))
scheduler.runAll();