/**
 * The four roles:
 * Iterator (interface) — declares hasNext() and next(). The client only ever talks to this interface.
 * ConcreteIterator — implements traversal for a specific collection. Knows the internal structure; the client doesn't.
 * Iterable (interface) — any collection that can produce an iterator via createIterator().
 * ConcreteCollection — holds the actual data, creates and returns the right ConcreteIterator for itself.
 */

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface Iterable<T> {
    createIterator(): Iterator<T>;
}

class Playlist implements Iterable<string> {
    private songs: string[] = [];

    add(song: string): void {
        this.songs.push(song);
    }

    createIterator(): Iterator<string> {
        return new PlaylistIterator(this.songs);
    }
}

class PlaylistIterator implements Iterator<string> {
    private index = 0;

    constructor(private songs: string[]) { }

    hasNext(): boolean {
        return this.index < this.songs.length;
    }

    next(): string {
        if (!this.hasNext()) throw new Error("No more songs");
        return this.songs[this.index++];
    }
}

class PlaylistWithSets implements Iterable<string> {
    private songs: Set<string> = new Set();

    add(song: string): void {
        this.songs.add(song);
    }
    createIterator(): Iterator<string> {
        return new PlaylistIterator(Array.from(this.songs));
    }
}
const playlist = new PlaylistWithSets();
playlist.add("Bohemian Rhapsody");
playlist.add("Hotel California");
playlist.add("Stairway to Heaven");

const iterator = playlist.createIterator();
while (iterator.hasNext()) {
    console.log(`Now playing: ${iterator.next()}`);
}