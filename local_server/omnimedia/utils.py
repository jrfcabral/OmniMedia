import os
from pathlib import Path
import mutagen
from mutagen.mp3 import EasyMP3, MP3


def updateDatabase():
    from omnimedia.models import MediaFolder, MediaMetadata    
    files = []
    #see if all files still exist, if not remove them
    for f in MediaMetadata.objects.all():
        if not Path(f.filepath).exists():
            print(str(f.filepath) + "does not exist anymore... Removing from database")
            try:
                MediaMetadata.objects.get(filepath=f.filepath).delete()
            except:
                pass
            continue
        files.append(f.filepath)
    #see if any new files exist, if so add them
    for d in MediaFolder.objects.all():
        refreshSearch(getWorkingFilePath(d.path), files)
                   
def getWorkingFilePath(path):
    return "/".join(path.split("/")[1:])

def refreshSearch(path, files):
    for item in os.listdir(path):
        if os.path.isdir(os.path.join(path, item)):
                refreshSearch(os.path.join(path, item), files)
        elif os.path.isfile(os.path.join(path, item)) and not os.path.join(path, item) in files:
             print(str(os.path.join(path, item)) + " is new - Adding metadata to database")
             metadata(path, item)

def exploreDirectoryList(path, flat='false'):
    files = list()
    for i, item in enumerate(os.listdir(path)):
        if os.path.isdir(os.path.join(path, item)):
            if not flat == 'true':
                files.append({"name": item, "is_dir": True, "contents": exploreDirectoryList(os.path.join(path, item))})
            else:
                files.extend(exploreDirectoryList(os.path.join(path, item), 'true'))
        elif os.path.isfile(os.path.join(path, item)):
            files.append(metadata(path, item))

    return files

def metadata(path, item):
    from omnimedia.models import MediaFolder, MediaMetadata
    filepath = os.path.join(path, item)
    data = {"name": item, "is_dir": False, "filepath": filepath}

    if MediaMetadata.objects.filter(filepath=filepath).exists():
        try:
            metadata = MediaMetadata.objects.get(filepath=filepath)
            value = metadata.__dict__
            del value['_state']
            return value
        except:
            pass
        

    filetype = mutagen.File(filepath)
    if filetype != None and "audio/mp3" in filetype.mime:
        tags = EasyMP3(filepath)
        for key in tags.keys():
            data[key] = ", ".join(tags[key])
        data["length"] = MP3(filepath).info.length

    MediaMetadata(**data).save()
    return data