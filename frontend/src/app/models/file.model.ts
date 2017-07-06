export interface IFile {
    name: string;
    is_dir: boolean;
    contents?: IFile[];
    album?: string;
    title?: string;
}
