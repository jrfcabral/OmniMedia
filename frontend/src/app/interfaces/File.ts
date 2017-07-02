export interface File{
    id: number;
    title?: string;
    artist?: string;
    genre?: string;
    album?: string;
    albumartist?: any;
    filepath?: string;
    name: string;
    is_dir: boolean;
    tracknumber?: any;
    compilation?: any;
    composer?: any;
    length?: number;
    date?: number;
    contents?: File[];
}