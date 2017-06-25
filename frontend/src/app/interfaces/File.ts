export interface File{
    name: string,
    is_dir: boolean,
    contents?: File[]
}